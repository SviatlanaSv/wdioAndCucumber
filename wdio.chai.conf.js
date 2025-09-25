// wdio.chai.conf.js
const base = require('./wdio.conf').config;

exports.config = {
  ...base,
 
  specs: base.specs,

  cucumberOpts: {
    ...base.cucumberOpts,
    require: [
      './src/support/chai-setup.js',
      './src/step-definitions-chai/**/*.js'
    ],
  },
};
