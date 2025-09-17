const BasePage = require('./base.page');

class CatalogPage extends BasePage {
  get filtersPanel() { return $('div[data-test="filters"]'); }       
  get filtersToggle() { return $('a[data-test="filters"]'); }        
  get searchInput()  { return $('[data-test="search-query"]'); }     
  get searchSubmit() { return $('[data-test="search-submit"]'); }    
  get productCards() { return $$('a[data-test^="product-"]'); }      

  async open() {
    await super.open('/');
    await this.ensureFiltersVisible();
  }

  async ensureFiltersVisible() {
    const panel = await this.filtersPanel;
    if (!(await panel.isDisplayed().catch(() => false))) {
      const toggle = await this.filtersToggle;
      if (await toggle.isExisting()) {
        await toggle.click();
        await panel.waitForDisplayed({ timeout: 10000 });
      }
    }
  }

async searchByName(name) {
  const q = await $('[data-test="search-query"]');
  await q.waitForDisplayed({ timeout: 10000 });
  await q.clearValue();
  await q.setValue(name);
  await $('[data-test="search-submit"]').click();

  // waiting for at least one card to appear
  await browser.waitUntil(
    async () => (await $$('a[data-test^="product-"], div[data-test^="product-"]')).length > 0,
    { timeout: 10000, timeoutMsg: 'No products appeared after search' }
  );
}

async openProductByName(name) {
  // waiting for downloading
  await browser.pause(200);

  const cards = await $$('a[data-test^="product-"], div[data-test^="product-"]');

  if (cards.length === 0) {
    throw new Error('No product cards found after search');
  }

  // trying to find an exact match by name
  for (const card of cards) {
    const titleEl = await card.$('[data-test="product-name"]');
    if (await titleEl.isExisting()) {
      const txt = (await titleEl.getText()).trim();
      if (txt.toLowerCase() === name.toLowerCase()) {
        await card.click();
        await $('[data-test="product-name"]').waitForDisplayed({ timeout: 10000 });
        return;
      }
    }
  }

  await cards[0].click();
  await $('[data-test="product-name"]').waitForDisplayed({ timeout: 10000 });
}

}

module.exports = new CatalogPage();
