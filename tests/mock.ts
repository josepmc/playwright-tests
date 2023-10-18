import { readFileSync } from 'fs';
import { User } from '../types/user';
import { test } from '@playwright/test';

export const mockedUsers: User[] = JSON.parse(
  readFileSync('tests/fixtures/users.json', 'utf8'),
);

export function applyUserMocks() {
  // Mock all responses from the API
  test.beforeEach(async ({ page }) => {
    await page.route('**/jsonplaceholder.typicode.com/users', async (route) => {
      await route.fulfill({ body: JSON.stringify(mockedUsers) });
    });
    await page.route(
      '**/jsonplaceholder.typicode.com/users/**',
      async (route) => {
        const id = route.request().url().split('/').pop();
        let parsed = 0;
        if ((parsed = parseInt(id as string)) > mockedUsers.length) {
          await route.fulfill({ body: JSON.stringify(mockedUsers[parsed]) });
        } else {
          await route.fulfill({ body: JSON.stringify('{}') });
        }
      },
    );
  });
}
