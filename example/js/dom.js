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
  inview.onload();
  slideshow.start();

  window.onscroll = function() {
    scrolltop.animate();
    inview.detect();
  };

  window.resize = function() {
    scrolltop.animate();
  }
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
  EnableViewport();
  DisableWindowsMouseWheel();
  DetectViewport('sp', '(max-width: 767px)').listen();
  DetectViewport('5k', '(min-width: 1280px)').listen();
  ScrollInnerLinks();
  EnableSlideMenu();
  RippleEffect();
  // EnableHumbergerMenu();
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
 * detect viewport
 */
function DetectViewport(name, viewport) {
  var _ = Object.create(p);

  _ = {
    name: name,
    viewport: viewport,

    listen: function() {
      window.matchMedia(this.viewport).addListener(function(e) {
        if (e.matches) {
          console.log(name);
        }
      });
    }
  };

  return _;
};


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
  var classname = cls || '.inview' ;
  var obj = document.querySelectorAll(classname);
  var target = Object.keys(obj).map(function(key) {return obj[key];});

  _ = {
    delayInterval: 0.7,
    target: target,

    animate: function(i, mode) {
      var rect = _.target[i].getBoundingClientRect();

      if (window.innerHeight - rect.top > 0) {
        if (mode == 'onload') {
          var d = parseFloat(getComputedStyle(_.target[i])['transitionDelay']);
          _.target[i].style.transitionDelay = d + (_.delayInterval * i) + 's';
        }
        _.target[i].classList.add('animate');
        delete _.target[i];
      }
    },

    detect: function() {
      for (key in _.target) {
        _.animate(key);
      }
    },

    onload: function() {
      for (key in _.target) {
        _.animate(key, 'onload');
      }
    }
  };

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


// vim: foldmethod=marker:ts=2:sts=0:sw=2
