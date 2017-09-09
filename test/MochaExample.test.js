var assert = require('chai').assert;
var phantom = require('phantom');
var url = './MochaExample.test.html';
var _ph, _page;

describe('MochaExample', function() {

  it('結果が3となるか', function() {
    var promise = phantom.create().then(function(ph) {
      _ph = ph;
      return ph.createPage();
    }).then(function(page) {
      _page = page;
      return _page.open(url);
    }).then(function(status) {

      // evaluate start
      var change =  _page.evaluate(function() {
        return 3;
      }).then(function(res) {
        assert.equal(res, 3);
      });

      return Promise.all([change]);
    });

    return promise;
  });

  after(function(done) {
    _page.close().then(function() {
      _ph.exit();
    });

    done();
  });
});
