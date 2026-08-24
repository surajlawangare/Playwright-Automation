const { test: base } = require('@playwright/test');

const CartPage = require('../pages/CartPage');
const CheckoutCompletePage = require('../pages/CheckoutCompletePage');
const CheckoutOverviewPage = require('../pages/CheckoutOverviewPage');
const CheckoutPage = require('../pages/CheckoutPage');
const InventoryPage = require('../pages/InventoryPage');
const LoginPage = require('../pages/LoginPage');


exports.test = base.extend({

    loginPage: async ({ page }, use) => {

        const loginPage = new LoginPage(page);

        await use(loginPage);

    },

    inventoryPage: async ({ page }, use) => {

        const inventoryPage = new InventoryPage(page);

        await use(inventoryPage);

    },

    cartPage: async ({ page }, use) => {

        const cartPage = new CartPage(page);
        await use(cartPage);
    },

    checkoutPage: async ({ page }, use) => {
        const checkoutPage = new CheckoutPage(page);
        await use(checkoutPage);
    },

    checkoutOverviewPage: async ({ page }, use) => {

        const checkoutOverviewPage = new CheckoutOverviewPage(page);

        await use(checkoutOverviewPage);

    },


    checkoutCompletePage: async ({ page }, use) => {

        const checkoutCompletePage = new CheckoutCompletePage(page);

        await use(checkoutCompletePage);

    },

    loggedInPage: async ({ page, loginPage }, use) => {

        await loginPage.navigate();

        await loginPage.login(
            process.env.SAUCE_USERNAME,
            process.env.SAUCE_PASSWORD
        );

        await page.waitForURL(/inventory.html/);

        await use(page);

    },

    checkoutReadyPage: async ({
        loggedInPage,
        inventoryPage,
        cartPage,
        checkoutPage
    }, use) => {

        // Add product to cart
        await inventoryPage.addProductToCart(
            'Sauce Labs Backpack'
        );

        // Open cart
        await inventoryPage.openCart();

        // Click checkout
        await cartPage.clickCheckout();

        // Verify checkout page
        await checkoutPage.verifyCheckoutPageLoaded();

        // Provide checkout page to the test
        await use(checkoutPage);
    }


});

exports.expect = base.expect;

