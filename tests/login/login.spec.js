const { test, expect } = require('../../fixtures/baseFixture');

test('Verify user can login with valid credentials', async ({ page, loginPage }) => {

    await loginPage.navigate();

    await loginPage.login(
        process.env.SAUCE_USERNAME,
        process.env.SAUCE_PASSWORD
    );

    await expect(page).toHaveURL(/inventory.html/);

});