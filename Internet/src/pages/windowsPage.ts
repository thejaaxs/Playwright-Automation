import { type Locator, type Page } from 'playwright';

export class WindowsPage {
    private newTab: Page | undefined;

    constructor(private readonly originalPage: Page) { }

    async open(): Promise<void> {
        await this.originalPage.goto('https://the-internet.herokuapp.com/windows/', { waitUntil: 'domcontentloaded' });
    }
    async openNewTab(): Promise<void> {
        // Listener
        const newTabPromise = this.originalPage.context().waitForEvent('page');
        await this.originalPage.getByRole('link', { name: 'Click Here' }).click();

        this.newTab = await newTabPromise;
        await this.newTab.waitForLoadState('domcontentloaded')
    }
    async getNewTabUrl(): Promise<string> {
        return this.getNewTab().url();
    }
    async switchBackToOriginalTab(): Promise<void> {
        await this.originalPage.bringToFront();
    }
    async getOriginalTabUrl(): Promise<string> {
        return this.originalPage.url();
    }

    private getNewTab(): Page {
        if (!this.newTab)
            throw new Error('The New Tab has not been open yet');
        return this.newTab;
    }
}