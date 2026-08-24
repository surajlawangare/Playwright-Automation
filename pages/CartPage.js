const BasePage = require('../pages/BasePage');

class CartPage extends BasePage {

    constructor(page) {
        super(page);

        this.cartTitle = page.locator('.title');
        this.checkoutButton = page.locator('#checkout');
        this.continueShoppingButton = page.locator('#continue-shopping');
        this.cartItems = page.locator('.inventory_item_name');
    }

    async verifyCartPageLoaded() {
        await this.cartTitle.waitFor();
    }

    async continueShopping() {
        await this.click(this.continueShoppingButton);
    }

    async clickCheckout() {
        await this.click(this.checkoutButton);
    }

    async isProductInCart(productName) {

        const product = this.page.locator('.inventory_item_name').filter({
            hasText: productName
        });

        return await product.isVisible();

    }

    async removeProductFromCart(productName) {
        const product = this.page.locator('.cart_item').filter({
            hasText: productName
        });


        await this.click(
            product.getByRole('button', {
                name: 'Remove'
            })
        );
    }

    async isCartEmpty() {
        return await this.cartItems.count() === 0;
    }

}

module.exports = CartPage;