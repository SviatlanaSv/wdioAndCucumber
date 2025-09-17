const { Given, When, Then } = require('@wdio/cucumber-framework');
const assert = require('assert');

const { loginAsCustomer } = require('../support/authSession');

const CatalogPage   = require('../pageobjects/catalog.page');
const ProductPage   = require('../pageobjects/product.page');
const FavoritesPage = require('../pageobjects/favorites.page');

Given('the user is signed in', async () => {
  await loginAsCustomer();
});

Given("the user's favorites list is empty", async () => {
  await FavoritesPage.clearAll();
});

Given('the user is browsing products in catalogue', async () => {
  await CatalogPage.open();
});

When('the user marks the product {string} as a favorite', async (name) => {
  await CatalogPage.open();
  await CatalogPage.searchByName(name);
  await CatalogPage.openProductByName(name);
  await ProductPage.addCurrentToFavorites();
});

When('the user opens the favorites page', async () => {
  await FavoritesPage.open();
});

Then('the favorites list includes {string}', async (name) => {
  await browser.waitUntil(
    async () => await FavoritesPage.hasProduct(name),
    { timeout: 12000, interval: 300, timeoutMsg: `Expected to see "${name}" in favorites` }
  );
  const has = await FavoritesPage.hasProduct(name);
  assert.strictEqual(has, true, `Expected to see "${name}" in favorites`);
});


