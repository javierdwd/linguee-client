const querystring = require("querystring");
const langs = require("./langs");

const endpoint = {
  components: {
    scheme: "https://",
    host: "www.linguee.com",
    path: "/",
    parameters: {
      source: "auto",
      ajax: 1,
      query: ""
    }
  },
  createSearchUrl(term = "", from = "", to = "") {
    term = term.toString().trim();

    const fromLang = langs.get(from);
    const toLang = langs.get(to);

    if (!term.length) {
      throw new Error("Empty term");
    }
    if (!fromLang) {
      throw new Error(`"from" parameter ("${from} language") is not available`);
    }
    if (!toLang) {
      throw new Error(`"to" parameter ("${to} language") is not available`);
    }

    let url = this.getDomain();

    url += `${fromLang.name}-${toLang.name}/search/search`;
    url +=
      "?" +
      querystring.stringify({
        ...this.components.parameters,
        query: term
      });

    return url;
  },
  getDomain() {
    return this.components.scheme + this.components.host + this.components.path;
  }
};

module.exports = endpoint;
