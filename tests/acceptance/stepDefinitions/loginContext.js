
const { Given, When, Then } = require('@cucumber/cucumber')

const { expect } = require("@playwright/test")

const url = 'http://localhost:3000/loan-application'
const registerUrl = 'http://localhost:3000/loan-application/register'

//User should not be able to login without registering
Given('a user has navigated to the Login page without registering', async function () {
   await page.goto(url)
   const emailInput = page.getByTestId("email-input");
   expect(emailInput).toBeVisible()
})

When('the user provides valid email and clicks on login without registering', async function () {
   await page.getByTestId("email-input").fill("gk@gmail.com");
   const LoginButton = page.getByTestId("btn");
   await LoginButton.click();
})

Then('message {string} should be displayed on the webUI', async function (item) {
   expect(item).toBeVisible()
})


//   User should not be able to login when provides invalid inputs
Given('a user has navigated to the Login page', async function () {
   await page.goto(registerUrl);
})

When('the user provides invalid password and clicks on login', async function () {
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
   await page.getByTestId("password-test").fill("234vdg");
   const LoginButton = page.getByTestId("btn");
   await LoginButton.click();
})

Then('message {string} should be displayed on the Login page', async function (item) {
   expect(item).toBeVisible()
})


//User clicking on Register Link
Given('a user has navigated to the Login page to navigate to register page', async function () {
   await page.goto('http://localhost:3000/loan-application')
   const getRegister = page.getByText("Register here");
   expect(getRegister).toBeVisible()
})

When('the user clicks on Register link', async function () {
   await page.getByText("Register here").click();
})

Then('user should be directed to register page', async function () {
   await expect(page).toHaveURL(/register/);
})