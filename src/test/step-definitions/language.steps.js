// src/step-definitions/language.steps.js
const assert = require('assert');
const { Given, When, Then } = require('@wdio/cucumber-framework');
const Header   = require('../../po/components/header.page');
const Nav      = require('../../po/components/nav.page');
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

// --- Given ---
Given('multiple site languages are available', async () => {
  await browser.url('/');
  await browser.setWindowSize(1440, 900);
  await basePage.waitForDomReady();
  await Header.languageBtn.waitForExist({ timeout: 10000 });
});

// сразу переключаем на нужный язык (юзер не обязан уже быть на нём)
Given('the user is viewing the site in a {string}', async (lang) => {
  const code = String(lang).toUpperCase();
  await Header.switchTo(code);

  const activeButtonText = (await Header.getActiveButtonText()).toUpperCase();
  assert.ok(activeButtonText.includes(code), `Language button text "${activeButtonText}" doesn't include ${code}`);
});

// --- When ---
When('the user switches the site language to different {string}', async (lang) => {
  await Header.switchTo(String(lang).toUpperCase());
});


Then('website content appears in chosen {string}', async (lang) => {
  const code = String(lang).toUpperCase();

  await Nav.openHandTools();

  const variants = TOKENS[code] || [];
  await browser.waitUntil(async () => {
    const text = (await $('body').getText()).toLowerCase();
    return variants.some(v => text.includes(v.toLowerCase()));
  }, { timeout: 7000, interval: 150, timeoutMsg: `i18n markers for ${code} did not appear` });

  const bodyText = (await $('body').getText()).toLowerCase();
  const found = variants.some(v => bodyText.includes(v.toLowerCase()));
  assert.ok(found, `Did not find any of ${JSON.stringify(variants)} in page text for ${code}`);

  const activeButtonText = (await Header.getActiveButtonText()).toUpperCase();
  assert.ok(activeButtonText.includes(code), `Language button text "${activeButtonText}" doesn't include ${code}`);
});


Then('the selected language persists when the user navigates to a product details page', async () => {
  const expectedBtn = (await Header.getActiveButtonText()).trim().toUpperCase();

  await Nav.openFirstProduct();

  const actualBtn = (await Header.getActiveButtonText()).trim().toUpperCase();
  assert.strictEqual(actualBtn, expectedBtn, `Language changed after navigation: was "${expectedBtn}", now "${actualBtn}"`);
});
