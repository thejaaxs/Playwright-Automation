import type { Locator, Page } from 'playwright';

export class DropdownPage {
    private readonly dropdown: Locator;

    constructor(private readonly page: Page) {
        this.dropdown = page.locator('#dropdown');
    }

    async open(): Promise<void> {
        await this.page.goto('https://the-internet.herokuapp.com/dropdown', { waitUntil: 'domcontentloaded' });
    }

    async selectOption(value: string): Promise<void> {
        await this.dropdown.selectOption(value);
    }

    async getSelectedValue(): Promise<string> {
        return await this.dropdown.inputValue();
    }
}