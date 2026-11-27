const { test, expect } = require('@playwright/test');

test('Client App Login', async ({ page }) => {

    const userName = page.locator('input#userEmail');
    const password = page.locator('input#userPassword');
    const signInBtn = page.locator("[type*='submit']");
    const cardItems = page.locator('.card-body b');
    const products = page.locator('.card-body');
    const productName = 'ZARA COAT 3';
    const email = 'thejas@gmail.com';

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

    await page.locator('[routerlink*="/dashboard/cart"]').click();

    // await page.waitForLoadState('domcontentloaded');
    // Or use the waitFor for the div or tag of that items

    await page.locator('div li').first().waitFor();

    const bool = await page.locator('h3:has-text("ZARA COAT 3")').isVisible();
    expect(bool).toBeTruthy();
    await page.locator("button:has-text('Checkout')").click();

    await page.locator("[placeholder*='Select Country']").pressSequentially('ind', { delay: 150 });
    const dropDown = page.locator(".ta-results");
    await dropDown.waitFor();
    const optionsCount = await dropDown.locator('button').count();
    for (let i = 0; i < optionsCount; i++) {
        if (await dropDown.locator('button').nth(i).textContent() === ' India') {
            await dropDown.locator('button').nth(i).click();
            break;
        }
    }
    await page.locator('[name="coupon"]').fill('rahulshettyacademy');
    await page.locator('[type="submit"]').click();
    await expect(page.locator('.field p:has-text(" * Coupon Applied")')).toBeVisible();
    // await page.pause();
    expect(await page.locator('.user__name [type="text"]').first()).toHaveText(email);
    await page.locator('input[type="text"]').nth(1).fill('2026')
    await page.locator('input[type="text"]').nth(2).fill('Rahul Shetty');
    await page.locator('.actions .action__submit:has-text("Place Order ")').click();
    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
    const orderId = await page.locator('tr.ng-star-inserted .em-spacer-1').textContent();
    console.log(orderId);

    // Assignment 
    await page.locator('button[routerLink*="/dashboard/myorders"]').click();
    await page.locator('tbody').waitFor();
    const rows = page.locator('tbody tr');

    for (let i = 0; i < rows.count(); i++) {
        const rowOrderId = await rows.nth(i).locator('th').textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator('button:has-text("View")').click();
            break;
        }
        await expect(page.locator('p.tagline')).toHaveText('Thank you for Shopping With Us');
        const orderIdDetails = await page.locator('div.col-text').textContent();
        await expect(orderIdDetails.includes(orderId)).toBeTruthy();
    }
});
