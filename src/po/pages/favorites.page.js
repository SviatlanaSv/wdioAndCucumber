const { domReady } = require('../../core/support/waits');

class FavoritesPage {
  get pageTitle()     { return $('[data-test="page-title"]'); }
  get favoriteCards() { return $$('div[data-test^="favorite-"], a[data-test^="favorite-"]'); }

  cardTitle(cardElement)  { return cardElement.$('[data-test="product-name"]'); }
  cardDelete(cardElement) { return cardElement.$('[data-test="delete"]'); }

  async open() {
    await browser.url('/account/favorites');
    await this.pageTitle.waitForDisplayed({ timeout: 10000 });
  }

  // ---are we already on favorites page?
  async isOpen() {
    const url = await browser.getUrl().catch(() => '');
    const titleVisible = await this.pageTitle.isDisplayed().catch(() => false);
    return url.includes('/account/favorites') && titleVisible;
  }

  // check if product is present (does NOT navigate if page is already open)
  async hasProduct(name) {
    if (!(await this.isOpen())) {
      await this.open();
    }

    await domReady(5000);

    const cards = await this.favoriteCards;

    for (const card of cards) {
      const titleElement = await this.cardTitle(card);
      let titleText = '';
      if (await titleElement.isExisting()) {
        titleText = (await titleElement.getText()).trim();
      } else {
        // fallback: whole card text
        titleText = (await card.getText()).trim();
      }
      if (titleText.toLowerCase().includes(String(name).toLowerCase())) {
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

      let deleteButton = await this.cardDelete(cards[0]);
      if (!(await deleteButton.isExisting())) break;

      const beforeCount = (await this.favoriteCards).length;

      await deleteButton.waitForClickable({ timeout: 10000 });
      await deleteButton.click();

      await browser.waitUntil(
        async () => (await this.favoriteCards).length < beforeCount,
        { timeout: 5000, interval: 100, timeoutMsg: 'Favorite item was not removed in time' }
      );
    }
  }
}

module.exports = new FavoritesPage();


