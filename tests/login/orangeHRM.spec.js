const { test, expect } = require("@playwright/test");


test('Login with valid credential', async ({ page }) => {

    // navigate to the URL
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    //enter the valid username
    await page.getByRole('textbox', { name: 'username' }).fill('Admin');

    //enter the valid password 
    await page.getByRole('textbox', { name: 'password' }).fill('admin123');

    //click on login button
    await page.getByRole('button', { type: 'submit' }).click();

});


// test('Login with invalid credentials', async ({ page }) => {

//     // navigate to the URL
//     await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
//     //enter the invalid username
//     await page.getByRole('textbox', { name: 'username' }).fill('Wrong_User');

//     //enter the invalid password 
//     await page.getByRole('textbox', { name: 'password' }).fill('Wrong_User');

//     //click on login button
//     await page.getByRole('button', { type: 'submit' }).click();

//     //verify error message
//     const errorMessage = await page.getByText('Invalid credentials');
//     await expect(errorMessage).toHaveText('Invalid credentials');

// });

test('Click on Admin menu Verify System user panel is open', async ({ page }) => {

    // navigate to the URL
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    //enter the valid username
    await page.getByRole('textbox', { name: 'username' }).fill('Admin');

    //enter the valid password 
    await page.getByRole('textbox', { name: 'password' }).fill('admin123');

    //click on login button
    await page.getByRole('button', { type: 'submit' }).click();

    //Accept the popup
    page.on('dialog', async dialog => {
        await dialog.accept();
    });

    // click on Admin panel
    await page.getByText('Admin').click();

    // Verify admin panel
    const adminPanel = await page.getByText('System Users');
    await expect(adminPanel).toHaveText('System Users');

});

test('Verify the left panel menu items and list all the menus on console', async ({ page }) => {

    // navigate to the URL
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    //enter the valid username
    await page.getByRole('textbox', { name: 'username' }).fill('Admin');

    //enter the valid password 
    await page.getByRole('textbox', { name: 'password' }).fill('admin123');

    //click on login button
    await page.getByRole('button', { type: 'submit' }).click();

    //Accept the popup
    page.on('dialog', async dialog => {
        await dialog.accept();
    });

    // Verify dashboard is loaded
    await expect(page).toHaveURL(/dashboard/);

    //locate the Menu Items
    const menuItems = await page.locator('.oxd-main-menu-item');

    //Get the total number of items
    const menuCount = await menuItems.count();

    console.log('Total No of Items : ' + menuCount);

    //print each menu item
    for (let i = 0; i < menuCount; i++) {

        const menuName = await menuItems.nth(i).innerText();

        console.log(`Menu ${i + 1}: ${menuName}`);
    }

});







// 7 Filter the User role to ESS and verify the only ESS Employee are displayed in table
// 8 Click the Reset Button and verify all the employee listed
// 9 Click on PIM -> Add Employee Enter New User details and Save
// Employee Full Name - Jimmy Austin Smith
// EMployee ID :<Any number/keep default>

// 10 Click on the Employee list -> Type employee id -> click search -> Verify only one record appeared   



