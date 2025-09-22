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
    await this.waitForDomReady();
    await this.form.waitForExist({ timeout: 10000 });
  }
  async goToRegister () {
    await this.register.waitForClickable({ timeout: 10000 });
    await this.register.click();
  }

  // открыть форму регистрации с логина (одним вызовом)
async openRegister() {
  await this.open();
  await this.goToRegister();
}

// единое действие "ввести и войти"
async signIn(email, password) {
  await this.email.waitForDisplayed({ timeout: 10000 });
  await this.email.setValue(email);
  await this.password.setValue(password);
  await this.submit.waitForClickable({ timeout: 10000 });
  await this.submit.click();
}

}

module.exports = new LoginPage();
