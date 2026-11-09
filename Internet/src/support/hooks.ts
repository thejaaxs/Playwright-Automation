import { Before, After } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { CheckboxesPage } from '../pages/CheckboxesPage';
import { TestWorld } from './world';


Before(async function (this: TestWorld){
    this.browser = await chromium.launch({headless:true});
    this.page = await this.browser.newPage();
    this.checkboxesPage = await new CheckboxesPage(this.page);
});


After(async function (this: TestWorld){
    if(this.browser)
        this.browser.close();
});