window.Actions = (function (issues, utils) {
  const loading = '<d color="yellow">Please wait for a moment...</d>';
  return [
    {
      input: /^post(\s+\d+)?/i,
      output(_, args) {
        this.output(loading);
        issues
          .byPage({
            page: args._[1] || 1,
          })
          .then((data) => {
            const posts = data
              .map(
                (item) =>
                  `[${utils.formatTime(item.created_at)}] - ${item.title}(${
                    item.comments
                  })
`
              )
              .join("");
            if (posts.length) {
              this.output(posts, true).input("");
            } else {
              this.output("<d color='yellow'>No more posts.</d>", true).input(
                ""
              );
            }
          });
      },
    },
    {
      input: /^page(\s+\d+)?/i,
      output(text) {
        return `<d color="#27C93F">${text}</d>`;
      },
    },
    {
      input: /^login$/i,
      output(text) {
        return `<d color="#27C93F">${text}</d>`;
      },
    },
    {
      input: /^comment$/i,
      output(text) {
        return `<d color="#27C93F">${text}</d>`;
      },
    },
    {
      input: /^clear$/i,
      output() {
        this.clear();
        return '<d color="#27C93F">Cleared successfully</d>';
      },
    },
  ];
})(window.Issues, window.Utils);
