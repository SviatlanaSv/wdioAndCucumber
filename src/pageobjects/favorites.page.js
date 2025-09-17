
class FavoritesPage {
  get pageTitle()     { return $('[data-test="page-title"]'); }
  get favoriteCards() { return $$('div[data-test^="favorite-"], a[data-test^="favorite-"]'); }

  cardTitle(el)  { return el.$('[data-test="product-name"]'); }
  cardDelete(el) { return el.$('[data-test="delete"]'); }

  async open() {
    await browser.url('/account/favorites');
    await this.pageTitle.waitForDisplayed({ timeout: 10000 });
  }

  // ---are we already on favorites page?
  async isOpen() {
    const url = await browser.getUrl().catch(() => '');
    const titleOk = await this.pageTitle.isDisplayed().catch(() => false);
    return url.includes('/account/favorites') && titleOk;
  }

  // check if product is present (does NOT navigate if page is already open)
  async hasProduct(name) {
    if (!(await this.isOpen())) {
      await this.open();
    }
    await browser.pause(200); 
    const cards = await this.favoriteCards;

    for (const card of cards) {
      const t = await this.cardTitle(card);
      let txt = '';
      if (await t.isExisting()) {
        txt = (await t.getText()).trim();
      } else {
        // fallback: whole card text
        txt = (await card.getText()).trim();
      }
      if (txt.toLowerCase().includes(String(name).toLowerCase())) {
        return true;
      }
    }
    return false;
  }

  async clearAll() {
    if (!(await this.isOpen())) {
      await this.open();
    }

    while (true) {
      const cards = await this.favoriteCards;
      if (!cards.length) break;
      const del = await this.cardDelete(cards[0]);
      if (!(await del.isExisting())) break;
      await del.click();
      await browser.pause(250);
    }
  }
}

module.exports = new FavoritesPage();
