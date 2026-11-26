const { test, expect } = require('@playwright/test');

test.only('Client App Login', async ({ page }) => {

    const userName = page.locator('input#userEmail');
    const password = page.locator('input#userPassword');
    const signInBtn = page.locator("[type*='submit']");
    const cardItems = page.locator('.card-body b');
    const products = page.locator('.card-body');
    const productName = 'ZARA COAT 3';

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await userName.fill('thejas@gmail.com');
    await password.type('Thejas@2004');
    await signInBtn.click();

    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded');

    const items = await cardItems.allTextContents();
    console.log(items);

    const count = await products.count();
    for (let i = 0; i < count; i++) {
        if (await products.nth(i).locator('b').textContent() === productName) {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
});

