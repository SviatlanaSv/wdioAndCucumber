const BasePage = require('./base.page');
class LoginPage extends BasePage {
  get form()      { return $('[data-test="login-form"]'); }
  get email()     { return $('[data-test="email"]'); }
  get password()  { return $('app-password-input#password input, app-password-input[formcontrolname="password"] input, input[type="password"]'); }
  get submit()    { return $('[data-test="login-submit"]'); }
  get register()  { return $('[data-test="register-link"]'); }
  get error()     { return $('[data-test="login-error"]'); }

  async open () {
    await super.open('/auth/login');
    await this.form.waitForExist({ timeout: 10000 });
  }
  async goToRegister () {
    await this.register.waitForClickable({ timeout: 10000 });
    await this.register.click();
  }
}

module.exports = new LoginPage();
