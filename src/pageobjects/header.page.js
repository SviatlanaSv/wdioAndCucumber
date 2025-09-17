// src/pageobjects/header.page.js
class HeaderPage {
  get languageBtn ()     { return $('[data-test="language-select"]'); }
  get activeLangText ()  { return $('#language, [data-test="language-select"]'); }
  langItem (code)        { return $(`[data-test="lang-${code.toLowerCase()}"]`); }

  async openLanguageMenu () {
    await this.languageBtn.waitForClickable({ timeout: 10000 });
    await this.languageBtn.click();
  }

  async switchTo (code) {
    await this.openLanguageMenu();
    const item = this.langItem(code);
    await item.waitForClickable({ timeout: 10000 });
    await item.click();
  }

  async getActiveButtonText () {
    try { return (await this.activeLangText.getText()).trim(); }
    catch { return ''; }
  }
}
module.exports = new HeaderPage();
