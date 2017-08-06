/*
 * dom control
 */


/*
 * -------------
 * before load
 * -------------
 */
var loading = Loading();
var slideshow = SlideShow();
loading.emitter = function() {
  var scrolltop = new ScrollTop();
  var inview = new InView();
  // var scrollit = ScrollIt();
  slideshow.start();

  var scrollFlag = true;
  window.addEventListener('scroll', function() {
    if (scrollFlag) {
      scrollFlag = false;
      setTimeout(function() {

        // process
        scrolltop.animate();
        inview.animate();
        // scrollit.animate();

        scrollFlag = true;
        return scrollFlag;
      }, 300);
    }
  }, {passive: true});


  var resizeFlag = true;
  window.addEventListener('resize', function() {
    if (resizeFlag) {
      resizeFlag = false;
      setTimeout(function() {

        // process
        scrolltop.animate();

        resizeFlag = true;
        return resizeFlag;
      }, 300);
    }
  }, {passive: true});
};

if (!DEBUG_MODE) {
  loading.run();
  setTimeout(loading.loaded, 7000);
} else {
  loading.remove();
}


/*
 * -------------
 * main
 * -------------
 */
window.onload = function() {
  new EnableViewport();
  new DetectViewport({'name': 'sp', 'viewport': '(max-width: 767px)'});
  new DetectViewport({'name': '5k', 'viewport': '(min-width: 1280px)'});
  new InnerLink();
  new SlideMenu();
  // new HumbergerMenu();
  new RippleEffect();

  new UpdateCopyright({'prefix': '2013-'});
};


/*
 * loading
 */
function Loading(element) {
  var _ = Object.create(p);
  var el = element || '#wrap' ;

  _ = {
    duration: 1800,

    complete: false,
    el: document.querySelector(el),
    emitter: null,

    run: function() {
      document.addEventListener('DOMContentLoaded', _.loaded, false);
    },

    loaded: function() {
      document.removeEventListener('DOMContentLoaded', _.loaded, false);
      
      if (!_.complete) {
        setTimeout(function() {
          _.el.classList.add('loaded');
          _.el.addEventListener('transitionend', _.remove, false);
        }, _.duration);
      }
    },

    remove: function() {
      document.body.removeChild(_.el);
      _.complete = true;
      _.emitter();
    },

    trigger: function(fnc) {
      fnc();
    }
  };

  return _;
}


/**
 * EnableViewport
 *
 * viewportをjsで有効にする
 * tabletはdefaultで無効
 *
 * @param {Object[]} options - 各オプションを指定
 * @param {Boolean} options[].isTablet=false - タブレットもsp表示する場合はtrue
 *
 * @return {Boolean} device.jsが読み込めればtrue
 */
(function(global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory(global));
  } else if (typeof exports === 'object') {
    module.exports = factory;
  } else {
    EnableViewport = factory(global);
  }
})((this || 0).self || global, function(global) {
  'use strict';

  var CONTENT = 'width=device-width, initial-scale=1, user-scalable=no';

  function EnableViewport(options) {

    options = options || {};

    this._isTablet = options['isTablet'] || false;

    if (!('device' in global)) {
      console.error('EnableViewport:error device.js not found.');
      return false;
    };

    this.append();

    return true;
  }

  EnableViewport.prototype = Object.create(Object.prototype, {
    'constructor': { 'value': EnableViewport },
    'append': { 'value': EnableViewport_append }
  });

  function _generate() {
    var tag = document.createElement('meta');
    tag.name = 'viewport';
    tag.content = CONTENT;
    return tag;
  }

  function EnableViewport_append() {
    if (!this._isTablet && !device.tablet()) return;
    var head = document.getElementByTagNAme('head')[0];
    head.appendChild(_generate());
  }

  return EnableViewport;
});


/**
 * DetectViewport
 *
 * window.matchMediaを利用してviewportを検出
 * 
 * @param {Object[]} options - 各オプションを指定
 * @param {string} options[].name='sp' - viewportの名前 consoleに表示
 * @param {string} options[].viewport='(max-width: 767px)' - viewport
 *
 * @return {void}
 */
