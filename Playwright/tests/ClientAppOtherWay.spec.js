import { test, expect } from '@playwright/test';

test('@Webst Client App Login', async ({ page }) => {
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

// Playwright Codegen code !
test('test', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.locator('form input[name="name"]').click();
    await page.locator('form input[name="name"]').fill('Thejas Shetty');
    await page.locator('input[name="email"]').click();
    await page.locator('input[name="email"]').fill('thejas@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('Yash@2102');
    await page.getByRole('checkbox', { name: 'Check me out if you Love' }).check();
    await page.getByText('Employed').click();
    await page.getByRole('radio', { name: 'Employed' }).check();
    await page.locator('input[name="bday"]').fill('2026-11-19');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('form-comp')).toContainText('× Success! The Form has been submitted successfully!.');
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.locator('app-card').filter({ hasText: 'iphone X $24.99 Lorem ipsum' }).getByRole('button').click();
    await page.locator('app-card').filter({ hasText: 'Samsung Note 8 $24.99 Lorem' }).getByRole('button').click();
    await page.getByText('Checkout ( 2 ) (current)').click();
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.getByText('I agree with the term &').click();
    await page.getByRole('textbox', { name: 'Please choose your delivery' }).fill('Manchapuram');
    await page.getByRole('checkbox', { name: 'I agree with the term &' }).check();
    await page.locator('input[value="Purchase"]').click();
    await expect(page.locator('app-checkout')).toContainText('× Success! Thank you! Your order will be delivered in next few weeks :-).');
});