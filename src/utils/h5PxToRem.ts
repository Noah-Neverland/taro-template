if (process.env.TARO_ENV === 'h5' && process.env.NODE_ENV === 'production') {
  (function (n) {
    function f() {
      var e = n.document.documentElement,
        w = e.getBoundingClientRect().width,
        x = (32 * w) / 750;
      e.style.fontSize = x >= 40 ? '40px' : x <= 12 ? '12px' : x + 'px';
    }
    n.addEventListener('resize', function () {
      f();
    });
    f();
  })(window);
}
