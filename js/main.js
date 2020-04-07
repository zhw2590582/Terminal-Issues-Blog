window.Main = (function (actions, utils, issues, comment) {
  var term = new Term({
    container: "#root",
    width: 800,
    height: 600,
    pixelRatio: 2,
    title: "老赵茶馆",
    fontFamily: "monospace",
    prefix: 'root@linux: ~ <d color="#00f501">$</d> ',
    welcome: `
Hi, 老赵其实不老, 也不喜欢喝茶, 是一枚前端攻城狮, 需联系请加QQ群: <i color="yellow">320881312</i>
文章列表：<i color="yellow">post</i>, 页面列表：<i color="yellow">page</i>, 用户登录：<i color="yellow">login</i>, 发表评论：<i color="yellow">comment</i>, 清空日志：<i color="yellow">clear</i>
<i color="#666">---------------------------------------------------------------------------</i>
    `.trim(),
    loading: () => '<d color="yellow">Please wait for a moment...</d>',
    notFound: (val) => `🐶 : <d color='red'>${val}</d> : command not found`,
    actions: actions,
  });

  // 初始化文章
  // issues.byPage(1).then(console.log);
})(window.Actions, window.Utils, window.Issues, window.Comment);
