const { test, expect } = require('@playwright/test');

test('Always give your title', async function () {
    // Playwright Codes should be written
    // Since Javascript is asynchronous - use async, await wisely
});

// Browser, Page are the Playwright Fixtures !

test('Browser Context Playwright Test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
});

test('Page Playwright Test', async ({ page }) => {
    await page.goto('https://www.google.com/');
});

test('Amazon Page', async ({ page }) => {
    await page.goto('https://www.amazon.com');
});

test('Asserting Title', async ({ page }) => {
    const title = await page.goto('https://www.google.com/');
    console.log(await page.title());
    await expect(page).toHaveTitle('Google');
});

test('Login Page Practice', async ({ page }) => {
    await page.goto('https://www.rahulshettyacademy.com/loginpagePractise/');
    await page.locator('input#username').fill('rahulshetty');
    await page.locator('[type="password"]').fill('Learning@83');
    await page.locator('input#signInBtn').click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator('[style*="block"]')).toContainText('Incorrect');
});

test('Browser Login Successfully', async ({ page }) => {
    const userName = page.locator('input#username');
    const password = page.locator("[type*='password']");
    const signInBtn = page.locator('input#signInBtn');
    const cardItems = page.locator('.card-body a');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    await userName.fill('rahulshettyacademy');
    await password.fill('Learning@830$3mK2');
    await signInBtn.click();
    console.log(await page.locator('.card-body a').nth(0).textContent());
    console.log(await page.locator('.card-body a').last().textContent());

    // To get all the text contents 
    const items = await cardItems.allTextContents();
    // allTextContents does not have the auto-wait capability !
    console.log(items);
});

test('UI Controls', async ({ page }) => {
    const userName = page.locator('input#username');
    const password = page.locator("[type*='password']");
    const dropdown = page.locator('select.form-control');
    const signBtn = page.locator('input#signInBtn');
    const documentLink = page.locator("[href*='documents-request']");

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await userName.fill('rahulshettyacademy')
    await password.fill('Learning@830$3mK2');
    await dropdown.selectOption('Consultant');
    await page.locator("[name*='radio']").last().click();
    expect(await page.locator("[name*='radio']").last()).toBeChecked();
    await page.locator('button#okayBtn').click();
    await page.locator("[name*='terms']").click();
    expect(await page.locator("[name*='terms']")).toBeChecked();
    await page.waitForLoadState('domcontentloaded');
    // await page.locator('#terms').uncheck();
    // expect(await page.locator('#terms').isChecked.toBeFalsy());
    await expect(documentLink).toHaveAttribute('class', 'blinkingText');
    await signBtn.click();
});

test.only('Child Windows Handling', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const documentLink = page.locator("[href*='documents-request']");
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    // Parallel Execution 
    const [newPage] = Promise.all(
        [context.waitForEvent('page'),
        documentLink.click()]
    ); // newPage can be accessed !
});