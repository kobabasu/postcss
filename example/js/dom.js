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
  var scrolltop = FixedScrollTop();
  var inview = InView();
  var scrollit = ScrollIt();
  slideshow.start();

  var scrollFlag = true;
  window.addEventListener('scroll', function() {
    if (scrollFlag) {
      scrollFlag = false;
      setTimeout(function() {

        // process
        scrolltop.animate();
        inview.animate();
        scrollit.animate();

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
  var y = new EnableViewport();
  console.log(y);
  new DetectViewport({'name': 'sp', 'viewport': '(max-width: 767px)'}).listen();
  new DetectViewport({'name': '5k', 'viewport': '(min-width: 1280px)'}).listen();
  ScrollInnerLinks();
  EnableSlideMenu();
  RippleEffect();
  // updateCopyRight();
  // EnableHumbergerMenu();

  var u = new UpdateCopyright({'prefix': '2013-'});
  u.change();
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
(function(factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    DetectViewport = factory();
  }
})(function() {
  'use strict';

  function DetectViewport(options) {

    options = options || {};

    this._name = options['name'] || 'sp';
    this._viewport = options['viewport'] || '(max-width: 767px)';
  }

  DetectViewport.prototype = Object.create(Object.prototype, {
    'constructor': { 'value': DetectViewport },
    'listen': { 'value': DetectViewport_listen }
  });

  function DetectViewport_listen() {
    var name = this._name;
    window.matchMedia(this._viewport).addListener(function(e) {
      if (e.matches) {
        console.log(name);
      }
    });
  }

  return DetectViewport;
});


/*
 * slide menu
 */
function EnableSlideMenu(nav) {
  var _ = Object.create(p);

  var nav = nav || '.globalnav.slidemenu';
  
  _ = {
    body: document.body,
    header: document.getElementsByTagName('header')[0],
    nav: document.querySelector(nav),
  }

  var icon = document.createElement('div');
  icon.className = 'slidemenu-icon';
  _.nav.parentNode.insertBefore(icon, _.nav.nextElementSibling);
  icon.addEventListener('click', function() {
    _.nav.style.opacity = 1;
    _.nav.classList.toggle('slidemenu-active');
  });

  return true;
}


/*
 * humberger menu
 */
function EnableHumbergerMenu(nav) {
  var _ = Object.create(p);

  var nav = nav || '.globalnav.humberger';
  
  _ = {
    body: document.body,
    header: document.getElementsByTagName('header')[0],
    nav: document.querySelector(nav),
  }

  var icon = document.createElement('div');
  icon.className = 'humberger-icon';
  _.nav.parentNode.insertBefore(icon, _.nav.nextElementSibling);

  icon.addEventListener('click', function() {
    _.body.classList.toggle('humberger-active');
    _.nav.classList.toggle('humberger-active');
    _.header.classList.toggle('humberger-active');
    icon.classList.toggle('humberger-active');
  });

  return true;
}


/*
 * inner link scroll
 */
function ScrollInnerLinks() {
  var _ = Object.create(p);

  _ = {
    links: document.documentElement.querySelectorAll('a[href^="#"]'),
    fixed: -100,

    click: function(e) {
      var hash = e.target.getAttribute('href') ||
          e.target.parentNode.getAttribute('href');

      if (hash && hash.match(/^#.*/)) {
        e.preventDefault();
        var el = document.getElementById(hash.replace(/#/g, ''));
        if (el) {
          _.scroll(el.offsetTop + _.fixed, 50, 'easeInOutQuint');
        }
      }
    },

    scroll: function(scrollTargetY, speed, easing) {
      var scrollY = window.pageYOffset,
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

          window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
        } else {
          // console.log('scroll done');
          window.scrollTo(0, scrollTargetY);
        }
      }
      tick();
    }
  };

  for (var i = 0; i < _.links.length; i++) {
    _.links[i].addEventListener('click', _.click, false);
  };

  return true;
}


/*
 * scrolltop position fixed
 */
function FixedScrollTop() {
  var _ = Object.create(p);

  _ = {
    footer: document.getElementsByTagName('footer')[0],
    target: document.getElementsByClassName('scrolltop')[0],

    animate: function() {
      var pos = (window.innerHeight -
        _.footer.getBoundingClientRect().top
      );

      if (pos > 0) {
        _.target.style.bottom = pos + 10 + 'px';
      } else {
        _.target.style.bottom = '10px';
      };
    }
  };

  return _;
}


/*
 * inview
 */
function InView(cls) {
  var _ = Object.create(p);

  _ = {
    els: document.querySelectorAll('.inview'),

    animate: function() {
      for (var i = 0; i < _.els.length; i++) {
        var loc = _.els[i].getBoundingClientRect();
        if (window.innerHeight - loc.top > 0) {
          _.els[i].classList.add('active');
        }
      }
    },

    remove: function(e) {
      e.target.removeEventListener(
        'transitionend',
        _.remove,
        {passive: true}
      );

      for (var i = 0; i < _.els.length; i++) {
        if (_.els[i].eventParam == e.target.eventParam) {
          _.els.splice(i, 1);
        }
      }
    }
  };

  // arrayに変換
  _.els = Object.keys(_.els).map(function(key) {return _.els[key];});

  for (var i = 0; i < _.els.length; i++) {
    _.els[i].eventParam = i;
    _.els[i].addEventListener(
      'transitionend',
      _.remove,
      {passive: true}
    );
  }

  // 初期ロード時用
  _.animate();

  return _;
}

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


/*
 * ripple effect
 */
function RippleEffect() {
  var _ = Object.create(p);

  _ = {
    els: document.querySelectorAll('.ripple'),

    add: function(el) {
      var fx = document.createElement('span');
      fx.className = 'ripple-effect';
      el.appendChild(fx);

      el.addEventListener('mousedown', function(e) {
        var x = e.offsetX;
        var y = e.offsetY;
        var w = fx.clientWidth;
        var h = fx.clientHeight;

        fx.style.left = x - w / 2 + 'px';
        fx.style.top = y - h / 2 + 'px';

        fx.classList.add('active');

        fx.addEventListener('animationend', remove, false);
        function remove() {
          fx.removeEventListener('aniimationend', remove, false);
          fx.classList.remove('active');
        }
      }, false);
    }
  };
  
  for (var i = 0; i < _.els.length; i++) {
    _.add(_.els[i]);
  }
  
  return false;
}


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
