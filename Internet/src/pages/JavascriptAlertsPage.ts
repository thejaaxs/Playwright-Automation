import { type Dialog, type Page } from 'playwright';

export interface DialogDetails {
    type: string;
    message: string;
}
export class JavascriptAlertPage {
    constructor(private readonly page: Page) { }

    async open(): Promise<void> {
        await this.page.goto(`https://the-internet.herokuapp.com/javascript_alerts`, { waitUntil: 'domcontentloaded' });
    }

    async acceptAlert(): Promise<DialogDetails> {
        return this.triggerDialog('Click for JS Alert', (dialog) => dialog.accept());
    }
    async acceptConfirmation(): Promise<DialogDetails> {
        return this.triggerDialog('Click for JS Confirm', (dialog) => dialog.accept());
    }

    async dismissConfirmation(): Promise<DialogDetails> {
        return this.triggerDialog('Click for JS Confirm', (dialog) => dialog.dismiss());
    }

    async submitPrompt(value: string): Promise<DialogDetails> {
        return this.triggerDialog('Click for JS Prompt', (dialog) => dialog.accept(value));
    }

    async getResultText() {
        return this.page.locator('#result').innerText();
    }

    private async triggerDialog(buttonName: string, action: (dialog: Dialog) => Promise<void>): Promise<DialogDetails> {
        const dialogPromise = this.page.waitForEvent('dialog').then(async (dialog) => {
            const details: DialogDetails = {
                type: dialog.type(),
                message: dialog.message()
            }

            await action(dialog);
            return details;
        });

        await Promise.all([this.page.getByRole('button', { name: buttonName }).click(), dialogPromise]);
        return dialogPromise;
    }
}   