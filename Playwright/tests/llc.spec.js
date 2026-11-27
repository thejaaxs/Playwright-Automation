import { test, expect } from '@playwright/test';

test('Playwright Special Locators', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel('Check me out if you Love IceCreams!').click();
    await page.getByLabel('Employed').click();
    await page.getByLabel('Gender').selectOption('Female');
    await page.getByPlaceholder('Password').fill('Thejas@2004');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByText(' The Form has been submitted successfully!.').isVisible();
    await expect(page.getByText(' The Form has been submitted successfully!.')).toBeVisible();
    await page.getByRole('link', { name: 'Shop' }).click();
    // Use all the above and make sure that you use the NOKIA EDGE mobile
    await page.locator('app-card').filter({ hasText: 'Nokia Edge' }).getByRole('button', { name: 'Add ' }).click();

    // waitFor = Timeouts


});