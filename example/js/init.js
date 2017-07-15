/*
 * page initialization
 */


/*
 * -------------
 * main
 * -------------
 */
DisableWindowsMouseWheel();

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

// vim: foldmethod=marker:ts=2:sts=0:sw=2
