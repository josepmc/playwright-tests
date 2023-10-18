import { test } from '@playwright/test';

export function applyLoadSteps() {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.beforeEach(async ({ page }) => {
    await page.waitForLoadState('networkidle');
    const locator = page.locator('//*[@data-testid="homepage-content"]');
    await locator.waitFor();
  });
}
