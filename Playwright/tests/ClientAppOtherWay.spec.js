import { test, expect } from '@playwright/test';

test.only('@Webst Client App Login', async ({ page }) => {
    test.setTimeout(50000);
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.getByPlaceholder('email@example.com').fill('thejas@gmail.com');
    await page.getByPlaceholder("enter your passsword").fill("Thejas@2004");
    await page.getByRole('button', { name: 'Login' }).click();
    await page.locator('div .col-lg-4').filter({ hasText: 'ZARA COAT 3' }).getByRole('button', { name: ' Add To Cart' }).click();
    await page.locator('li .btn[routerlink*="/dashboard/cart"]').click();
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.getByPlaceholder("Select Country").pressSequentially('India');
    await page.getByRole('button', { name: ' India' }).last().click();
    await page.getByText('Place Order ').click();
})