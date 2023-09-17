const Extractor = require('./Extractor');

class TranslationExtractor extends Extractor {
  constructor(extractors = {}) {
    super(extractors);
  }
  _setStorageDefaults() {
    this.storage.term = '';
    this.storage.type = '';
    this.storage.examples = [];
  }
  _extract() {
    const $descriptionWrapper = this.content.find('.translation_desc');

    this.storage.term = $descriptionWrapper.find('a.dictLink').text();

    const $type = $descriptionWrapper.find('.tag_type');
    if ($type.length) {
      this.storage.type = $type.attr('title');
    }

    const $examplesWrapper = this.content.find('.example_lines');
    if ($examplesWrapper.length) {
      const $examples = $examplesWrapper.children('.example');

      for (let i = 0; i < $examples.length; i++) {
        this.storage.examples.push({
          phrase: $examples.eq(i).find('.tag_s').text(),
          translation: $examples.eq(i).find('.tag_t').text(),
        });
      }
    }
  }
}

module.exports = TranslationExtractor;
