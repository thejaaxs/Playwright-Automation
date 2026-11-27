import { test, expect } from '@playwright/test';

test.only('@Webst Client App Login', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
})