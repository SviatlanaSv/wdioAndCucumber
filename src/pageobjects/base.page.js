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
    await browser.waitUntil(
      async () => (await browser.execute(() => document.readyState)) === 'complete',
      { timeout, timeoutMsg: 'Page did not reach readyState=complete' }
    );
  }
}
module.exports = BasePage;
