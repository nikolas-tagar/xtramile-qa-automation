import { test } from '../fixtures/test';
import { checkoutData } from '../test-data/users';

test.describe('Checkout', () => {

  test('should complete checkout successfully', async ({
    inventoryPage,
    cartPage,
    checkoutPage,
    authenticated,
  }) => {
    await inventoryPage.addItem('Sauce Labs Backpack');

    await inventoryPage.openCart();

    await cartPage.expectItemVisible('Sauce Labs Backpack');

    await cartPage.checkout();

    await checkoutPage.fillCustomerInformation(
      checkoutData.firstName,
      checkoutData.lastName,
      checkoutData.postalCode
    );

    await checkoutPage.continue();

    await checkoutPage.finish();

    await checkoutPage.expectOrderCompleted();
  });

  test('should display validation error when required checkout information is missing', async ({
    inventoryPage,
    cartPage,
    checkoutPage,
    authenticated,
  }) => {
    await inventoryPage.addItem('Sauce Labs Backpack');

    await inventoryPage.openCart();

    await cartPage.checkout();

    await checkoutPage.continue();

    await checkoutPage.expectCheckoutError(
      'Error: First Name is required'
    );
  });

});