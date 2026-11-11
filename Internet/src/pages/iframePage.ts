import type { Locator, Page } from 'playwright';

export class IframePage {
    private readonly editor: Locator;

    constructor(private readonly page: Page) {
        this.editor = page.frameLocator('#mce_0_ifr').locator('#tinymce');
    }

    async open(): Promise<void> {
        await this.page.goto('https://the-internet.herokuapp.com/iframe', { waitUntil: 'domcontentloaded' });
    }

    async replaceEditorText(text: string): Promise<void> {
        await this.editor.fill(text);
    }
    async getEditorText(): Promise<string> {
        return this.editor.innerText();
    }
}
