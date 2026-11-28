import { test, expect } from '@playwright/test';

test('Playwright Special Locators', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel('Check me out if you Love IceCreams!').click();
    await page.getByLabel('Employed').click();
    await page.getByLabel('Gender').selectOption('Female');
    await page.getByPlaceholder('Password').fill('Thejas@2004');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByText(' The Form has been submitted successfully!.').isVisible();
    // Step Level Assertions timeout increase
    await expect(page.getByText(' The Form has been submitted successfully!.')).toBeVisible({ timeout: 10_000 });
    await page.getByRole('link', { name: 'Shop' }).click();
    // Use all the above and make sure that you use the NOKIA EDGE mobile
    await page.locator('app-card').filter({ hasText: 'Nokia Edge' }).getByRole('button', { name: 'Add ' }).click();

    // waitFor = Timeouts
    // Assertions wait for 5 seconds ( only for expect )
    // We can change the override timeout 

});

// 30 seconds , else this will fail 
test('Playwright Test Level Timeout', async ({ page }) => {

    // Overrides >> global level 
    // page.setDefaultTimeout(9000);

    // Test Level Timeout
    test.setTimeout(60000);

    // Configure your expect - to slow timeout or something 
    const softExpect = expect.configure({ timeout: 10000 });

    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel('Check me out if you Love IceCreams!').click();
    await page.getByLabel('Employed').click();
    await page.getByLabel('Gender').selectOption('Female');
    await page.getByPlaceholder('Password').fill('Thejas@2004');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByText(' The Form has been submitted successfully!.').isVisible();
    // Step Level Assertions timeout increase
    await softExpect(page.getByText(' The Form has been submitted successfully!.')).toBeVisible({ timeout: 10_000 });
    await page.getByRole('link', { name: 'Shop' }).click();
    // It will take some time 
    await softExpect(page.locator('h1.my-4')).toHaveText('Shop Name')

    // Use all the above and make sure that you use the NOKIA EDGE mobile
    await page.locator('app-card').filter({ hasText: 'Nokia Edge' }).getByRole('button', { name: 'Add ' }).click();

});