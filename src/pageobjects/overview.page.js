class OverviewPage {
  async open () {
    await browser.url('/'); 
  }

  get productCards () {
    return $$('a.card');
  }

  productCardByName (name) {
    return $(`//h5[@data-test="product-name" and normalize-space()="${name}"]/ancestor::a[contains(@class,"card")]`);
  }

  async openDetailsByName (name) {
    const card = await this.productCardByName(name);
    await card.waitForExist({ timeout: 5000 });
    await card.scrollIntoView();
    await card.click();
  }
}

module.exports = new OverviewPage();
