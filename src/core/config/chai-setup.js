// src/support/chai.setup.js
const chai = require('chai');

// globally accessible
global.assert = chai.assert;
global.expect = chai.expect;
chai.should(); 

module.exports = chai;





// //wdio has its own expect (@wdio/globals). differ.name to avoid confusion
// const { expect: chaiExpect, assert } = chai;

// module.exports = { chaiExpect, assert, chai };
