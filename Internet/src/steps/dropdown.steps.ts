import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'node:assert/strict';
import { TestWorld } from '../support/world';

Given('I open the dropdown page', async function (this: TestWorld) {
    await this.dropDownPage.open();
});

When('I select the dropdown option {string}', async function (this: TestWorld, value: string) {
    await this.dropDownPage.selectOption(value);
});

Then('the selected dropdown value should be {string}', async function (this: TestWorld, expectedValue: string) {
    assert.equal(await this.dropDownPage.getSelectedValue(), expectedValue);
});