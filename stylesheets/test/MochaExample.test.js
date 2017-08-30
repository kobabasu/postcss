var global = (function() { return this })();
if (!('chai' in global)) {
  var chai = require('chai');
  var sinon = require('sinon');
  var assert = chai.assert;
};

describe('DOM:MochaExample', function() {

  it('結果が3となるか', function() {
    assert.equal(3, 3);
  });

});
