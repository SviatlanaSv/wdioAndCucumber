const BasePage = require('./base.page');

class RegisterPage extends BasePage {
  get form()       { return $('[data-test="register-form"]'); }
  get firstName()  { return $('[data-test="first-name"]'); }
  get lastName()   { return $('[data-test="last-name"]'); }
  get dob()        { return $('[data-test="dob"]'); }
  get street()     { return $('[data-test="street"]'); }
  get postalCode() { return $('[data-test="postal_code"]'); }
  get city()       { return $('[data-test="city"]'); }
  get state()      { return $('[data-test="state"]'); }
  get country()    { return $('[data-test="country"]'); }
  get phone()      { return $('[data-test="phone"]'); }
  get email()      { return $('[data-test="email"]'); }
  // does not recognize by data-test  → input inside component
  get password()   { return $('app-password-input[formcontrolname="password"] input, app-password-input#password input, input[type="password"]'); }
  get submit()     { return $('[data-test="register-submit"]'); }
  get error()      { return $('[data-test="register-error"]'); }

  async waitOpened () {
    await this.waitForDomReady();
    await this.form.waitForExist({ timeout: 10000 });
  }
  async fillSimpleValidData ({ first, last, birth, addr, contact, creds }) {
    await this.firstName.setValue(first);
    await this.lastName.setValue(last);
    await this.dob.setValue(birth);
    await this.street.setValue(addr.street);
    await this.postalCode.setValue(addr.postal);
    await this.city.setValue(addr.city);
    await this.state.setValue(addr.state);
    await this.country.selectByIndex(1); 
    await this.phone.setValue(contact.phone);
    await this.email.setValue(creds.email);
    await this.password.setValue(creds.password);
  }
  async submitForm () {
    await this.submit.click();
  }

  // сгенерировать уникальные учётные данные
generateCredentials() {
  const stamp = Date.now();
  return {
    email: `qa_${stamp}@mailinator.com`,
    password: `Pa$$w0rd${stamp.toString().slice(-3)}`
  };
}

// выполнить регистрацию валидного пользователя (данные можно переопределить через аргументы)
async registerValidUser({
  first = 'Anna',
  last  = 'Test',
  birth = '1994-05-17',
  addr  = { street: '123 Test St', postal: '12345', city: 'Berlin', state: 'BE' },
  contact = { phone: '1234567890' },
  creds = this.generateCredentials()
} = {}) {
  await this.fillSimpleValidData({ first, last, birth, addr, contact, creds });
  await this.submitForm();
  return { creds, profile: { first, last, birth, addr, contact } };
}

// дождаться завершения процесса регистрации (редирект / страница аккаунта / допустимая ошибка)
async waitRegistrationFinished(timeout = 15000) {
  await browser.waitUntil(async () => {
    const url = await browser.getUrl();
    if (url.includes('/auth/login') || url.includes('/my-account')) return true;
    try {
      if (this.error && await this.error.isExisting()) return true;
    } catch (_) {}
    return false;
  }, { timeout, timeoutMsg: 'Registration flow did not finish' });
}

// вернуть набор дефолтных валидных данных регистрации
getDefaultRegistrationData() {
  return {
    first:  'Anna',
    last:   'Test',
    birth:  '1994-05-17',
    addr:   { street: '123 Test St', postal: '12345', city: 'Berlin', state: 'BE' },
    contact:{ phone: '1234567890' },
    creds:  this.generateCredentials(),
  };
}

// заполнить форму дефолтными валидными данными (без сабмита)
async fillDefaultValidData() {
  const data = this.getDefaultRegistrationData();
  await this.fillSimpleValidData(data);
  return data; // вернём, чтобы шаг мог сохранить creds в ctx
}


}
module.exports = new RegisterPage();
