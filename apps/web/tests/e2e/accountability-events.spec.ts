import { test, expect } from '@playwright/test';

test('view accountability events timeline for politician', async ({ page }) => {
  await page.goto('/politicians/1');

  await expect(page.locator('h2:has-text("Accountability Events")')).toBeVisible();

  const eventItems = page.locator('[data-testid="event-item"]');
  await expect(eventItems).toHaveCount(5);

  await expect(eventItems.first().locator('text=2026-03-15')).toBeVisible();
  await expect(eventItems.last().locator('text=2026-01-10')).toBeVisible();
});

test('event source links work', async ({ page }) => {
  await page.goto('/politicians/1');

  const eventLink = page.locator('[data-testid="event-item"] a').first();

  await expect(eventLink).toBeVisible();
  await expect(eventLink).toHaveAttribute('href', /^https?:\/\//);
});

test('display all event types correctly', async ({ page }) => {
  await page.goto('/politicians/1');

  const eventTypes = page.locator('[data-testid="event-type"]');

  await expect(eventTypes.filter({ hasText: /^Vote$/ })).toBeVisible();
  await expect(eventTypes.filter({ hasText: /^Statement$/ })).toBeVisible();
  await expect(eventTypes.filter({ hasText: /^Donation$/ })).toBeVisible();
  await expect(eventTypes.filter({ hasText: /^Promise$/ })).toBeVisible();
  await expect(eventTypes.filter({ hasText: /^Missed Vote$/ })).toBeVisible();
});
