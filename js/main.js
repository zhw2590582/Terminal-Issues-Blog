window.Main = (function(utils, issues, comment) {
  var term = new Terminal();
  term.open(document.getElementById("terminal"));

  var fitAddon = new FitAddon.FitAddon();
  var webLinksAddon = new WebLinksAddon.WebLinksAddon();
  fitAddon.activate(term);
  webLinksAddon.activate(term);

  fitAddon.fit();
  var debounceFix = utils.debounce(fitAddon.fit.bind(fitAddon), 500);
  window.addEventListener("resize", debounceFix);

  term.write("User $ ");

  term.onKey(function(data) {
    console.log(data);
    term.write(data.key);
    term.writeln("");
  });
})(window.Utils, window.Issues, window.Comment);
