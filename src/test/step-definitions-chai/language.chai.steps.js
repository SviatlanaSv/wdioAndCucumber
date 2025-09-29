const { Given, When, Then } = require('@wdio/cucumber-framework');
const Header = require('../../po/components/header.page');
const Nav    = require('../../po/components/nav.page');
const BasePage = require('../../po/pages/base.page');
const basePage = new BasePage();

const TOKENS = {
  EN: ['Sort', 'Search', 'Filters', 'By category'],
  DE: ['Suche', 'Filter', 'Preis', 'Sortieren', 'Nach Kategorie'],
  ES: ['Buscar', 'Filtros', 'Precio', 'Ordenar', 'Por categoría'],
  FR: ['Rechercher', 'Filtres', 'Prix', 'Trier', 'Par catégorie'],
  NL: ['Zoeken', 'Filters', 'Prijs', 'Sorteren', 'Per categorie'],
  TR: ['Ara', 'Filtreler', 'Fiyat', 'Sırala', 'Kategoriye göre']
};

Given('multiple site languages are available', async () => {
  await browser.url('/');
  await browser.setWindowSize(1440, 900);
  await basePage.waitForDomReady();
  await Header.languageBtn.waitForExist({ timeout: 10000 });
});

Given('the user is viewing the site in a {string}', async (lang) => {
  const code = String(lang).toUpperCase();
  await Header.switchTo(code);
  (await Header.getActiveButtonText()).toUpperCase().should.include(code); // should
});

When('the user switches the site language to different {string}', async (lang) => {
  await Header.switchTo(String(lang).toUpperCase());
});

Then('website content appears in chosen {string}', async (lang) => {
  const code = String(lang).toUpperCase();
  await Nav.openHandTools();

  const variants = TOKENS[code] || [];
  const body = (await $('body').getText()).toLowerCase();
  const found = variants.some(v => body.includes(v.toLowerCase()));
  assert.isTrue(found, `Did not find tokens for ${code}`);        // assert

  expect((await Header.getActiveButtonText()).toUpperCase()).to.include(code); // expect
});

Then('the selected language persists when the user navigates to a product details page', async () => {
  const expected = (await Header.getActiveButtonText()).trim().toUpperCase();
  await Nav.openFirstProduct();
  const actual = (await Header.getActiveButtonText()).trim().toUpperCase();
  assert.strictEqual(actual, expected, 'Language changed after navigation'); // assert
});
