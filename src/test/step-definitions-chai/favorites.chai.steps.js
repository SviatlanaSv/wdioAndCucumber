const { Given, When, Then } = require("@wdio/cucumber-framework");
const { loginAsCustomer } = require("../../core/support/authSession");
const CatalogPage = require("../../po/pages/catalog.page");
const ProductPage = require("../../po/pages/product.page");
const FavoritesPage = require("../../po/pages/favorites.page");

Given("the user is signed in", async () => {
  await loginAsCustomer();
});

Given("the user's favorites list is empty", async () => {
  await FavoritesPage.clearAll();
});

Given("the user is browsing products in catalogue", async () => {
  await CatalogPage.open();
});

When("the user marks the product {string} as a favorite", async (name) => {
  await CatalogPage.open();
  await CatalogPage.searchByName(name);
  await CatalogPage.openProductByName(name);
  await ProductPage.addCurrentToFavorites();
});

When("the user opens the favorites page", async () => {
  await FavoritesPage.open();
});

Then("the favorites list includes {string}", async (name) => {
  await browser.waitUntil(
    async () => await FavoritesPage.hasProduct(name), {
    timeout: 12000, interval: 300, timeoutMsg: `Expected to see "${name}" in favorites`,
  });

  const hasItem = await FavoritesPage.hasProduct(name);
  assert.isTrue(hasItem, `Expected to see "${name}" in favorites`); // assert

  const cardsCount = (await FavoritesPage.favoriteCards).length;
  expect(cardsCount).to.be.greaterThan(0); // expect
});
