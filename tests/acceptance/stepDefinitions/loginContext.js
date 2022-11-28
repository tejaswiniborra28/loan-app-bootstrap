
const {Given, When, Then} = require('@cucumber/cucumber')

const { expect } = require("@playwright/test")

const url = 'http://localhost:3000/loan-application'

//User should not be able to login without registering
Given('a user has navigated to the Login page without registering', async function () {
   await page.goto(url)
   const emailInput = page.getByTestId("email-input");
   expect(emailInput).toBeVisible()
})

When('the user provides valid email and clicks on login without registering',async function () {
   await page.getByTestId("email-input").fill("gk@gmail.com");
   const LoginButton = page.getByTestId("btn");
   await LoginButton.click();
})

Then('message {string} should be displayed on the webUI',async function (item) {
   expect(item).toBeVisible()
})


//   User should not be able to login when provides invalid inputs
Given('a user has navigated to the Login page', async function () {
    await page.goto(url)
    const passwordInput = page.getByTestId("password-test");
    expect(passwordInput).toBeVisible()
 })
 
 When('the user provides invalid password and clicks on login',async function () {
    await page.getByTestId("password-test").fill("234vdg");
    const LoginButton = page.getByTestId("btn");
    await LoginButton.click();
 })
 
 Then('message {string} should be displayed on the Login page',async function (item) {
    expect(item).toBeVisible()
 })


//User clicking on Register Link
Given('a user has navigated to the Login page to navigate to register page', async function () {
    await page.goto(url)
    const getRegister = page.getByText("Register here");
    expect(getRegister).toBeVisible()
 })
 
 When('the user clicks on Register link',async function () {
    await page.getByText("Register here").click();
 })
 
 Then('user should be directed to register page',async function () {
    await expect(page).toHaveURL(/register/);
 })