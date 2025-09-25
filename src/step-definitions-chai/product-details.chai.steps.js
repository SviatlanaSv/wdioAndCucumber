const { Given, When, Then } = require('@wdio/cucumber-framework');
const OverviewPage = require('../pageobjects/overview.page');
const ProductPage  = require('../pageobjects/product.page');

Given('the user is browsing products', async () => {
  await OverviewPage.open();
  await (await OverviewPage.productCards[0]).waitForExist({ timeout: 5000 });
});

When('the user opens the details for the product {string}', async (name) => {
  await OverviewPage.openDetailsByName(name);
  await ProductPage.waitOpened();
});

Then('the product details view is displayed', async () => {
  expect(await ProductPage.title.isDisplayed()).to.be.true;    // expect
});

Then('the product shows an image', async () => {
  (await ProductPage.image.isDisplayed()).should.equal(true); // should
});

Then('the product shows a description', async () => {
  const text = await ProductPage.description.getText();
  text.should.be.a('string').and.not.be.empty;       // should
});

Then('the product shows a price', async () => {
  const priceText = await ProductPage.unitPrice.getText();
  assert.match(priceText, /\d/, 'Price should contain a digit'); // assert
});
