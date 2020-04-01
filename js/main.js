window.Main = (function(utils, issues, comment) {
  // 初始化 Terminal
  const term = new Terminal();
  term.open(document.getElementById("terminal"));

  // 初始化 Terminal 插件
  const fitAddon = new FitAddon.FitAddon();
  const webLinksAddon = new WebLinksAddon.WebLinksAddon();
  fitAddon.activate(term);
  webLinksAddon.activate(term);

  // 自适应 Terminal
  fitAddon.fit();
  const debounceFix = utils.debounce(fitAddon.fit.bind(fitAddon), 500);
  window.addEventListener("resize", debounceFix);

  // 生成随机用户名或者读取登录用户名
  term.write("User $ ");

  // 初始化文章
  issues.byPage(1).then(console.log);

  term.onKey(function(data) {
    console.log(data);
    term.write(data.key);
    term.writeln("");
  });
})(window.Utils, window.Issues, window.Comment);
