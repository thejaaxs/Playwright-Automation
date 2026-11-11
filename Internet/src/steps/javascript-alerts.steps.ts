import { TestWorld } from '../support/world';
import { Given, Then, When } from '@cucumber/cucumber';
import assert from 'node:assert/strict';
import type { DialogDetails } from '../pages/JavascriptAlertsPage';

function assertDialog(dialog: DialogDetails, expectedType: string, expectedMessage: string): void {
    assert.equal(dialog.type, expectedType);
    assert.equal(dialog.message, expectedMessage);
}

Given('I open the Javascript alerts page', async function (this: TestWorld) {
    await this.javascriptAlertPage.open();
});

When('I accept the Javascript alert', async function (this: TestWorld) {
    const dialog = await this.javascriptAlertPage.acceptAlert();
    assertDialog(dialog, 'alert', 'I am a JS Alert');
});

When('I accept the Javascript confirmation"', async function (this: TestWorld) {
    const dialog = await this.javascriptAlertPage.acceptConfirmation();
    assertDialog(dialog, 'confirm', 'I am a JS Confirm')
});

When('I dismiss the Javascript confirmation', async function (this: TestWorld) {
    const dialog = await this.javascriptAlertPage.dismissConfirmation();
    assertDialog(dialog, 'confirm', 'I am a JS Confirm');
});

When('I submit {string} to the Javascript prompt', async function (this: TestWorld, value: string) {
    const dialog = await this.javascriptAlertPage.submitPrompt(value);
    assertDialog(dialog, 'prompt', 'I am a JS prompt');
});

Then('I should see the result {string}', async function (this: TestWorld, expectedResult: string) {
    assert.equal(await this.javascriptAlertPage.getResultText(), expectedResult);
});