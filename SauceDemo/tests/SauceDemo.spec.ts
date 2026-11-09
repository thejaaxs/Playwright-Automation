import { test, expect } from '@playwright/test';

const baseUrl = 'https://www.saucedemo.com/';
const validUsername = 'standard_user';
const password = 'secret_sauce';

async function login(page: Parameters<Parameters<typeof test>[0]>[0]['page'], username: string, password: string) {
    await page.locator('[data-test="username"]').fill(username);
    await page.locator('[data-test="password"]').fill(password);
    await page.locator('[data-test="login-button"]').click();
}

test("Launch Chromium & Verify The Page Title", async ({ page }) => {
    await page.goto(baseUrl);
    await expect(page).toHaveTitle('Swag Labs');
});

test('Login with Valid Credentials', async ({ page }) => {
    await page.goto(baseUrl);
    await login(page, validUsername, password);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    // await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
});

test('Login With Invalid Credentials', async ({ page }) => {
    await page.goto(baseUrl);
    await login(page, 'WrongUser', 'WrongPassword');
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');
});

test('Print Every Product Name & Price', async ({ page }) => {
    await page.goto(baseUrl);
    await login(page, validUsername, password);

    const products = await page.locator('[data-test="inventory-item"]');
    const count = await products.count();

    for (let index = 0; index < count; index++) {
        const product = products.nth(index);

        const name = await product.locator('[data-test="inventory-item-name"]').textContent();
        const price = await product.locator('[data-test="inventory-item-price"]').textContent();

        console.log(`${name} - ${price}`);
    }
});

test('Sort Products From Low to High Price', async ({ page }) => {
    await page.goto(baseUrl);
    await login(page, validUsername, password);
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

    const priceElements = page.locator('[data-test="inventory-item-price"]');
    const pricesText = await priceElements.allTextContents();
    const prices = pricesText.map(price => Number(price.replace('$', '')));
    const sortedPrices = [...prices].sort((first, second) => first - second);

    expect(prices).toEqual(sortedPrices);
});

test('Add & Remove Product From the cart', async ({ page }) => {
    await page.goto(baseUrl);
    await login(page, validUsername, password);
    const products = [
        'Sauce Labs Backpack',
        'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt',
    ];
    for (let productName of products) {
        let product = page.locator('[data-test="inventory-item"]').filter({ hasText: productName });
        await product.getByRole('button', { name: 'Add to cart' }).click();
    }

    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('3');
        await page.locator('[data-test="shopping-cart-link"]').click()

    await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();

    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(2);
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');
});

test('Complete Checkout Using Dynamic Customer Information', async ({ page }) => {
    await page.goto(baseUrl);
    await login(page, validUsername, password);

    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();

    const consumer = {
        firstName: 'Thanesh',
        lastName: 'Shetty',
        postalCode: '575001',
    };

    await page.locator('[data-test="firstName"]').fill(consumer.firstName);
    await page.locator('[data-test="lastName"]').fill(consumer.lastName);
    await page.locator('[data-test="postalCode"]').fill(consumer.postalCode);

    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');

    await page.locator('[data-test="finish"]').click();
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
});
