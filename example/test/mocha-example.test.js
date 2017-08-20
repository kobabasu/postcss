var global = (function() { return this })();
if (!('chai' in global)) {
  var chai = require('chai');
  var assert = chai.assert;

  var module = require('../js/mocha-example.js');
  var mochaExample = new module.MochaExampleTwo();
};

describe('my suite', function() {

  it('my test', function() {
    assert.equal(mochaExample.change(), 4);
  });

});
