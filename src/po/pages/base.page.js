const { domReady } = require('../../core/support/waits');

class BasePage {
  async open (path = '/') {
    if (path.startsWith('http')) {
      await browser.url(path);
    } else {
      const p = path.startsWith('/') ? path : `/${path}`;
      await browser.url(p);
    }
    await this.waitForDomReady();
  }

    async waitForDomReady (timeout = 10000) { 
      
    await domReady(timeout); //-->from core-support
  }

}
module.exports = BasePage;
