import { Page } from '@playwright/test';

export class CartPage {
    constructor(private page: Page) { };

    async checkout() {
        await this.page.locator('[data-test="checkout"]').click();
    }

    async removeBikeLight() {
        await this.page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
    }
}