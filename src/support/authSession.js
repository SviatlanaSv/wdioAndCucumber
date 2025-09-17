const DEFAULT_EMAIL = process.env.CUSTOMER_EMAIL || 'customer@practicesoftwaretesting.com';
const DEFAULT_PASSWORD = process.env.CUSTOMER_PASSWORD || 'welcome01';

async function loginAsCustomer(email = DEFAULT_EMAIL, password = DEFAULT_PASSWORD) {
  await browser.url('/auth/login');

  const emailInput = await $('[data-test="email"], input[type="email"]');
  await emailInput.waitForDisplayed({ timeout: 15000 });

  const passwordInput = await $('[data-test="password"] input, [data-test="password"], input[type="password"]');
  await passwordInput.waitForDisplayed({ timeout: 15000 });

  await emailInput.setValue(email);
  await passwordInput.setValue(password);

  await $('[data-test="login-submit"]').click();

  await browser.waitUntil(
    async () => {
      const url = await browser.getUrl();
      const titleVisible = await $('[data-test="page-title"]').isDisplayed().catch(() => false);
      return url.includes('/account') || titleVisible;
    },
    { timeout: 15000, timeoutMsg: 'Login confirmation was not visible in time' }
  );
}

module.exports = { loginAsCustomer };
