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
}
module.exports = new RegisterPage();
