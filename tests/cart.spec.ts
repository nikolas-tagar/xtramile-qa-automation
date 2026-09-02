import { test } from '../fixtures/test';

test.describe('Shopping Cart', () => {

  test('should add item to cart and update cart badge', async ({
    inventoryPage,
    authenticated,
  }) => {
    await inventoryPage.addItem('Sauce Labs Backpack');

    await inventoryPage.expectCartBadge(1);
  });

  test('should add multiple items and update cart badge correctly', async ({
    inventoryPage,
    authenticated,
  }) => {
    await inventoryPage.addItem('Sauce Labs Backpack');
    await inventoryPage.addItem('Sauce Labs Bike Light');

    await inventoryPage.expectCartBadge(2);
  });

  test('should remove item from cart', async ({
    inventoryPage,
    cartPage,
    authenticated,
  }) => {
    await inventoryPage.addItem('Sauce Labs Backpack');

    await inventoryPage.expectCartBadge(1);

    await inventoryPage.openCart();

    await cartPage.expectItemVisible('Sauce Labs Backpack');

    await cartPage.removeItem('Sauce Labs Backpack');

    await cartPage.expectItemNotVisible('Sauce Labs Backpack');
  });

  test('should display all added items in the cart', async ({
    inventoryPage,
    cartPage,
    authenticated,
  }) => {
    await inventoryPage.addItem('Sauce Labs Backpack');
    await inventoryPage.addItem('Sauce Labs Bike Light');

    await inventoryPage.openCart();

    await cartPage.expectItemVisible('Sauce Labs Backpack');
    await cartPage.expectItemVisible('Sauce Labs Bike Light');
  });

  test('should remove one item while keeping other items in cart', async ({
    inventoryPage,
    cartPage,
    authenticated,
  }) => {
    await inventoryPage.addItem('Sauce Labs Backpack');
    await inventoryPage.addItem('Sauce Labs Bike Light');

    await inventoryPage.openCart();

    await cartPage.removeItem('Sauce Labs Backpack');

    await cartPage.expectItemNotVisible('Sauce Labs Backpack');
    await cartPage.expectItemVisible('Sauce Labs Bike Light');
  });

});