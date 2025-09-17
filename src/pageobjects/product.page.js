const BasePage = require('./base.page');

class ProductPage extends BasePage {
  get name()            { return $('[data-test="product-name"]'); }      
  get addToFavorites()  { return $('[data-test="add-to-favorites"]'); }  
  get title () { return $('[data-test="product-name"]'); }
  get image () { return $('figure img.figure-img, .figure img.figure-img'); }
  get description () { return $('[data-test="product-description"]'); }
  get unitPrice () { return $('[data-test="unit-price"]'); }
  get offerPrice () { return $('[data-test="offer-price"]'); }  

  async addCurrentToFavorites() {
    const btn = await this.addToFavorites;
    await btn.waitForClickable({ timeout: 10000 });
    await btn.click();
    await browser.pause(300);
  }

    async waitOpened () {
    await this.title.waitForDisplayed({ timeout: 5000 });
  }

}

module.exports = new ProductPage();
