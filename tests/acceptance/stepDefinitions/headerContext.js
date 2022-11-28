
const {Given, When, Then} = require('@cucumber/cucumber')

const { expect } = require("@playwright/test")

const url = 'http://localhost:3000/loan-application/loanApp'

//User clicking on update Link
Given('a user has navigated to the Header to naviagte to update component', async function () {
   await page.goto(url);
   const updatetext = page.getByTestId("update");
   expect(updatetext).toBeVisible();
})

When('the user clicks on update',async function () {
   const update = page.getByTestId("update");
   await update.click();
})

Then('user should be directed to update page',async function () {
   await expect(page).toHaveURL(/update/);
})



//  User clicking on loan Link
Given('a user has navigated to the Header to naviagte to loan component', async function () {
   await page.goto(url);
   const loantext = page.getByText("Apply Loan");
   expect(loantext).toBeVisible()
})

When('the user clicks on loan',async function () {
   const applyloan = page.getByText("Apply Loan");
   await applyloan.click();
})

Then('user should be directed to loan page',async function () {
   await expect(page).toHaveURL(/loanApp/);
})


//User clicking on loan details Link
Given('a user has navigated to the Header to naviagte to Loan details component', async function () {
   await page.goto(url);
   const loandetails = page.getByText("Loan Details");
   expect(loandetails).toBeVisible()
})

When('the user clicks on loan details',async function () {
   const loandetails = page.getByText("Loan Details");
   await loandetails.click();
})

Then('user should be directed to Loan details component',async function () {
   await expect(page).toHaveURL(/loandetails/);
})


//  User clicking on logout button
Given('a user has navigated to the Header to logout', async function () {
   await page.goto(url);
   const signOutButton = page.getByText("Sign out");
   expect(signOutButton).toBeVisible()
})

When('the user clicks on logout button',async function () {
   const signOutButton = page.getByText("Sign out");
   await signOutButton.click();
})

Then('user should be directed to login page',async function () {
   await expect(page).toHaveURL(/login/);
})

