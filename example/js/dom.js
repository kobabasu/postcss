/*
 * dom control
 */


/*
 * -------------
 * before load
 * -------------
 */
var loading = Loading();
loading.emitter = function() {
  var scrolltop = FixedScrollTop();
  var inview = InView();
  inview.onload();

  window.onscroll = function() {
    scrolltop.animate();
    inview.detect();
  };
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
  enableHumbergerMenu();
};


/*
 * loading
 */
function Loading(element) {
  var _ = Object.create(p);
  var el = element || '#wrap' ;

  _ = {
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
        }, 1800);
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
 * humberger menu
 */
function enableHumbergerMenu(nav) {
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
    footer: document.getElementsByTagName('footer')[0].clientHeight,
    target: document.getElementsByClassName('scrolltop')[0],
    body: window.document.body,
    html: window.document.documentElement,

    now: 0,
    pos: 0,

    animate: function() {
      _.now = _.body.scrollTop || _.html.scrollTop ;
      _.pos = _.html.scrollHeight - _.html.clientHeight - _.now;

      console.log(_.footer + 10 + 'px');
      if (_.footer > _.pos) {
        _.target.style.bottom = _.footer + 10 + 'px';
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


// vim: foldmethod=marker:ts=2:sts=0:sw=2
