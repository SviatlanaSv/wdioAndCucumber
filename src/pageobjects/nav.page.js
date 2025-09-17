
class NavPage {
  
  async openHandTools () {
    await browser.url('/category/hand-tools');
    await browser.waitUntil(
      async () => (await $$('[data-test="product-card"], [data-test="product-link"], a[href*="/product/"]')).length > 0,
      { timeout: 10000, timeoutMsg: 'Category page did not load' }
    );
  }

  get firstProductLink () { return $('[data-test="product-link"], a[href*="/product/"]'); }

  async openFirstProduct () {
    const link = await this.firstProductLink;
    await link.waitForClickable({ timeout: 10000 });
    await link.click();
    await browser.waitUntil(
      async () => (await browser.getUrl()).includes('/product/'),
      { timeout: 10000, timeoutMsg: 'Product page did not open' }
    );
  }
}
module.exports = new NavPage();
