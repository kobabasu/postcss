var global = (function() { return this })();
if (!('chai' in global)) {
  var chai = require('../../postcss/node_modules/chai/chai.js');
  var sinon = require('../../postcss/node_modules/sinon/sinon.js');
  var assert = chai.assert;
};

describe('DOM:MochaExample', function() {

  it('結果が3となるか', function() {
    assert.equal(3, 3);
  });

});
