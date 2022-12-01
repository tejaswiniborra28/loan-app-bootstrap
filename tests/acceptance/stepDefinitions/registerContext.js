
const {Given, When, Then} = require('@cucumber/cucumber')

const { expect } = require("@playwright/test")

const url = 'http://localhost:3000/loan-application/register'

//  User should be registered successfully with valid inputs
Given('a user has navigated to the Register page', async function () {
   await page.goto(url);

   const firstNameInput = page.getByTestId("first name");
   const lastNameInput = page.getByTestId("last name");
   const userNameInput = page.getByTestId("username-test");
   const mobilenoInput = page.getByTestId("mobileno");
   const regEmailInput = page.getByTestId("reg-email");
   const regpwdInput = page.getByTestId("reg-pwd");
   const regpwdInput2 = page.getByTestId("reg-pwd2");
   const regpanInput = page.getByTestId("reg-pan");

   expect(firstNameInput).toBeVisible();
   expect(lastNameInput).toBeVisible()
   expect(userNameInput).toBeVisible()
   expect(mobilenoInput).toBeVisible()
   expect(regEmailInput).toBeVisible()
   expect(regpwdInput).toBeVisible()
   expect(regpwdInput2).toBeVisible()
   expect(regpanInput).toBeVisible()
})

When('the user provides valid details and clicks on register',async function () {
   await  page.getByTestId("first name").fill("AAAAAA");
   await page.getByTestId("last name").fill("kkkkk");
   await  page.getByTestId("username-test").fill("users");
   await page.getByTestId("mobileno").fill("+912222222222");
   await page.getByTestId("reg-email").fill("gk@gmail.com");
   await page.getByTestId("reg-pwd").fill("Tej@123@");
   await  page.getByTestId("reg-pwd2").fill("Tej@123@");
   await page.getByTestId("reg-pan").fill("AAAAA1111A");
   await page.getByTestId('country').selectOption('india')
   await page.getByTestId('state').selectOption('1')
   await page.getByTestId('city').selectOption("Bhimavaram")
   const registerButton = page.getByTestId("btn-register");
  
   await registerButton.click();
})

Then('message {string} should be displayed on the register page',async function (item) {
   expect(item).toBeVisible();
})


//   User should not be able to register with invalid inputs
Given('a user has navigated to the Registration page to register', async function () {
    await page.goto(url)
    const regpanInput = page.getByTestId("reg-pan");
    expect(regpanInput).toBeVisible()
 })
 
 When('the user provides invalid details and clicks on register',async function () {
    await page.getByTestId("reg-pan").fill("23vdg");
    await page.getByTestId("mobileno").fill("+9122222222");
    const registerButton = page.getByTestId("btn-register");
    await registerButton.click();
 })
 
 Then('error message {string} {string} should be displayed on the register page',async function (item,item1) {
    expect(item).toBeVisible();
    expect(item1).toBeVisible()
 })


// User clicking on login Link
Given('a user has navigated to the Register page to navigate to login page', async function () {
    await page.goto(url)
    const getRegister = page.getByText("Login here");
    expect(getRegister).toBeVisible()
 })
 
 When('the user clicks on Login link',async function () {
    await page.getByText("Login here").click();
 })
 
 Then('user should be directed to Login page',async function () {
    await expect(page).toHaveURL(/login/);
 })