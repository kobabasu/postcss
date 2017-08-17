
/**
 * Ready
 *
 * ローディング画面を表示しcontentの読み込みを待つ
 *
 * @param {Object[]} options - 各オプションを指定
 * @param {string} options[].class='.loading' - ローディング画面のdivを指定
 * @param {number} options[].duration=1000 - 表示する長さ
 * @param {number} options[].delay=300 - loadging画面で止まる長さ
 * @param {function} options[].interactive - DOMContentLoadedの発火後に実行
 * @param {function} options[].complete - loadの発火後に実行
 * @param {function} options[].scroll - scroll時に実行
 * @param {function} options[].resize - resize時に実行
 *
 * @return {void}
 */
(function(global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory(global));
  } else if (typeof exports === 'object') {
    module.exports = factory;
  } else {
    Ready = factory(global);
  }
})((this || 0).self || global, function(global) {
  'use strict';

  var CLASS_NAME = '.loading' ;
  var DURATION = 1000 ;
  var DELAY = 0 ;

  function Ready(options) {

    options = options || {} ;

    this._class = options['class'] || CLASS_NAME ;
    this._duration = options['duration'] || DURATION ;
    this._delay = options['delay'] || DELAY ;
    this._interactive = options['interactive'] || function() {} ;
    this._complete = options['complete'] || function() {} ;
    this._scroll = options['scroll'] || function() {} ;
    this._resize = options['resize'] || function() {} ;

    this._el = null ;
    this._interactiveListener = null ;
    this._completeListener = null ;
    this._removeListener = null ;

    this.init();
  }

  Ready.prototype = Object.create(Object.prototype, {
    'constructor': { 'value': Ready },
    'init': { 'value': Ready_init },
    'create': { 'value': Ready_create },
    'interactive': { 'value': Ready_interactive },
    'remove': { 'value': Ready_remove },
    'transition': { 'value': Ready_transition },
    'complete': { 'value': Ready_complete },
    'scroll': { 'value': Ready_scroll },
    'resize': { 'value': Ready_resize }
  });

  function Ready_init() {
    this._interactiveListener = this.interactive.bind(this);
    global.document.addEventListener(
      'DOMContentLoaded',
      this._interactiveListener,
      {passive: true}
    );

    this._completeListener = this.complete.bind(this);
    global.addEventListener(
      'load',
      this._completeListener,
      {passive: true}
    );
  };

  function Ready_create() {
    this._el = global.document.createElement('div');
    this._el.classList.add(this._class.slice(1));
    var p = global.document.createElement('p');
    p.innerHTML = '&nbsp;loading...';
    this._el.appendChild(p);

    this._removeListener = this.remove.bind(this);
    this._el.addEventListener(
      'transitionend',
      this._removeListener,
      {passive: true}
    );

    global.document.body.insertBefore(
      this._el,
      global.document.body.firstChild
    );
  }

  function Ready_interactive() {
    global.document.removeEventListener(
      'DOMContentLoaded',
      this._interactiveListener,
      {passive: true}
    );

    this.create();

    this._interactive();
  };

  function Ready_remove() {
    this._el.removeEventListener(
      'transitionend',
      this._removeListener,
      {passive: true}
    );
    global.document.body.removeChild(this._el);
  };

  function Ready_transition() {
    this._el.classList.add('loaded');
  };

  function Ready_complete() {
    global.removeEventListener(
      'load',
      this._completeListener,
      {passive: true}
    );

    this._complete();

    this.scroll();
    this.resize();

    setInterval(this.transition.bind(this), this._delay);
  }

  function Ready_scroll() {
    this._scroll.flag = true;
    global.addEventListener(
      'scroll',
      function() {
        if (this._scroll.flag) {
          this._scroll.flag = false;
          setTimeout(function() {
            this._scroll();
            this._scroll.flag = true;
          }.bind(this), 300);
        }
      }.bind(this),
      {passive: true}
    );
  }

  function Ready_resize() {
    this._resize.flag = true;
    global.addEventListener(
      'resize',
      function() {
        if (this._resize.flag) {
          this._resize.flag = false;
          setTimeout(function() {
            this._resize();
            this._resize.flag = true;
          }.bind(this), 300);
        }
      }.bind(this),
      {passive: true}
    );
  }

  return Ready;
});


/*
 * -----------
 * settings
 * -----------
 */
var ready = new Ready({
  'interactive': function() {
  },

  'complete': function() {
    new EnableViewport();
    new DetectViewport({'name': 'sp', 'viewport': '(max-width: 767px)'});
    new DetectViewport({'name': '5k', 'viewport': '(min-width: 1280px)'});
    new InnerLink();
    new SlideMenu();
    /* new HumbergerMenu(); */

    new RippleEffect();
    new UpdateCopyright({'prefix': '2013-'});
    this.scrolltop = new ScrollTop();
    this.scrollit = new ScrollIt();
    this.inview = new InView();

    this.slideshow = new SlideShow();
    this.slideshow.start();
  },

  'scroll': function() {
    this.scrolltop.animate();
    this.inview.animate();
    this.scrollit.animate();
  },

  'resize': function() {
    this.scrolltop.animate();
  }
});


// vim: foldmethod=marker:ts=2:sts=0:sw=2
