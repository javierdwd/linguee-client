import * as Cheerio from 'cheerio';
import axios from 'axios';
import iconv from 'iconv-lite';
import Lang, { LangCode } from './utils/Lang';
import Endpoint from './utils/Endpoint';
import ExtractorsFactory from './extractors/ExtractorsFactory';
import LingueeExtractor from './extractors/LingueeExtractor';

const linguee = {
  translate(term: string, fromLang: LangCode, toLang: LangCode) {
    try {
      const url = Endpoint.createSearchUrl(term, fromLang, toLang);

      return new Promise((resolve, reject) => {
        axios
          .get(url, { responseType: 'arraybuffer' })
          .then((response) => {
            const responseCharset = response.headers['content-type'].match(
              /.+charset="(?<charset>.*)"$/
            )?.groups?.charset;

            if (!responseCharset) {
              throw new Error('Unrecognazied service response charset.');
            }

            const data = iconv.decode(
              Buffer.from(response.data),
              iconv.encodingExists(responseCharset) ? responseCharset : 'utf-8'
            );

            try {
              const extractor =
                ExtractorsFactory.create<LingueeExtractor>('linguee');
              const $ = Cheerio.load(
                `<div id="extractor-wrapper">${data}</div>`
              );

              const result = extractor.run($('#extractor-wrapper'));

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
};

export default linguee;
