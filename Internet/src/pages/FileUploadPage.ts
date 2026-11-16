import { Locator, Page } from 'playwright';

export class FileUploadPage {
    private readonly fileInput: Locator;
    private readonly uploadButton: Locator;
    private readonly uploadedFilename: Locator;

    constructor(private readonly page: Page) {
        this.fileInput = page.locator('#file-upload');
        this.uploadButton = page.locator('#file-submit');
        this.uploadedFilename = page.locator('#uploaded-files');
    }

    async open(): Promise<void> {
        await this.page.goto('https://the-internet.herokuapp.com/upload', { waitUntil: 'domcontentloaded' });
    }

    async uploadFile(filePath: string): Promise<void> {
        await this.fileInput.setInputFiles(filePath);
        await this.uploadButton.click();
    }

    async getUploadedFilename(): Promise<string> {
        return this.uploadedFilename.innerText();
    }
}