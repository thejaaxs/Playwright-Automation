import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('Complete Purchase Using Re-Usable Page Obejcts', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    await inventoryPage.addProducts(['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt']);
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('3');
    await inventoryPage.openCart();

    await cartPage.removeBikeLight();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');
    await cartPage.checkout();

    await expect(page.locator('[data-test="title"]')).toContainText('Checkout: Your Information');

    await checkoutPage.enterCustomerInformation('Yeshnath', 'Gokaley', String(Date.now()).slice(-6));

    await checkoutPage.finishOrder();

    await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');
});