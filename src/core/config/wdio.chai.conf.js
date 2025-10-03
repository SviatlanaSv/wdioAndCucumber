const base = require('./wdio.conf').config;

exports.config = {
  ...base,
 
  specs: base.specs,

  cucumberOpts: {
    ...base.cucumberOpts,
    require: [
      './src/core/config/chai-setup.js',
      './src/test/step-definitions-chai/**/*.js'
    ],
  },
};
