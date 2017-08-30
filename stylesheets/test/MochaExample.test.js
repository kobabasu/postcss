var global = (function() { return this })();
if (!('chai' in global)) {
  var chai = require('../../postcss/vendor/chai');
  var sinon = require('../../postcss/vendor/sinon');
  var assert = chai.assert;
};

describe('DOM:MochaExample', function() {

  it('結果が3となるか', function() {
    assert.equal(3, 3);
  });

});
