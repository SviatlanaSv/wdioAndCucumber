const BasePage = require('./base.page');

class ProductPage extends BasePage {
     
  get title () { return $('[data-test="product-name"]'); }
  get addToFavorites()  { return $('[data-test="add-to-favorites"]'); }  
  get image () { return $('figure img.figure-img, .figure img.figure-img'); }
  get description () { return $('[data-test="product-description"]'); }
  get unitPrice () { return $('[data-test="unit-price"]'); }
  get offerPrice () { return $('[data-test="offer-price"]'); }  

  async addCurrentToFavorites() {
    const favoriteButton = await this.addToFavorites;
    await this.waitForDomReady();
    await favoriteButton.waitForClickable({ timeout: 10000 });
    await favoriteButton.click();
  }

    async waitOpened () {
    await this.title.waitForDisplayed({ timeout: 5000 });
  }

}

module.exports = new ProductPage();
