const { Given, When, Then } = require('@cucumber/cucumber')

const { expect } = require("@playwright/test")

const url = 'http://localhost:3000/loan-application/register'

//  User should be able to apply for loan
Given('a user on Registration page', async function () {
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

When('the user registers with valid details and clicks on login link', async function () {
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
})

Then('user provides valid credentials and clicks on login', async function () {
    await page.getByTestId("email-input").fill("gk@gmail.com");
    await page.getByTestId("password-test").fill("Tej@123@");
    const LoginButton = page.getByTestId("btn");
    await LoginButton.click();
})

Then('user updates account details', async function () {
    const update = page.getByTestId("update");
    await update.click();

    await page.getByTestId("account-number").fill("1111-1111-1111");
    await page.getByTestId("cardType").selectOption("icici");
    await page.getByTestId("Acctype").check();
    await page.getByTestId("btn-update").click();
    await page.getByTestId("apply-loan").click();

})

Then('user provides loan details and clicks on apply', async function () {

    await page.getByTestId("income-test").fill("2000");
    await page.getByTestId("loan-amount").fill("5000");
    await page.getByTestId("duration-test").selectOption("10");
    await page.getByTestId("purpose-test").selectOption("Car Loan");
    const applyLoanInput = page.getByTestId("btn-loan");
    await applyLoanInput.click();
})

Then('should be able to see loandetails page with all provided details', async function () {
    await expect(page).toHaveURL(/loandetails/);
})
