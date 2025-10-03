require('dotenv').config();
const { Given, When, Then } = require('@wdio/cucumber-framework');
const Login    = require('../pageobjects/login.page');
const Register = require('../pageobjects/register.page');
const Account  = require('../pageobjects/account.page');
const BasePage = require('../pageobjects/base.page');
const basePage = new BasePage();

// main context 
const ctx = {};

Given('the application is available', async () => {
  await browser.url('/');
  await basePage.waitForDomReady();
});
Given('the customer is not signed in', async () => {
  await Login.open(); 
});

// ---------- Registration ----------
When('the customer opens the Login page', async () => {
  await Login.open();
});

When('chooses to register a new account', async () => {
  await Login.goToRegister();
});

When('the registration form is displayed', async () => {
  await Register.waitOpened();
});

When('the customer completes registration with valid information', async () => {
  const data = await Register.fillDefaultValidData(); 
  if (data && data.creds) ctx.creds = data.creds;
});

When('the customer submits the registration form', async () => {
  await Register.submitForm();
});

Then('the customer is created', async () => {
  await Register.waitRegistrationFinished();
});


// ---------- Sign-in ----------
Given('a customer account exists using the email and password created during registration', async () => {
  if (!ctx.creds) throw new Error('No user in context — registration did not run');
});

Given('the customer is on the Login page', async () => {
  await Login.open();
});

When('the customer signs in with the registered credentials', async () => {
  if (!ctx.creds) throw new Error('No user in context — registration did not run');
  await Login.signIn(ctx.creds.email, ctx.creds.password);
});

Then('the customer is returned to the application as an authenticated user', async () => {
  await browser.waitUntil(async () => {
    if (await Login.error.isExisting()) throw new Error('Login error is shown on the page');
    const url = await browser.getUrl();
    const inAccount = url.includes('/my-account') || await Account.title.isExisting();
    return inAccount;
  }, { timeout: 15000, timeoutMsg: 'Did not land on My Account after login' });
});

Then('the application shows the customer account area', async () => {
  await Account.waitInAccount();
});

Then('the header displays the signed-in customer', async () => {
  await Account.title.waitForExist({ timeout: 10000 });
});

Then('no authentication error is shown', async () => {
  await expect(Login.error).not.toBeExisting();
});
