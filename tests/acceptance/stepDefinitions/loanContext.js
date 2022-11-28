
const {Given, When, Then} = require('@cucumber/cucumber')

const { expect } = require("@playwright/test")

const url = 'http://localhost:3000/loan-application/loanApp'

//User should be able to apply loan with valid inputs
Given('a user has navigated to the Loan page', async function () {
   await page.goto(url)

   const incomeInput = page.getByTestId("income-test");
   const loanAmountInput = page.getByTestId("loan-amount");
   const durationInput = page.getByTestId("duration-test");
   const purposeInput = page.getByTestId("purpose-test");

   expect(incomeInput).toBeVisible()
   expect(loanAmountInput).toBeVisible()
   expect(durationInput).toBeVisible()
   expect(purposeInput).toBeVisible()

})

When('the user provides valid values and clicks on apply',async function () {
   await page.getByTestId("income-test").fill("2000");
   await page.getByTestId("loan-amount").fill("5000");
   await page.getByTestId("duration-test").selectOption("10");
   await page.getByTestId("purpose-test").selectOption("Car Loan");
   const applyLoanInput = page.getByTestId("btn-loan");
   await applyLoanInput.click();
})

Then('error message {string} should be shown to user',async function (item) {
   expect(item).toBeVisible()
})



//  User should not be able to apply loan with invalid inputs
Given('a user has navigated to the Loan page but entered incorrect values', async function () {
   await page.goto(url)
   
})

When('the user provides invalid values and clicks on apply',async function () {

   const applyLoanInput = page.getByTestId("btn-loan");
   await applyLoanInput.click();
})

Then('message {string} {string} should be displayed on the Loan page',async function (item,item1) {
   expect(item).toBeVisible();
   expect(item1).toBeVisible()
})
