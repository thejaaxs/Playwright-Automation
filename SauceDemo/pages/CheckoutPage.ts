import { Page } from '@playwright/test';

export class CheckoutPage {
    constructor(private page: Page) { }
    async enterCustomerInformation(firstName: string, lastName: string, postalCode: string) {
        await this.page.locator('[data-test="firstName"]').fill(firstName);
        await this.page.locator('[data-test="lastName"]').fill(lastName);
        await this.page.locator('[data-test="postalCode"]').fill(postalCode);
        await this.page.locator('[data-test="continue"]').click();
    }

    async finishOrder() {
        await this.page.locator('[data-test="finish"]').click();
    }
}