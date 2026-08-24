
const { test, expect } = require('../../fixtures/baseFixture');


test('Verify user can open cart page', async ({
    loggedInPage,
    inventoryPage,
    cartPage
}) => {

    //Add product
    await inventoryPage.addProductToCart(
        "Sauce Labs Backpack"
    );

    //Verify cart badge
    await expect(inventoryPage.cartBadge).toHaveText("1");

    //Open cart
    await inventoryPage.openCart();

    //Verify cart page
    await cartPage.verifyCartPageLoaded();

    //Verify product in cart
    expect(await cartPage.isProductInCart("Sauce Labs Backpack")).toBeTruthy();

});

test('Verify user can continue shopping from cart page', async ({
    loggedInPage,
    inventoryPage,
    cartPage
}) => {

    //Add product to cart
    await inventoryPage.addProductToCart(
        "Sauce Labs Backpack"
    );

    //Verify cart badge
    await expect(inventoryPage.cartBadge).toHaveText("1");

    //Open the cart
    await inventoryPage.openCart();

    //Verify the cart page
    await cartPage.verifyCartPageLoaded();

    //Verify product in cart
    await cartPage.isProductInCart("Sauce Labs Backpack");

    //Click on the continue shopping button
    await cartPage.clickCheckout();

    //Verify inventory page loading again
    await inventoryPage.verifyInventoryPageLoaded();

});

test('Verify user can remove product from cart page', async ({
    loggedInPage,
    inventoryPage,
    cartPage
}) => {

    //Add product to cart
    await inventoryPage.addProductToCart(
        "Sauce Labs Fleece Jacket"
    );

    //Verify cart badge
    await expect(inventoryPage.cartBadge).toHaveText("1");

    //Open the cart
    await inventoryPage.openCart();

    //Verify the cart page
    await cartPage.verifyCartPageLoaded();

    //Verify product in cart
    expect(await cartPage.isProductInCart("Sauce Labs Fleece Jacket")).toBeTruthy();

    //Remove product from cart
    await cartPage.removeProductFromCart(
        'Sauce Labs Fleece Jacket'
    );

    //verify cart is empty
    expect(await cartPage.isCartEmpty()).toBeTruthy();

});