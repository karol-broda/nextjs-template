import { test, expect } from '@playwright/test';

test.describe('navigation', () => {
  test('unauthenticated user visiting / gets redirected to /login', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/login/);
  });

  test('login page is accessible without auth', async ({ page }) => {
    const response = await page.goto('/login');
    expect(response).not.toBeNull();
    if (response !== null) {
      expect(response.status()).toBe(200);
    }
  });

  test('register page is accessible without auth', async ({ page }) => {
    const response = await page.goto('/register');
    expect(response).not.toBeNull();
    if (response !== null) {
      expect(response.status()).toBe(200);
    }
  });

  test('protected api route returns 401 without auth', async ({ request }) => {
    const response = await request.get('/api/users');
    expect(response.status()).toBe(401);
  });

  test('public api route is accessible', async ({ request }) => {
    const response = await request.get('/api/users/test123');
    expect(response.status()).toBe(200);
  });
});
