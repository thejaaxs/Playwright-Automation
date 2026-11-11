import { setWorldConstructor, World, type IWorldOptions } from '@cucumber/cucumber';
import type { Browser, Page } from 'playwright';
import { CheckboxesPage } from '../pages/CheckboxesPage';
import { JavascriptAlertPage } from '../pages/JavascriptAlertsPage';
import { DropdownPage } from '../pages/DropdownPage';
import { IframePage } from '../pages/iframePage';

export class TestWorld extends World {
    browser!: Browser;
    page!: Page;
    checkboxesPage!: CheckboxesPage;
    javascriptAlertPage!: JavascriptAlertPage;
    dropDownPage!: DropdownPage;
    iframePage!: IframePage;

    constructor(options: IWorldOptions) {
        super(options);
    }
}

setWorldConstructor(TestWorld);