(function(global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory(global));
  } else if (typeof exports === 'object') {
    module.exports = factory(global);
  } else {
    DetectViewport = factory(global);
  }
})((this || 0).self || global, function(global) {
  'use strict';

  function DetectViewport(options) {

    options = options || {};

    this._name = options['name'] || 'sp';
    this._viewport = options['viewport'] || '(max-width: 767px)';

    this.listen();
  }

  DetectViewport.prototype = Object.create(Object.prototype, {
    'constructor': { 'value': DetectViewport },
    'listen': { 'value': DetectViewport_listen }
  });

  function DetectViewport_listen() {
    var name = this._name;
    global.matchMedia(this._viewport).addListener(function(e) {
      if (e.matches) {
        console.log(name);
      }
    });
  }

  return DetectViewport;
});


/**
 * SlideMenu
 *
 * SP表示時のスライドメニューを表示・非表示
 *
 * @param {Object[]} options - 各オプションを指定
 * @param {string} options[].class='glbalnav.slidemenu' - メニューのタグを指定
 *
 * @return {void}
 */
(function(global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory(global));
  } else if (typeof exports === 'object') {
    module.exports = factory(global);
  } else {
    SlideMenu = factory(global);
  }
})((this || 0).self || global, function(global) {
  'use strict';

  var CLASS_NAME = '.globalnav.slidemenu';
  var APPEND_CLASS_NAME_ACTIVE = 'slidemenu-active';
  var APPEND_CLASS_NAME_ICON = 'slidemenu-icon';

  function SlideMenu(options) {

    options = options || {};

    this._class = options['class'] || CLASS_NAME ;

    this.attach();
  }

  SlideMenu.prototype = Object.create(Object.prototype, {
    'constructor': { 'value': SlideMenu },
    'attach': { 'value': SlideMenu_attach }
  });

  function _generate() {
    var el = global.document.createElement('div');
    el.className = APPEND_CLASS_NAME_ICON;

    return el;
  }

  function SlideMenu_attach() {
    if (global.document.querySelector(CLASS_NAME)) {
      var icon = _generate();
      var nav = global.document.querySelector(CLASS_NAME);
      nav.parentNode.insertBefore(icon, nav.nextElementSibling);

      icon.addEventListener('click', function() {
        nav.style.opacity = 1;
        nav.classList.toggle(APPEND_CLASS_NAME_ACTIVE);
      });
    }
  }

  return SlideMenu;
});


/**
 * HumbergerMenu
 *
 * SP表示時のハンバーガーメニューを表示・非表示
 *
 * @param {Object[]} options - 各オプションを指定
 * @param {string} options[].class='glbalnav.humberger' - メニューのタグを指定
 *
 * @return {void}
 */
(function(global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory(global));
  } else if (typeof exports === 'object') {
    module.exports = factory(global);
  } else {
    HumbergerMenu = factory(global);
  }
})((this || 0).self || global, function(global) {
  'use strict';

  var CLASS_NAME = '.globalnav.humberger';
  var APPEND_CLASS_NAME_ACTIVE = 'humberger-active';
  var APPEND_CLASS_NAME_ICON = 'humberger-icon';

  function HumbergerMenu(options) {

    options = options || {} ;

    this._class = options['class'] || CLASS_NAME ;

    this.attach();
  }

  HumbergerMenu.prototype = Object.create(Object.prototype, {
    'constructor': { 'value': HumbergerMenu },
    'attach': { 'value': HumbergerMenu_attach }
  });

  function _generate() {
    var el = document.createElement('div');
    el.className = APPEND_CLASS_NAME_ICON;

    return el;
  }

  function HumbergerMenu_attach() {
    if (global.document.querySelector(CLASS_NAME)) {
      var icon = _generate();
      var nav = global.document.querySelector(CLASS_NAME);
      nav.parentNode.insertBefore(icon, nav.nextElementSibling);

      icon.addEventListener('click', function() {
        global.document.body.classList.toggle(APPEND_CLASS_NAME_ACTIVE);
        global.document.getElementsByTagName('header')[0]
          .classList.toggle(APPEND_CLASS_NAME_ACTIVE);
        nav.classList.toggle(APPEND_CLASS_NAME_ACTIVE);
        icon.classList.toggle(APPEND_CLASS_NAME_ACTIVE);
      });
    }
  }

  return HumbergerMenu;
});


/**
 * InnerLink
 *
 * インナーリンクにスクロールを加える
 *
 * @return {void}
 */
