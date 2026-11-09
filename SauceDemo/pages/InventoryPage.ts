import { Page } from '@playwright/test';

export class InventoryPage {
    constructor(private page: Page) { }

    async addProducts(productNames: string[]) {
        for (let productName of productNames) {
            const product = this.page.locator('[data-test="inventory-item"]').filter({ hasText: productName });
            await product.getByRole('button', { name: 'Add to cart' }).click();
        }
    }

    async openCart() {
        await this.page.locator('[data-test="shopping-cart-link"]').click();
    }

    async sortByPriceLowtoHigh() {
        await this.page.locator('[data-test="product-sort-container"]').selectOption('lohi');
    }
}

