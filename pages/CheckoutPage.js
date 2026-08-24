const BasePage = require('./BasePage');

class CheckoutPage extends BasePage {

    constructor(page) {
        super(page);

        this.checkoutTitle = page.locator('.title');
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.postalCodeInput = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
        this.cancelButton = page.locator('#cancel');

    }

    async verifyCheckoutPageLoaded() {
        await this.checkoutTitle.waitFor();
    }

    async enterCheckoutInformation(firstName, lastName, postalCode) {
        await this.fill(this.firstNameInput, firstName);
        await this.fill(this.lastNameInput, lastName);
        await this.fill(this.postalCodeInput, postalCode);

    }

    async clickContinue() {
        await this.click(this.continueButton);
    }

    async clickCancel() {
        await this.click(this.cancelButton);
    }



}

module.exports = CheckoutPage;