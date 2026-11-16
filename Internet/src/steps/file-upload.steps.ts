import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { TestWorld } from '../support/world';

Given('I open the file upload page', async function (this: TestWorld) {
    await this.fileUpload.open();
});

When('I upload the sample file', async function (this: TestWorld) {
    const filePath = resolve(__dirname, '../test-data/upload.txt')
    await this.fileUpload.uploadFile(filePath);
});

Then('the uploaded filename should be {string}', async function (this: TestWorld, expectedFilename: string) {
    assert.equal(await this.fileUpload.getUploadedFilename(), expectedFilename);
})  