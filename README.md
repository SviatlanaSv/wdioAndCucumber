# WDIO + Cucumber (E2E)

End-to-end tests for `https://practicesoftwaretesting.com` using **WebdriverIO v9 + Cucumber** (Chrome, Edge, Firefox; headless by default).

## Requirements

* Node.js (LTS recommended)
* Chrome / Edge / Firefox installed

## Install

```bash
npm i
```

## Run

```bash
# All (Chrome + Edge + Firefox, headless)
npm run test:all

# Single browsers
npm run test:chrome
npm run test:edge
npm run test:firefox   # starts geckodriver on 127.0.0.1:4444
```

> Firefox runs via a standalone **geckodriver**. The scripts start it and wait for the port before WDIO connects.

### Non-headless (example)

```bash
npx cross-env HEADLESS=false wdio run ./wdio.conf.js -- chrome
```

## Project layout (short)

```
src/
  features/                # .feature files (customer-auth, favorites, language-change, product-details)
  pageobjects/             # Page Object Model
  step-definitions/        # Cucumber steps
  support/                 # helpers, hooks
wdio.conf.js               # WDIO + Cucumber config
```

