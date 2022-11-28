
const {Given, When, Then} = require('@cucumber/cucumber')

const { expect } = require("@playwright/test")

const url = 'http://localhost:3000/loan-application/update'


// User should not be able to update without Logging In
Given('a user has navigated to the update page', async function () {
   await page.goto(url)
   const update = page.getByTestId("btn-update");
   expect(update).toBeVisible()
})

When('the user provides invalid values and clicks on update without logging in',async function () {
   const update = page.getByTestId("btn-update");
   await update.click();
})

Then('message {string} should be displayed on the update page',async function (item) {
   expect(item).toBeVisible()
})



//  User should not be able to update with invalid values
Given('a user on update page', async function () {
   await page.goto(url)
   const accountnumber=page.getByTestId("account-number")
   const update = page.getByTestId("btn-update");
   expect(update).toBeVisible();
   expect(accountnumber).toBeVisible();
})

When('the user provides invalid  Account details and clicks on update without logging in',async function () {
   await  page.getByTestId("account-number").fill("11111111111");
   const update = page.getByTestId("btn-update");
   await update.click();
})

Then('error message {string} should be displayed on the update page',async function (item) {
   expect(item).toBeVisible()
})
