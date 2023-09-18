const Extractor = require('./Extractor').default;

class WikiExtractor extends Extractor {
  constructor(extractors = {}) {
    super(extractors);
  }
  _setStorageDefaults() {
    this.storage.abstracts = [];
    this.storage.legal = '';
  }
  _extract() {
    const $abstracts = this.content.children('.abstract');

    for (let i = 0; i < $abstracts.length; i++) {
      const $abstract = $abstracts.eq(i);

      this.storage.abstracts.push({
        term: $abstract.children('h2').text().replace(':', ''),
        sourceUrl: $abstract.find('.source_url a').attr('href'),
        content: $abstract.get(0).childNodes[1].data.trim(), // Text node.
      });
    }

    const $attribution = this.content.find('.attribution p');
    if ($attribution.length) {
      this.storage.legal = $attribution.text();
    }
  }
}

module.exports = WikiExtractor;
