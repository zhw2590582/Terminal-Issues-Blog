window.Issues = (function(utils, option) {
  // 缓存所有请求结果
  const cache = new Map();
  return {
    // 基本url
    getUrl: function(opt) {
      const api = `https://api.github.com/repos/${option.owner}/${option.repo}/issues`;
      const query = {
        t: Date.now(),
        client_id: option.clientID,
        client_secret: option.clientSecret,
        ...opt
      };
      return `${api}?${utils.queryStringify(query)}`;
    },
    // 请求数据
    getRequest: function(url) {
      return fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Accept: `application/vnd.github.v3.${option.requestType}+json`
        }
      }).then(res => res.json());
    },
    // 格式化数据
    format: function(issue) {
      const post = {
        title: issue.title,
        html: issue.body_html,
        created_at: issue.created_at,
        updated_at: issue.updated_at,
        comments: issue.comments,
        tags: issue.labels
          .filter(tag => !Object.values(option.labels).includes(tag.name))
          .map(tag => tag.name),
        url: issue.url,
        id: issue.number,
        locked: issue.locked,
        excerpt: "",
        poster: ""
      };

      try {
        post.excerpt = truncateString(
          issue.body_text.replace(/[\r\n]/g, ""),
          option.excerpt
        );
      } catch (error) {
        post.excerpt = "";
      }

      try {
        post.poster = /src=[\'\"]?([^\'\"]*)[\'\"]?/i.exec(
          /<img.*?(?:>|\/>)/.exec(issue.body_html)[0]
        )[1];
      } catch (error) {
        post.poster = "";
      }

      return post;
    },
    // 通过分页获取
    byPage: function({ page = 1, labels = "", type = option.labels.post }) {
      const key = `page=${page}&labels=${labels}&type=${type}`;
      if (option.cache && cache.has(key)) {
        return Promise.resolve(cache.get(key));
      }

      const buildInLabels = Object.values(option.labels);
      if (!buildInLabels.includes(type)) {
        throw new TypeError(`[type] only accept: ${buildInLabels.join("|")}.`);
      }

      const url = this.getUrl({
        page,
        per_page: option.pageSize,
        labels: `${type},${labels}`
      });

      return this.getRequest(url).then(data => {
        const result = data.map(item => {
          const ItemResult = this.format(item);
          if (option.cache) {
            cache.set(`id=${item.number}`, ItemResult);
          }
          return ItemResult;
        });
        if (option.cache) {
          cache.set(key, result);
        }
        return result;
      });
    },
    // 通过id获取
    byId: function(id) {
      const key = `id=${id}`;
      if (option.cache && cache.has(key)) {
        return Promise.resolve(cache.get(key));
      }

      const url = this.getUrl(Number(id));

      return this.getRequest(url).then(data => {
        const result = this.format(data);
        if (option.cache) {
          cache.set(key, result);
        }
        return result;
      });
    }
  };
})(window.Utils, window.Option);
