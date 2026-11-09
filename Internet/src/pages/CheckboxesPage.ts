import {type Locator, type Page} from 'playwright';

export class CheckboxesPage{
    private readonly checkboxes:Locator;

    constructor (private readonly page:Page){
        this.checkboxes = page.locator('input[type="checkbox"]');
    }

    async open():Promise<void>{
        await this.page.goto('https://the-internet.herokuapp.com/checkboxes',{waitUntil:'domcontentloaded'});
    }

    async checkFirstAndUncheckSecond():Promise<void>{
        await this.checkboxes.nth(0).check();
        await this.checkboxes.nth(1).uncheck();
    }

    async isFirstChecked():Promise<boolean>{
        return await this.checkboxes.nth(0).isChecked();
    }

    async isSecondUnchecked():Promise<boolean>{
        return !(await this.checkboxes.nth(1).isChecked());
    }
}