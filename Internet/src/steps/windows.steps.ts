import { Given, When, Then } from '@cucumber/cucumber';
import { TestWorld } from '../support/world';
import assert from 'node:assert/strict';

Given('I open the windows page', async function (this: TestWorld) {
    await this.windowsPage.open();
});

When('I open the link in a new tab', async function (this: TestWorld) {
    await this.windowsPage.openNewTab();
});

Then('the new tab URL should be {string}', async function (this: TestWorld, expectedUrl: string) {
    assert.equal(await this.windowsPage.getNewTabUrl(), expectedUrl);
});

When('I switch back to the original tab', async function (this: TestWorld) {
    await this.windowsPage.switchBackToOriginalTab();
});

Then('the original tab URL should be {string}', async function (this: TestWorld, expectedUrl: string,) {
    assert.equal(await this.windowsPage.getOriginalTabUrl(), expectedUrl);
});