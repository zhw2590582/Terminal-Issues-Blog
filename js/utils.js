window.Utils = (function() {
  return {
    debounce: function(fn, delay) {
      var timer;
      return function() {
        var context = this;
        var args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function() {
          fn.apply(context, args);
        }, delay);
      };
    }
  };
})();
