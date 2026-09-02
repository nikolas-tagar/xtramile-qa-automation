import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async expectItemVisible(productName: string) {
    await expect(
      this.page.locator('.cart_item').filter({ hasText: productName })
    ).toBeVisible();
  }

  async removeItem(productName: string) {
    const item = this.page
      .locator('.cart_item')
      .filter({ hasText: productName });

    await item.locator('button').click();
  }

  async expectItemNotVisible(productName: string) {
    await expect(
      this.page.locator('.cart_item').filter({ hasText: productName })
    ).toHaveCount(0);
  }

  async checkout() {
    await this.page.locator('[data-test="checkout"]').click();
  }
}