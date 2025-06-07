const fs = require('fs');
const { test, expect } = require('@playwright/test');

// Reads the JSON file and saves it  
let objects = fs.readFileSync('./tests/TestData/OrangeHrm_Login_AllTestCase.json')
const users = JSON.parse(objects);

for (const record of users) {
test(`OrangeHRM Login Functionality: ${record.test_case}`, async ({ page }) => {
    //console.log(record.name, record.password, record.exp_result);
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByRole('textbox', { name: 'Username' }).click();
    await page.getByRole('textbox', { name: 'Username' }).fill(record.uname);
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill(record.password);
    await page.getByRole('button', { name: 'Login' }).click();

    if ('Dashboard' == record.exp_res) {

        await expect(page.getByRole('heading', { name: 'Dashboard' })).toHaveText(record.exp_res)
       

    } 
    else if ('Invalid credentials' == record.exp_res)
    {
      await expect(page.getByText('Invalid credentials')).toHaveText(record.exp_res)

    }
    else
    {
      await expect(page.getByText('Required')).toHaveText(record.exp_res)
    }


});

  }
