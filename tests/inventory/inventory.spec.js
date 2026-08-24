const { test, expect } = require('../../fixtures/baseFixture');


test('verify user can add product to cart', async ({loggedInPage, inventoryPage }) => {

    //add backpack
    await inventoryPage.addProductToCart(
        'Sauce Labs Backpack'
    );

    //verify cart badge
    await expect(inventoryPage.cartBadge).toHaveText("1");

});

test('Verify user can remove product from cart', async ({loggedInPage, inventoryPage }) => {

    //add onesie
    await inventoryPage.addProductToCart(
        "Sauce Labs Onesie"
    );

    //verify cartbadge
    await expect(inventoryPage.cartBadge).toHaveText("1");

    //remove onesie
    await inventoryPage.removeProductFromCart(
        "Sauce Labs Onesie"
    );

    await expect(inventoryPage.cartBadge).toBeHidden();

});


test('Verify user can add multiple product to the cart', async ({loggedInPage, inventoryPage }) => {

    await inventoryPage.addProductToCart(
        "Sauce Labs Backpack"
    );

    await inventoryPage.addProductToCart(
        "Sauce Labs Bike Light"
    );

    await expect(inventoryPage.cartBadge).toHaveText("2");

});


test('Verify products can be sorted from Name (Z to A)', async ({loggedInPage, inventoryPage }) => {

    //select Z to A sorting
    await inventoryPage.sortProducts("za");

    //Get all product names 
    const productNames = await inventoryPage.getProductNames();

    //verify first product
    expect(productNames[0]).toBe(
        "Test.allTheThings() T-Shirt (Red)"
    );

});