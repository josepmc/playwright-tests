/* eslint-disable testing-library/prefer-screen-queries */
// The above is not needed as this is not using the testing library
import { test, expect, Page } from '@playwright/test';
import { applyUserMocks } from './mock';
import { applyLoadSteps } from './shared';

test.describe('CommandBar', () => {
  applyUserMocks();

  applyLoadSteps();

  test.beforeEach(async ({ page }) => {
    // Capture the network requests
    await page.routeFromHAR('tests/fixtures/commandbar.har', {
      url: /.*commandbar.com\/.*/,
      update: process.env.UPDATE_HAR === 'true',
      notFound: 'abort',
    });
  });

  const exitTour = async (page: Page) => {
    const dialog = page.getByText('Using the navigation controls');
    await dialog.waitFor();
    await page.getByLabel('Close').click();
    await expect(dialog).not.toBeVisible();
  };

  test('should exit the tour when clicking on the exit button', async ({
    page,
  }) => {
    await exitTour(page);
  });

  // Won't be able to open the feedback if the tour didn't exit
  test('should open feedback form when clicking on the feedback button', async ({
    page,
  }) => {
    await exitTour(page);
    await page.getByTestId('show-feedback-button').click();
    const dialog = page
      .locator('//*[@class="commandbar-popover-nudge-center"]')
      .filter({ hasText: 'How do you like this example?' })
      // It's an image
      .filter({ has: page.getByAltText('Hello World') })
      .filter({
        has: page.getByPlaceholder('How can we make FeatureX twice as good?'),
      });
    await dialog.waitFor();
    await page.click('text=Share Feedback');
    await expect(dialog).not.toBeVisible();
  });
});
