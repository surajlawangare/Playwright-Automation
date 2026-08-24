const BasePage = require("./BasePage");


class CheckoutOverviewPage extends BasePage {

    constructor(page) {
        super(page);

        this.checkoutOverviewTitle = page.locator('.title');
        this.finishButton = page.locator('#finish');
        this.cancelButton = page.locator('#cancel');

    }

    async verifyCheckoutOverviewLoaded() {
        await this.checkoutOverviewTitle.waitFor();
    }

    async clickFinish() {
        await this.click(this.finishButton);
    }

    async clickCancel() {
        await this.click(this.cancelButton);
    }


}

module.exports = CheckoutOverviewPage;