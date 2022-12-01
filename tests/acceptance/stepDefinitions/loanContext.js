
const { Given, When, Then } = require('@cucumber/cucumber')

const { expect } = require("@playwright/test")

const url = 'http://localhost:3000/loan-application/loanApp'


//User should not be access loan form without logging in
Given('a user has navigated to the Loan page without logging In', async function () {
   await page.goto(url)
})

When('user tries to access header', async function () {
   const applyloan = page.getByText("Apply Loan");
   await applyloan.click();
})

Then('error {string} should be shown to the user instead of loan form', async function (item) {
   expect(item).toBeVisible()
})


//User should be able to apply loan with valid inputs
Given('a user has navigated to the Loan page', async function () {
   await page.goto("http://localhost:3000/loan-application/register")

})

When('the user provides valid values to register , login and access loan form', async function () {
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
})

Then('error message {string} should be shown to user', async function (item) {
   expect(item).toBeVisible()
})
