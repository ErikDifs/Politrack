import { test, expect } from '@playwright/test';

test('view politician profile successfully', async ({ page }) => {
  await page.goto('/politicians/1');

  // Check all fields are visible
  await expect(page.locator('h1:has-text("Jane Smith")')).toBeVisible();
  await expect(page.locator('text=Democratic Party')).toBeVisible();
  await expect(page.locator('text=California')).toBeVisible();
  await expect(page.locator('text=State Senator')).toBeVisible();
  await expect(page.locator('text=Long-serving senator')).toBeVisible();
});

test('show 404 for missing politician', async ({ page }) => {
  await page.goto('/politicians/999999');

  // Check 404 state is displayed
  await expect(page.locator('text=Politician not found')).toBeVisible();
  await expect(page.locator("text=The politician you're looking for doesn't exist")).toBeVisible();
});