(function(global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory(global));
  } else if (typeof exports === 'object') {
    module.exports = factory(global);
  } else {
    InnerLink = factory(global);
  }
})((this || 0).self || global, function(global) {
  'use strict';

  var FIXED = -100;

  function InnerLink(options) {

    options = options || {} ;

    this._links = global.document.documentElement
      .querySelectorAll('a[href^="#"]');

    for (var i = 0; i < this._links.length; i++) {
      this._links[i].addEventListener('click', _click, false);
    };
  }

  InnerLink.prototype = Object.create(Object.prototype, {
    'constructor': { 'value': InnerLink }
  });

  function _click(e) {
    var hash = e.target.getAttribute('href') ||
        e.target.parentNode.getAttribute('href');

    if (hash && hash.match(/^#.*/)) {
      e.preventDefault();
      var el = global.document.getElementById(hash.replace(/#/g, ''));
      if (el) {
        _scroll(el.offsetTop + FIXED, 50, 'easeInOutQuint');
      }
    }
  }

  function _scroll(scrollTargetY, speed, easing) {
    var scrollY = global.pageYOffset,
      scrollTargetY = scrollTargetY || 0,
      speed = speed || 2000,
      easing = easing || 'easeOutSine',
      currentTime = 0;

    var time = Math.max(
      .1,
      Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8)
    );

    var PI_D2 = Math.PI / 2,
      easingEquations = {
        easeOutSine: function (pos) {
          return Math.sin(pos * (Math.PI / 2));
        },
        easeInOutSine: function (pos) {
          return (-0.5 * (Math.cos(Math.PI * pos) - 1));
        },
        easeInOutQuint: function (pos) {
          if ((pos /= 0.5) < 1) {
            return 0.5 * Math.pow(pos, 5);
          }
          return 0.5 * (Math.pow((pos - 2), 5) + 2);
        }
      };

    function tick() {
      currentTime += 1 / 60;

      var p = currentTime / time;
      var t = easingEquations[easing](p);

      if (p < 1) {
        requestAnimFrame(tick);

        global.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
      } else {
        // console.log('scroll done');
        global.scrollTo(0, scrollTargetY);
      }
    }
    tick();
  }

  return InnerLink;
});


/**
 * ScrollTop
 *
 * @param {Object[]} options - 各オプションを指定
 * @param {string} options[].class='.scrolltop' - スクロールアイコンのクラス
 *
 * @return {void}
 */
(function(global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory(global));
  } else if (typeof exports === 'object') {
    module.exports = factory(global);
  } else {
    ScrollTop = factory(global);
  }
})((this || 0).self || global, function(global) {
  'use strict';

  var CLASS_NAME = '.scrolltop';
  var MARGIN_BOTTOM_ELEMENT = 'footer';
  var DISTANCE = 5;

  function ScrollTop(options) {

    options = options || {} ;

    this._class = options['class'] || CLASS_NAME ;
    this._target = global.document.querySelector(this._class);
    this._bottomElement = global.document
      .querySelector(MARGIN_BOTTOM_ELEMENT);
  }

  ScrollTop.prototype = Object.create(Object.prototype, {
    'constructor': { 'value': ScrollTop },
    'animate': { 'value': ScrollTop_animate }
  });

  function ScrollTop_animate() {
    var pos = global.innerHeight - this._bottomElement
      .getBoundingClientRect().top;

    if (pos > 0) {
      this._target.style.bottom = pos + DISTANCE + 'px';
    } else {
      this._target.style.bottom = DISTANCE + 'px';
    };
  }

  return ScrollTop;
});


/**
 * InView 
 *
 * elementがブラウザ表示領域に入ったときにフェードイン
 *
 * @param {Object[]} options - 各オプションを指定
 * @param {string} options[].class='.inview' - 対象のクラスを指定
 *
 * @return {void}
 */
(function(global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory(global));
  } else if (typeof exports === 'object') {
    module.exports = factory;
  } else {
    InView = factory(global);
  }
})((this || 0).self || global, function(global) {
  'use strict';

  var CLASS_NAME = '.inview';

  function InView(options) {

    options = options || {} ;

    this._class = options['class'] || CLASS_NAME ;

    var els = document.querySelectorAll(this._class);
    this._els = Object.keys(els).map(function(key) {return els[key];});

    this.init();
  }

  InView.prototype = Object.create(Object.prototype, {
    'constructor': { 'value': InView },
    'init': { 'value': InView_init },
    'animate': { 'value': InView_animate },
    'remove': { 'value': InView_remove }
  });

  function InView_init() {
    for (var i = 0; i < this._els.length; i++) {
      this._els[i].eventParam = i;
      this._els[i].addEventListener(
        'transitionend',
        this.remove.bind(this),
        {passive: true}
      );
    }

    // 初期ロード時用
    this.animate();
  }

  function InView_animate() {
    Object.keys(this._els).forEach(function(key) {
      var loc = this[key].getBoundingClientRect().top;
      if (global.innerHeight - loc > 0) {
        this[key].classList.add('active');
        delete this[key];
      }
    }, this._els);
  };

  function InView_remove(e) {
    e.target.removeEventListener(
      'transitionend',
      this.remove.bind(this),
      {passive: true}
    );
  }

  return InView;
});


