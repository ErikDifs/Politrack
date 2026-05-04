import { test, expect } from '@playwright/test';

test('home page loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/PoliTrack/);
});

test('home page displays welcome message', async ({ page }) => {
  await page.goto('/');
  const heading = page.locator('h2', { hasText: 'Welcome to PoliTrack' });
  await expect(heading).toBeVisible();
});

test('users section is visible', async ({ page }) => {
  await page.goto('/');
  const usersSection = page.locator('h2', { hasText: 'Users' });
  await expect(usersSection).toBeVisible();
});
