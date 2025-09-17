// require('dotenv').config();
const { Given, When, Then } = require('@wdio/cucumber-framework');
const Login    = require('../pageobjects/login.page');
const Register = require('../pageobjects/register.page');
const Account  = require('../pageobjects/account.page');

// maon context 
const ctx = {};

function makeUser() {
  const stamp = Date.now();
  return {
    email: `qa_${stamp}@mailinator.com`,
    password: `Pa$$w0rd${stamp.toString().slice(-3)}` // 8+, mixed register, number, symbol
  };
}


Given('the application is available', async () => {
  await browser.url('/');
  await browser.pause(300); 
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

When('the customer enters a first name and last name', async () => {
  if (!ctx.creds) ctx.creds = makeUser();
  ctx.first = 'Anna';
  ctx.last  = 'Test';
});

When('the customer enters a date of birth in "YYYY-MM-DD" format', async () => {
  ctx.birth = '1994-05-17';
});

When('the customer enters a street, postal code, city and state', async () => {
  ctx.addr = { street: '123 Test St', postal: '12345', city: 'Berlin', state: 'BE' };
});

When('the customer selects a country', async () => {
  
});
When('the customer enters a phone number', async () => {
  ctx.contact = { phone: '1234567890' };
});

When('the customer enters a unique email address', async () => {
  if (!ctx.creds) ctx.creds = makeUser();
});

When('the customer sets a valid password that meets the rules', async () => {
  if (!ctx.creds) ctx.creds = makeUser();
});

When('the customer submits the registration form', async () => {
  await Register.fillSimpleValidData({
    first:  ctx.first,
    last:   ctx.last,
    birth:  ctx.birth,
    addr:   ctx.addr,
    contact: ctx.contact,
    creds:  ctx.creds,
  });
  await Register.submitForm();
});

Then('the customer is created', async () => {
  await browser.waitUntil(async () => {
    const url = await browser.getUrl();
    if (url.includes('/auth/login') || url.includes('/my-account')) return true;

    if (Register.errorBox && await Register.errorBox.isExisting()) return true;
    if (await $('[data-test="register-error"]').isExisting()) return true;

    return false;
  }, { timeout: 15000, timeoutMsg: 'Registration did not finish' });
});


// ---------- Sign-in ----------
Given('a customer account exists using the email and password created during registration', async () => {
  if (!ctx.creds) throw new Error('No user in context — registration did not run');
});

Given('the customer is on the Login page', async () => {
  await Login.open();
});

When('the customer enters the registered email and password', async () => {
  await Login.email.setValue(ctx.creds.email);
  await Login.password.setValue(ctx.creds.password);
});

When('the customer chooses to sign in', async () => {
  await Login.submit.click();
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
