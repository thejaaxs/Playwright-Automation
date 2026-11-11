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

Then('I should see the result "I am a JS Alert"', async function (this: TestWorld) {
    const dialog = await this.javascriptAlertPage.acceptConfirmation();
    assertDialog(dialog, 'confirm', 'I am a JS Confirm')
})