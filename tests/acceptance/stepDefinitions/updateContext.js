
const { Given, When, Then } = require('@cucumber/cucumber')

const { expect } = require("@playwright/test")

const url = 'http://localhost:3000/loan-application/update'


// User should not be able to update without Logging In
Given('a user has navigated to the update page', async function () {
   await page.goto(url)
})

When('the user provides invalid values and clicks on update without logging in', async function () {
   const update = page.getByTestId("update");
   await update.click();
})

Then('message {string} should be displayed on the update page', async function (item) {
   expect(item).toBeVisible()
})



//  User should not be able to update with invalid values
Given('a user on update page', async function () {
   await page.goto('http://localhost:3000/loan-application/register')

})

When('the user provides invalid  Account details and clicks on update after logging in', async function () {
   await page.getByTestId("first name").fill("AAAAAA");
   await page.getByTestId("last name").fill("kkkkk");
   await page.getByTestId("username-test").fill("users");
   await page.getByTestId("mobileno").fill("+912222222222");
   await page.getByTestId("reg-email").fill("gk@gmail.com");
   await page.getByTestId("reg-pwd").fill("Tej@123@");
   await page.getByTestId("reg-pwd2").fill("Tej@123@");
   await page.getByTestId("reg-pan").fill("AAAAA1111A");
   await page.getByTestId('country').selectOption('india')
   await page.getByTestId('state').selectOption('1')
   await page.getByTestId('city').selectOption("Bhimavaram")
   const registerButton = page.getByTestId("btn-register");
   await registerButton.click();
   await page.getByText("Login here").click();
   await page.getByTestId("email-input").fill("gk@gmail.com");
   await page.getByTestId("password-test").fill("Tej@123@");
   const LoginButton = page.getByTestId("btn");
   await LoginButton.click();
   const update = page.getByTestId("update");
   await update.click();
   await page.getByTestId("account-number").fill("11111111111");
   const updatedata = page.getByTestId("update");
   await updatedata.click();

})

Then('error message {string} should be displayed on the update page', async function (item) {
   expect(item).toBeVisible()
})