/*
 * slideshow
 */
function SlideShow() {
  var _ = Object.create(p);

  _ = {
    duration: 3000,
    totalCounts: 120,

    container: document.querySelector('.slideshow-container'),
    ul: document.querySelector('.slideshow-container > ul:nth-of-type(1)'),
    items: document.querySelectorAll("[class*='slideshow-item-']"),
    forward: document.querySelector('.slideshow-forward'),
    prev: document.querySelector('.slideshow-prev'),
    dots: [], 

    now: 0,
    next: 1,
    count: 0,
    timer: null,

    init: function() {
      // for ios safari overflow-x issue
      _.ul.style.position = 'relative';
      _.ul.style.overflow = 'visible';
      _.ul.style.width = '100%';

      _.createDot();
      _.createBg();
    },

    start: function() {
      _.timer = setInterval(_.loop, _.duration);
    },

    createBg: function() {
      var bg = _.items[0].cloneNode(true);
      bg.style.marginLeft = 0;
      bg.style.zIndex = 0;

      var el = bg.childNodes[1];
      el.style.opacity = 1;

      _.ul.appendChild(bg);

      _.dots[0].classList.add('active');
      _.dots[0].style.cursor = 'default';
    },

    createDot: function() {
      var ul = document.createElement('ul');
      ul.className = 'slideshow-dot';

      for (var i = 0; i < _.items.length; i++) {
        var li = document.createElement('li');
        li.eventParam = i;
        li.addEventListener('click', function(e) {
          if (_.now != e.target.eventParam) {
            _.next = e.target.eventParam;
            _.reset();
          }
        }, false);

        _.dots[i] = li;
        ul.appendChild(li);
      }

      _.container.appendChild(ul);
    },

    restore: function() {
      _.count += 1;
      if (_.count >= _.totalCounts) {
        _.stop();
      }

      for (var i = 0; i < _.items.length; i++) {
        _.items[i].style.zIndex = 10;
        _.dots[i].classList.remove('active');
        _.dots[i].style.cursor = 'pointer';
        if (i != _.now) {
          _.items[i].classList.remove('active');
        }
      }
    },

    animate: function() {
      _.items[_.next].style.zIndex = 20;
      _.items[_.next].addEventListener('animationend', _.animationEnd, false);
      _.items[_.next].classList.add('active');
      _.dots[_.next].classList.add('active');
      _.dots[_.next].style.cursor = 'default';
    },

    animationEnd: function() {
      _.items[_.next].removeEventListener('animationend', _.animationEnd, false);
      _.items[_.now].classList.remove('active');
      _.now = _.next;
      _.next = _.returntozero(_.next + 1);
    },

    loop: function() {
      _.restore();
      _.animate();
    },

    reset: function() {
      clearInterval(_.timer);
      _.loop();
      _.timer = setInterval(_.loop, _.duration);
    },

    stop: function() {
      clearInterval(_.timer);
    },

    turnover: function(num) {
      if (num < 0) {
        num = _.items.length - 1;
      }
      return num;
    },

    returntozero: function(num) {
      if (num > _.items.length - 1) {
        num = 0;
      }
      return num;
    }
  };

  _.init();

  _.forward.addEventListener('click', function() {
    _.next = _.returntozero(_.now + 1);
    _.reset();
  }, false);

  _.prev.addEventListener('click', function() {
    _.next = _.turnover(_.now - 1);
    _.reset();
  }, false);
  
  return _;
}


/**
 * RippleEffect
 *
 * ripple effectを追加する
 *
 * @param {Object[]} options - 各オプションを指定
 * @param {string} opotions[].class='.ripple' - 付加するクラスを指定する
 *
 * @return {void}
 */
