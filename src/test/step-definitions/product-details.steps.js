const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect } = require('@wdio/globals');

const OverviewPage = require('../../po/pages/overview.page');
const ProductPage  = require('../../po/pages/product.page');

Given('the user is browsing products', async () => {
  await OverviewPage.open();
  await (await OverviewPage.productCards[0]).waitForExist({ timeout: 5000 });
});

When('the user opens the details for the product {string}', async (title) => {
  await OverviewPage.openDetailsByName(title);
  await ProductPage.waitOpened();
});

Then('the product details view is displayed', async () => {
  await expect(ProductPage.title).toBeDisplayed();
});

Then('the product shows an image', async () => {
  await expect(ProductPage.image).toBeDisplayed();
});

Then('the product shows a description', async () => {
  await expect(ProductPage.description).toBeDisplayed();
  await expect(ProductPage.description).not.toHaveText('');
});

Then('the product shows a price', async () => {
  await expect(ProductPage.unitPrice).toBeDisplayed();
  const priceText = await ProductPage.unitPrice.getText();
  // there are digits
  expect(priceText).toMatch(/\d/);
});
