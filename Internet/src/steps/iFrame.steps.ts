import { Given, When, Then } from '@cucumber/cucumber';
import { TestWorld } from '../support/world';
import assert from 'node:assert/strict';

Given('I open the Iframe page', async function (this: TestWorld) {
    await this.iframePage.open();
});

When('I replace the iframe editor text with {string}', async function (this: TestWorld, text: string) {
    await this.iframePage.replaceEditorText(text);
})

Then('the iframe editor should contain {string}', async function (this: TestWorld, expectedText: string) {
    assert.equal(await this.iframePage.getEditorText(), expectedText);
})