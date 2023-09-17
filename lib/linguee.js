const axios = require('axios');
const iconv = require('iconv-lite');
const Lang = require('./utils/Lang').default;
const Endpoint = require('./utils/Endpoint').default;
const ExtractorsFactory = require('./extractors/ExtractorsFactory');

const linguee = (function () {
  return {
    translate(term, fromLang, toLang) {
      try {
        const url = Endpoint.createSearchUrl(term, fromLang, toLang);

        return new Promise((resolve, reject) => {
          axios
            .get(url, { responseType: 'arraybuffer' })
            .then((response) => {
              const responseCharset = response.headers['content-type'].match(
                /.+charset="(?<charset>.*)"$/
              ).groups.charset;

              const data = iconv.decode(
                Buffer.from(response.data),
                iconv.encodingExists(responseCharset)
                  ? responseCharset
                  : 'utf-8'
              );

              try {
                const extractor = ExtractorsFactory.create('linguee');
                const $ = cheerio.load(
                  `<div id="extractor-wrapper">${data}</div>`
                );

                const result = extractor.run($('#extractor-wrapper'));

                result.from = Lang.get(fromLang).code;
                result.to = Lang.get(toLang).code;

                return resolve(result);
              } catch (error) {
                reject(error);
              }
            })
            .catch((error) => {
              reject(error);
            });
        });
      } catch (error) {
        return Promise.reject(error);
      }
    },
    langs: Lang,
  };
})();

module.exports = linguee;
