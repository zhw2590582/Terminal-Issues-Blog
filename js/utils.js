window.Utils = (function (dayjs) {
  return {
    formatTime: function (time) {
      return dayjs(time).format("YYYY-MM-DD");
    },
    debounce: function (fn, delay) {
      var timer;
      return function () {
        var context = this;
        var args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
          fn.apply(context, args);
        }, delay);
      };
    },
    queryStringify: function (query) {
      return Object.keys(query)
        .map((key) => `${key}=${encodeURIComponent(query[key] || "")}`)
        .join("&");
    },
    truncateString: function (str, num) {
      return str.length > num
        ? `${str.slice(0, num > 3 ? num - 3 : num)}...`
        : str;
    },
  };
})(window.dayjs);
