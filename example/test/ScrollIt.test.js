var global = (function() { return this })();
if (!('chai' in global)) {
  var chai = require('chai');
  var assert = chai.assert;

  var module = require('../js/dom.js');
  var scrollit = new module.ScrollIt();
};

describe('my suite', function() {

  it('my test', function() {
    assert.equal(4, 4);
  });

});
