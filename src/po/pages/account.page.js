const BasePage = require('./base.page');

class AccountPage extends BasePage {
  get title()       { return $('[data-test="page-title"]'); }
  get profileLink() { return $('[data-test="nav-profile"]'); }

  async waitInAccount () {
    await browser.waitUntil(async () => {
      const url = await browser.getUrl();
      if (url.includes('/account') || url.includes('/my-account')) return true; 
      if (await this.title.isExisting())       return true; 
      if (await this.profileLink.isExisting()) return true;  
      return false;
    }, { timeout: 15000, timeoutMsg: 'Account area not visible' });
  }
}

module.exports = new AccountPage();




