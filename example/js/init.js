window.onload = function() {
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
};
