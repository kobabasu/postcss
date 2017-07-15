/*
 * page initialization
 */


/*
 * -------------
 * main
 * -------------
 */
window.onload = function() {
  DisableWindowsMouseWheel();
  EnableViewport();
}


/*
 * object.create
 */
var p = {};
var _bjectCreate = function(arg) {
  if (!arg) { return {} };
  function obj() {};
  obj.prototype = arg;
  return new obj;
};
Object.create = Object.create || ObjectCreate ;


/*
 * request animation frame
 */
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();


/*
 * disabled windows smooth scroll
 */
function DisableWindowsMouseWheel() {
  var _ = Object.create(p);
  _ = {};

  if(
    navigator.userAgent.match(/MSIE 10/i) ||
    navigator.userAgent.match(/Trident\/7\./) ||
    navigator.userAgent.match(/Edge\/12\./)
  ) {
    if (document.attachEvent) {
      document.attachEvent('onmouseweel', function(e) {
        e.preventDefault();
        var wd = e.wheelDelta;
        var csp = window.pageYOffset;
        window.scrollTo(0, csp - wd);
      });
    }
  }
  return true;
}


/*
 * set viewport without tablet
 */
function EnableViewport() {
  if ('device' in this) {
    var _ = Object.create(p);

    _ = {
      target: document.getElementsByTagName('head')[0],
      tag: document.createElement('meta'),
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, user-scalable=no'
    };

    if (!device.tablet()) {
      _.tag.name = _.name;
      _.tag.content = _.content;
      _.target.appendChild(_.tag);
    };

    return true;
  } else {
    console.log('error [EnableViewport()]: "device.js" not found.');
    return false;
  }
}

// vim: foldmethod=marker:ts=2:sts=0:sw=2