(function(factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    RippleEffect = factory();
  }
})(function() {
  'use strict';

  var CLASS_NAME = '.ripple';
  var APPEND_CLASS_NAME = 'ripple-effect';

  function RippleEffect(options) {

    options = options || {};

    this._class = options['class'] || CLASS_NAME ;

    this.init();
  }

  RippleEffect.prototype = Object.create(Object.prototype, {
    'constructor': { 'value': RippleEffect },
    'init': { 'value': RippleEffect_init }
  });

  function RippleEffect_init() {
    var els = document.querySelectorAll(this._class);
    for (var i = 0; i < els.length; i++) {
      _append(els[i]);
    }
  }

  function _generate() {
    var fx = document.createElement('span');
    fx.className = APPEND_CLASS_NAME;

    return fx;
  }

  function _append(el) {
    el.addEventListener('mousedown', function(e) {
      _add(e, el);
    }, false);
  }

  function _add(e, el) {
    var fx = _generate();
    el.appendChild(fx);

    var x = e.offsetX;
    var y = e.offsetY;
    var w = fx.clientWidth;
    var h = fx.clientHeight;

    fx.style.left = x - w / 2 + 'px';
    fx.style.top = y - h / 2 + 'px';

    fx.classList.add('active');
    fx.addEventListener('animationend', _remove, false);
  }

  function _remove(e) {
    var fx = e.target;
    fx.removeEventListener('aniimationend', _remove, false);
    fx.parentNode.removeChild(fx);
  }

  return RippleEffect;
});


/*
 * Scroll Background
 */
function ScrollIt() {
  var _ = Object.create(p);

  _ = {
    distance: 50,

    doc: document.documentElement.clientHeight,
    ups: document.querySelectorAll('.scrollit-up'),
    downs: document.querySelectorAll('.scrollit-down'),
    lefts: document.querySelectorAll('.scrollit-left'),
    rights: document.querySelectorAll('.scrollit-right'),

    animate: function() {
      var limit = _.distance * 2;
      var height = window.innerHeight;
        
      for (var i = 0; i < _.ups.length; i++) {
        var loc = _.ups[i].getBoundingClientRect();
        var dis = limit - loc.top / height * _.distance;
        if (0 < dis && 100 > dis) {
          _.ups[i].style.backgroundPositionY = dis + '%';
        }
      };

      for (var i = 0; i < _.downs.length; i++) {
        var loc = _.downs[i].getBoundingClientRect();
        var dis = loc.top / height * _.distance;
        if (0 < dis && 100 > dis) {
          _.downs[i].style.backgroundPositionY = dis + '%';
        }
      };

      for (var i = 0; i < _.lefts.length; i++) {
        var loc = _.lefts[i].getBoundingClientRect();
        var dis = loc.top / height * _.distance;
        if (0 < dis && 100 > dis) {
          _.lefts[i].style.backgroundPositionX = dis + '%';
        }
      };

      for (var i = 0; i < _.rights.length; i++) {
        var loc = _.rights[i].getBoundingClientRect();
        var dis = limit - loc.top / height * _.distance;
        if (0 < dis && 100 > dis) {
          _.rights[i].style.backgroundPositionX = dis + '%';
        }
      };
    },
  };

  return _;
}


/**
 * UpdateCopyright
 *
 * 'div.copyright span'内の年を動的に更新する
 *
 * @param {Object[]} options - 各オプションを指定
 * @param {string} options[].thisyear=Date.getFullYear - 年を指定する
 * @param {string} options[].prefix=null - 年の前に表示する
 *
 * @return {void}
 */
(function(factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    UpdateCopyright = factory();
  }
})(function() {
  'use strict';

  var TARGET = '.copyright span';

  function UpdateCopyright(options) {
    
    options = options || {};

    this.thisyear = options['thisyear'] || _getThisyear();
    this.prefix = options['prefix'] || null;

    this.change();
  }

  UpdateCopyright.prototype = Object.create(Object.prototype, {
    'constructor': { 'value': UpdateCopyright },
    'change': { 'value': UpdateCopyright_change }
  });

  function _getThisyear() {
    return new Date().getFullYear();
  };

  function UpdateCopyright_change() {
    var el = document.querySelector(TARGET);
    el.innerHTML = this.prefix + this.thisyear;
  };

  return UpdateCopyright;
});


// vim: foldmethod=marker:ts=2:sts=0:sw=2
