/*
 * page initialization
 */

/*
 * loading
 */
document.addEventListener('DOMContentLoaded', loaded, false);
function loaded() {
  document.removeEventListener('DOMContentLoaded', loaded, false);
  var el = document.getElementById('wrap');
  
  if (el) {
    el.classList.add('loaded');
    el.addEventListener('transitionend', remove, false);
  }
  function remove() {
    document.body.removeChild(el);
  }
};

setTimeout(loaded, 7000);


/*
 * object.create
 */
var p = {};
var ObjectCreate = function(arg) {
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

// vim: foldmethod=marker:ts=2:sts=0:sw=2
