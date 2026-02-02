import { test as setup, expect } from '@playwright/test';
import { TEST_USER } from './helpers/test-user';

const AUTH_FILE = '.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('email').fill(TEST_USER.email);
  await page.getByLabel('password').fill(TEST_USER.password);
  await page.getByRole('button', { name: 'login' }).click();

  const error = page.getByText('login failed');
  const redirected = page.waitForURL('/');

  const result = await Promise.race([
    redirected.then(() => 'ok' as const),
    error.waitFor({ timeout: 10_000 }).then(() => 'error' as const),
  ]);

  if (result === 'error') {
    throw new Error('login failed — ensure the database is running and seeded (bun run db:seed)');
  }

  await page.context().storageState({ path: AUTH_FILE });
});
