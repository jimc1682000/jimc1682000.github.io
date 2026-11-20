import process from 'node:process';
import { URL } from 'node:url';
import { expect, test } from '@playwright/test';

test('Film Brain mobile menu opens the overview', async ({ page, baseURL }, testInfo) => {
  const response = await page.goto('/film-brain/');
  expect(response.status()).toBe(200);
  await expect(page).toHaveURL(new URL('/film-brain/', baseURL).href);

  const csp = await response.headerValue('content-security-policy');
  testInfo.annotations.push({ type: 'CSP header', description: csp ? 'present' : 'absent' });
  if (process.env.FILM_BRAIN_REQUIRE_CSP !== '0') {
    const scriptPolicy = csp?.match(/(?:^|;)\s*script-src\s+([^;]+)/i)?.[1];
    expect(scriptPolicy, 'The Worker must enforce a script-src policy').toBeTruthy();
    expect(scriptPolicy.trim().split(/\s+/)).not.toContain("'unsafe-eval'");
  }

  const mobileMenu = page.getByRole('button', { name: 'mobile navigation', exact: true });
  await expect(mobileMenu).toHaveAttribute('aria-expanded', 'false');
  await mobileMenu.click();
  await expect(mobileMenu).toHaveAttribute('aria-expanded', 'true');
  const menu = page.locator('#VPNavScreen');
  await menu.getByRole('button', { name: '產品', exact: true }).click();
  await menu.getByRole('link', { name: '運作原理', exact: true }).click();

  await expect(page).toHaveURL(new URL('/film-brain/brief', baseURL).href);
  await expect(page.getByRole('heading', { name: 'AI 片庫大腦怎麼運作' })).toBeVisible();
});
