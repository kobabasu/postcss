var global = (function() { return this })();
if (!('chai' in global)) {
  var chai = require('chai');
  var sinon = require('sinon');
  var assert = chai.assert;

  var module = require('../js/dom.js');
  var updateCopyright = new module.UpdateCopyright();
};

describe('DOM:UpdateCopyright', function() {

  it('正しく今年が表示されるか', function() {
    updateCopyright.change();
    var res = global.document.querySelector('.copyright span');
    var ans = new Date().getFullYear();
    assert.equal(res.innerHTML, ans);
  });

});
