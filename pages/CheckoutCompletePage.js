const { expect } = require("@playwright/test");
const BasePage = require("./BasePage");

class CheckoutCompletePage extends BasePage {

    constructor(page) {
        super(page);

        this.completeTitle = page.locator('.title');
        this.completeHeader = page.locator('.complete-header');
        this.backHomeButton = page.locator('#back-to-products');

    }

    async verifyCheckoutCompletePageLoaded() {
        await this.completeTitle.waitFor();
    }

    async verifyOrderSuccessMessage() {
        await expect(this.completeHeader).toHaveText('Thank you for your order!');
    }

    async clickBackHome() {
        await this.click(this.backHomeButton);
    }

}

module.exports = CheckoutCompletePage;