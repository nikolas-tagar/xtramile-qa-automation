import { Page, expect } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  async expectInventoryPage() {
    await expect(this.page).toHaveURL(/inventory\.html/);

    await expect(
      this.page.locator('.inventory_list')
    ).toBeVisible();
  }

  async addItem(productName: string) {
    const productSlug = productName
      .toLowerCase()
      .replace(/ /g, '-');

    const button = this.page.locator(
      `#add-to-cart-${productSlug}`
    );

    await expect(button).toBeVisible();
    await button.click();
  }

  async removeItem(productName: string) {
    const productSlug = productName
      .toLowerCase()
      .replace(/ /g, '-');

    const button = this.page.locator(
      `#remove-${productSlug}`
    );

    await expect(button).toBeVisible();
    await button.click();
  }

  async expectCartBadge(count: number) {
    await expect(
      this.page.locator('[data-test="shopping-cart-badge"]')
    ).toHaveText(String(count));
  }

  async openCart() {
    await this.page
      .locator('[data-test="shopping-cart-link"]')
      .click();
  }

  async logout() {
    await this.page
      .locator('#react-burger-menu-btn')
      .click();

    await this.page
      .locator('[data-test="logout-sidebar-link"]')
      .click();
  }
}