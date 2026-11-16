import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'node:assert/strict';
import { TestWorld } from '../support/world';

Given('I open the file upload page', async function (this: TestWorld) {
    this.fileUpload.open();
})