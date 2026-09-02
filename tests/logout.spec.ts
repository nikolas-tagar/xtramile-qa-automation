import { test, expect } from '../fixtures/test';

test.describe('Logout', () => {
  test('should logout successfully', async ({
    page,
    inventoryPage,
    authenticated,
  }) => {
    await inventoryPage.logout();

    await expect(page).toHaveURL(/\/$/);

    await expect(
      page.locator('[data-test="login-button"]')
    ).toBeVisible();
  });
});