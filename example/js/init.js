window.onload = function() {

  var innerLinkFixed = -100;

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
  if(
    navigator.userAgent.match(/MSIE 10/i) ||
    navigator.userAgent.match(/Trident\/7\./) ||
    navigator.userAgent.match(/Edge\/12\./)
  ) {
    if (document.attachEvent) {
      document.attachEvent('onmouseweel', function(e) {
        disableMouseWheel(e);
      });
    }

    function disableMouseWheel(e) {
      e.preventDefault();
      var wd = e.wheelDelta;
      var csp = window.pageYOffset;
      window.scrollTo(0, csp - wd);
    }
  }

  /*
   * set viewport without tablet
   */
  if (!device.tablet()) {
    var metaTag=document.createElement('meta');
    metaTag.name = 'viewport'
    metaTag.content = 'width=device-width, initial-scale=1';
    document.getElementsByTagName('head')[0].appendChild(metaTag);
  }

  /*
   * detect viewport
   */
  window.matchMedia('(max-width: 767px)').addListener(viewPortSp);
  function viewPortSp(e) {
    if (e.matches) {
      console.log('viewport sp');
    }
  }

  window.matchMedia('(min-width: 1280px)').addListener(viewPort5k);
  function viewPort5k(e) {
    if (e.matches) {
      console.log('viewport 5k');
    }
  }

  /*
   * humberger menu
   */
  var humberger = document.getElementsByClassName('humberger-icon')[0];
  humberger.addEventListener('click', function() {

    var body = document.getElementsByTagName('body')[0];
    var nav = document.getElementsByClassName('globalnav')[0];
    var header = document.getElementsByTagName('header')[0];

    body.classList.toggle('humberger-active');
    nav.classList.toggle('humberger-active');
    header.classList.toggle('humberger-active');
    this.classList.toggle('humberger-active');
  });

  /*
   * inner link scroll
   */
  var innerLinks = document.documentElement.querySelectorAll('a[href^="#"]');
  for (var i = 0; i < innerLinks.length; i++) {
    innerLinks[i].addEventListener('click', clickEvent, false);
  }

  function clickEvent(e) {
    var hash = e.target.getAttribute('href');
    if (hash && hash.match(/^#.*/)) {
      e.preventDefault();
      var el = document.getElementById(hash.replace(/#/g, ''));
      if (el) {
        scrollToY(el.offsetTop + innerLinkFixed, 50, 'easeInOutQuint');
      }
    }
  }

  /*
   * scroll animation
   */
  function scrollToY(scrollTargetY, speed, easing) {
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
