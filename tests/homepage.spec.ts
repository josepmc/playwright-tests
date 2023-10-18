/* eslint-disable testing-library/prefer-screen-queries */
// The above is not needed as this is not using the testing library
import { test, expect } from '@playwright/test';
import { applyUserMocks, mockedUsers } from './mock';
import { applyLoadSteps } from './shared';

test.describe('Homepage', () => {
  applyUserMocks();

  applyLoadSteps();

  test('should loads users on the homepage', async ({ page }) => {
    let allUsers = await page.locator('//*[@data-testid="user-card"]').all();
    for (let i = 0; i < allUsers.length; i++) {
      await expect(allUsers[i].getByTestId('username')).toHaveText(
        mockedUsers[i].username,
      );
      await expect(allUsers[i].getByTestId('name')).toHaveText(
        mockedUsers[i].name,
      );
      await expect(allUsers[i].getByTestId('image')).toHaveAttribute(
        'src',
        mockedUsers[i].image,
      );
    }
    // This makes the above a bit redundant, but it's a good example of how to use the `all` method
    // Also, if we change the design we'll need to recreate the image test
    // Please note that the image APIs have not been mocked, and only this will actually check for them to be equal
    await expect(page).toHaveScreenshot('homepage.png', {
      maxDiffPixelRatio: process.env.CI ? 0.05 : 0, // 5% difference is allowed in CI
    });
  });

  test('should go to the profile page when clicking on users', async ({
    page,
  }) => {
    await page.getByText(mockedUsers[0].name).click();
    await page.waitForLoadState('networkidle');
    await page
      .getByTestId('profile-page')
      .filter({ hasText: mockedUsers[0].username })
      .filter({ hasText: mockedUsers[0].name })
      .filter({ hasText: mockedUsers[0].email })
      .filter({ hasText: mockedUsers[0].phone })
      .filter({ hasText: mockedUsers[0].website })
      .filter({ hasText: mockedUsers[0].address.street })
      .filter({ hasText: mockedUsers[0].address.suite })
      .filter({ hasText: mockedUsers[0].address.city })
      .filter({ hasText: mockedUsers[0].address.zipcode })
      .filter({ hasText: mockedUsers[0].company.name })
      .filter({ hasText: mockedUsers[0].company.catchPhrase })
      .filter({ hasText: mockedUsers[0].company.bs })
      .waitFor();
  });
});
