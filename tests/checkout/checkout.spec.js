const { test, expect } = require('../../fixtures/baseFixture');

const checkoutData = require('../../test-data/checkoutData.json');
const inventoryData = require('../../test-data/inventoryData.json')


test('Verify user can navigate to checkout page', async ({ 
    loggedInPage,
    inventoryPage,
    cartPage,
    checkoutPage
 }) => {

    //add product to the cart
    await inventoryPage.addProductToCart(
        inventoryData.products.backpack
    );

    //verify cart badge
    expect(await inventoryPage.getCartCount()).toBe("1");

    //open the cart
    await inventoryPage.openCart();

    //verify cartpage
    await cartPage.verifyCartPageLoaded();

    //click checkout
    await cartPage.clickCheckout();

    //Verify checkout page
    await checkoutPage.verifyCheckoutPageLoaded();

});

checkoutData.customers.forEach((customer) => {

    test(`Verify checkout information for ${customer.firstName}`, async ({
        loggedInPage,
        inventoryPage,
        cartPage,
        checkoutPage,
        checkoutOverviewPage
    }) => {

        // Add product to cart
        await inventoryPage.addProductToCart(
            "Sauce Labs Backpack"
        );

        // Open cart
        await inventoryPage.openCart();

        // Click checkout
        await cartPage.clickCheckout();

        // Verify checkout page
        await checkoutPage.verifyCheckoutPageLoaded();

        // Enter customer information from JSON
        await checkoutPage.enterCheckoutInformation(
            customer.firstName,
            customer.lastName,
            customer.postalCode
        );

        // Click Continue
        await checkoutPage.clickContinue();

        // Verify Checkout Overview page
        await checkoutOverviewPage.verifyCheckoutOverviewLoaded();

    });

});

test('Verify user can complete a order successfully', async ({ 
    loggedInPage,
    inventoryPage,
    cartPage,
    checkoutPage,
    checkoutOverviewPage,
    checkoutCompletePage
 }) => {

    //Add product to cart
    await inventoryPage.addProductToCart(
        "Sauce Labs Backpack"
    );

    //Open the cart
    await inventoryPage.openCart();

    //Click on the checkout
    await cartPage.clickCheckout();

    //Verify checkout page loaded
    await checkoutPage.verifyCheckoutPageLoaded();

    //Enter checkout page information
    await checkoutPage.enterCheckoutInformation(
        "Suraj",
        "Lawangare",
        "415501"
    );

    //Click continue button on checkout page
    await checkoutPage.clickContinue();

    //Verify the checkout overview page
    await checkoutOverviewPage.verifyCheckoutOverviewLoaded();

    //Finish the order
    await checkoutOverviewPage.clickFinish();

    //Verify checkout complete page loaded 
    await checkoutCompletePage.verifyCheckoutCompletePageLoaded();

    //Verify success message
    await checkoutCompletePage.verifyOrderSuccessMessage();

    //Back to the inventory page
    await checkoutCompletePage.clickBackHome();

    //Verify inventory page loaded
    await inventoryPage.verifyInventoryPageLoaded();

}
);