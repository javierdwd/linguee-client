const querystring = require("querystring");
const iconv = require("iconv-lite");
const axios = require("axios");
const ExtractorsFactory = require("./extractors/ExtractorsFactory");

const linguee = (function() {
  return {
    createUrl(term = "", from = "", to = "") {
      term = term.toString().trim();

      if (!term.length) {
        throw new Error("Empty term");
      }

      const endpoint = "https://www.linguee.com/";
      const path = "{from}-{to}/search/search";
      const params = {
        source: "auto",
        ajax: 1,
        query: term
      };

      const finalPath = path.replace("{from}", from).replace("{to}", to);
      const url = `${endpoint}${finalPath}?${querystring.stringify(params)}`;

      return url;
    },
    translate(term, fromLang, toLang) {
      try {
        const url = this.createUrl(term, fromLang, toLang);

        return new Promise((resolve, reject) => {
          axios
            .get(url, { responseType: "arraybuffer" })
            .then(response => {
              const data = iconv.decode(
                Buffer.from(response.data),
                "ISO-8859-15"
              );

              try {
                const extractor = ExtractorsFactory.create("linguee");
                const $ = cheerio.load(
                  `<div id="extractor-wrapper">${data}</div>`
                );

                const result = extractor.run($("#extractor-wrapper"));

                return resolve(result);
              } catch (error) {
                reject(error);
              }
            })
            .catch(error => {
              reject(error);
            });
        });
      } catch (error) {
        return Promise.reject(error);
      }
    }
  };
})();

module.exports = linguee;
