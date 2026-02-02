import { test, expect } from '@playwright/test';
import { TEST_USER } from './helpers/test-user';

test.describe('dashboard (authenticated)', () => {
  test('shows dashboard heading', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'dashboard' })).toBeVisible();
  });

  test('displays logged in user email', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText(`logged in as ${TEST_USER.email}`)).toBeVisible();
  });

  test('does not redirect to login', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/');
  });

  test('theme toggle is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('button', { name: /theme/i })).toBeVisible();
  });

  test('api returns current user', async ({ request }) => {
    const response = await request.get('/api/users');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.user.email).toBe(TEST_USER.email);
  });
});
