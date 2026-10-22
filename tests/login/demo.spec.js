
const {test, expect} = require('@playwright/test');


test('login', async({page})=> {

    await page.goto('https://practicetestautomation.com/practice-test-login/');
    await page.getByRole('textbox', {name: 'username'}).fill('student');
    await page.getByRole('textbox', {name: 'password'}).fill('Password123');
    await page.getByRole('button', {name: 'submit'}).click();

    await expect(page).toHaveTitle('Logged In Successfully | Practice Test Automation');

    console.log('login successful and title verified')

});


