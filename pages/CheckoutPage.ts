import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async fillCustomerInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.page
      .locator('[data-test="firstName"]')
      .fill(firstName);

    await this.page
      .locator('[data-test="lastName"]')
      .fill(lastName);

    await this.page
      .locator('[data-test="postalCode"]')
      .fill(postalCode);
  }

  async continue() {
    await this.page
      .locator('[data-test="continue"]')
      .click();
  }

  async finish() {
    await this.page
      .locator('[data-test="finish"]')
      .click();
  }

  async expectOrderCompleted() {
    await expect(
      this.page.locator('[data-test="complete-header"]')
    ).toHaveText('Thank you for your order!');
  }
  
  async expectCheckoutError(message: string) {
  await expect(
    this.page.locator('[data-test="error"]')
  ).toContainText(message);
  }
}