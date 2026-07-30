#!/usr/bin/env node
// Delete every old deployment only after the just-deployed production commit can be identified.
// This script is intentionally fail-closed: ambiguity means no deletion.
const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const apiToken = process.env.CLOUDFLARE_API_TOKEN;
const project = process.env.CLOUDFLARE_PAGES_PROJECT;
const keepCommit = process.env.CLOUDFLARE_KEEP_COMMIT_SHA;
const enabled = process.env.PURGE_OLD_CF_DEPLOYMENTS === 'true';

if (!enabled) {
  console.log('Cloudflare deployment purge: disabled');
  process.exit(0);
}
if (!accountId || !apiToken || !project || !keepCommit) {
  throw new Error('Cloudflare deployment purge: required configuration is missing');
}
if (!/^[A-Za-z0-9_-]+$/.test(project) || !/^[0-9a-f]{40}$/i.test(keepCommit)) {
  throw new Error('Cloudflare deployment purge: invalid project or commit SHA');
}

const base = `https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects/${project}/deployments`;
const headers = { Authorization: `Bearer ${apiToken}` };

async function cloudflare(url, init = {}) {
  const response = await fetch(url, { ...init, headers: { ...headers, ...init.headers } });
  const payload = await response.json();
  if (!response.ok || !payload.success) {
    throw new Error(`Cloudflare API ${response.status}: request failed`);
  }
  return payload;
}

async function listDeployments() {
  const deployments = [];
  let page = 1;
  while (true) {
    const url = new URL(base);
    url.searchParams.set('page', String(page));
    url.searchParams.set('per_page', '100');
    const payload = await cloudflare(url);
    deployments.push(...payload.result);
    const totalPages = payload.result_info?.total_pages ?? 1;
    if (page >= totalPages) break;
    page += 1;
  }
  return deployments;
}

const deployments = await listDeployments();
const current = deployments.filter(
  (deployment) =>
    deployment.environment === 'production' &&
    deployment.latest_stage?.status === 'success' &&
    deployment.deployment_trigger?.metadata?.commit_hash === keepCommit,
);

if (current.length !== 1) {
  throw new Error(
    `Cloudflare deployment purge: expected exactly one successful production deployment for ${keepCommit}, found ${current.length}`,
  );
}

const keepId = current[0].id;
const targets = deployments.filter((deployment) => deployment.id !== keepId);
console.log(
  `Cloudflare deployment purge: keeping ${keepId}; deleting ${targets.length} old deployment(s)`,
);

for (const deployment of targets) {
  if (!/^[0-9a-f-]{36}$/i.test(deployment.id)) {
    throw new Error('Cloudflare deployment purge: invalid deployment id');
  }
  console.log(`delete ${deployment.id} ${deployment.url ?? ''}`.trim());
  await cloudflare(`${base}/${deployment.id}`, { method: 'DELETE' });
}
