import { test, expect } from '@playwright/test';

test.describe('smoke', () => {
  test('login page renders with form', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('heading', { name: 'login' })).toBeVisible();
    await expect(page.getByLabel('email')).toBeVisible();
    await expect(page.getByLabel('password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible();
  });

  test('login form shows validation error on empty submit', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('button', { name: 'login' }).click();
  });

  test('register page renders with form', async ({ page }) => {
    await page.goto('/register');
    await expect(page.getByRole('heading', { name: 'register' })).toBeVisible();
    await expect(page.getByLabel('name')).toBeVisible();
    await expect(page.getByLabel('email')).toBeVisible();
    await expect(page.getByLabel('password')).toBeVisible();
  });

  test('can navigate from login to register', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('link', { name: 'register' }).click();
    await expect(page).toHaveURL('/register');
  });

  test('can navigate from register to login', async ({ page }) => {
    await page.goto('/register');
    await page.getByRole('link', { name: 'login' }).click();
    await expect(page).toHaveURL('/login');
  });
});
