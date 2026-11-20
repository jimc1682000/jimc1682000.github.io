import process from 'node:process';
import { defineConfig } from '@playwright/test';

const siteUrl = process.env.FILM_BRAIN_SITE_URL;
const localUrl = 'http://127.0.0.1:8788';

export default defineConfig({
  testDir: './tests',
  testMatch: 'film-brain-mobile.spec.mjs',
  timeout: 30_000,
  use: {
    baseURL: siteUrl || localUrl,
    viewport: { width: 390, height: 844 },
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  webServer: siteUrl
    ? undefined
    : {
        command: 'wrangler pages dev dist --ip 127.0.0.1 --port 8788',
        url: localUrl + '/film-brain/',
        reuseExistingServer: false,
        timeout: 60_000,
        env: { WRANGLER_SEND_METRICS: 'false' },
      },
});
