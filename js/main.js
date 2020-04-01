window.Main = (function(Utils, Issues, Comment) {
  var term = new Terminal();
  term.loadAddon(new FitAddon.FitAddon());
  term.loadAddon(new WebLinksAddon.WebLinksAddon());
  term.open(document.getElementById("terminal"));

  term.write("User $ ");

  term.onKey(function(data) {
    console.log(data);
    term.write(data.key);
    term.writeln("");
  });
})(window.Utils, window.Issues, window.Comment);
