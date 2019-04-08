const axios = require("axios");
const iconv = require("iconv-lite");
const endpoint = require("./utils/endpoint");
const ExtractorsFactory = require("./extractors/ExtractorsFactory");

const linguee = (function() {
  return {
    translate(term, fromLang, toLang) {
      try {
        const url = endpoint.createSearchUrl(term, fromLang, toLang);

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
