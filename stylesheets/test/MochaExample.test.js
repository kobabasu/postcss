var global = (function() { return this })();
if (!('chai' in global)) {
  var chai = require('../../postcss/vendor/chai/chai.js');
  var sinon = require('../../postcss/vendor/sinonjs/sinon.js');
  var assert = chai.assert;
};

describe('DOM:MochaExample', function() {

  it('結果が3となるか', function() {
    assert.equal(3, 3);
  });

});
