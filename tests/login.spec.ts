import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { loginTestData } from '../test-data/login-data';

for (const data of loginTestData) {
  test(`should handle login with ${data.testName}`, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
      data.username,
      data.password
    );

    if (data.shouldLogin) {
      await expect(page).toHaveURL(/inventory.html/);
    } else {
      await loginPage.expectLoginError(
        data.expectedError
      );
    }
  });
}