import { Given, When, Then} from '@cucumber/cucumber';
import assert from 'node:assert/strict';
import { TestWorld } from '../support/world';

Given('I open the CheckBoxes Page', async function(this: TestWorld){
    await this.checkboxesPage.open();
});

When( 'I check the first checkbox and uncheck the second checkbox', async function (this: TestWorld){
    await this.checkboxesPage.checkFirstAndUncheckSecond();
});

Then('the first checkbox should be checked',async function(this: TestWorld){
    assert.equal(await this.checkboxesPage.isFirstChecked(),true);
});

Then('the second checkbox should be unchecked',async function (this: TestWorld){
    assert.equal(await this.checkboxesPage.isSecondUnchecked(),true)
});