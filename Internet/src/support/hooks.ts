import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { CheckboxesPage } from '../pages/CheckboxesPage';
import { TestWorld } from './world';
import { JavascriptAlertPage } from '../pages/JavascriptAlertsPage';

setDefaultTimeout(15_000);

Before(async function (this: TestWorld) {
    this.browser = await chromium.launch({ headless: true });
    this.page = await this.browser.newPage();
    this.checkboxesPage = new CheckboxesPage(this.page);
    this.javascriptAlertPage = new JavascriptAlertPage(this.page);
});


After(async function (this: TestWorld) {
    if (this.browser)
        await this.browser.close();
});