require('dotenv').config();
const { Given, When, Then } = require('@wdio/cucumber-framework');
const Login    = require('../../po/pages/login.page');
const Register = require('../../po/pages/register.page');
const Account  = require('../../po/pages/account.page');
const BasePage = require('../../po/pages/base.page');
const basePage = new BasePage();
const ctx = {};

Given('the application is available', async () => {
  await browser.url('/');
  await basePage.waitForDomReady();
});

Given('the customer is not signed in', async () => {
  await Login.open();
});

// -- Registration --
When('the customer opens the Login page', async () => { await Login.open(); });
When('chooses to register a new account', async () => { await Login.goToRegister(); });
When('the registration form is displayed', async () => { await Register.waitOpened(); });

When('the customer completes registration with valid information', async () => {
  const data = await Register.fillDefaultValidData();
  if (data?.creds) ctx.creds = data.creds;
  expect(ctx.creds).to.have.keys(['email','password']);    // expect
});

When('the customer submits the registration form', async () => {
  await Register.submitForm();
});

Then('the customer is created', async () => {
  await Register.waitRegistrationFinished();
});

// -- Sign in --
Given('a customer account exists using the email and password created during registration', async () => {
  assert.exists(ctx.creds, 'No creds in context');       // assert
});

Given('the customer is on the Login page', async () => { await Login.open(); });

When('the customer signs in with the registered credentials', async () => {
  await Login.signIn(ctx.creds.email, ctx.creds.password);
});

Then('the customer is returned to the application as an authenticated user', async () => {
  await browser.waitUntil(async () => {
    if (await Login.error.isExisting()) return false;
    const url = await browser.getUrl();
    return url.includes('/my-account') || await Account.title.isExisting();
  }, { timeout: 15000 });
  (await Account.title.isExisting()).should.equal(true);       // should
});

Then('the application shows the customer account area', async () => {
  await Account.waitInAccount();
});

Then('no authentication error is shown', async () => {
  expect(await Login.error.isExisting()).to.be.false;     // expect
});
