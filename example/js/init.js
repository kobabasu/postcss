/*
 * page initialization
 */


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
