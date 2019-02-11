const Extractor = require("./Extractor");

class WordExtractor extends Extractor {
  constructor(extractors = {}) {
    super(extractors);
  }
  _setStorageDefaults() {
    this.storage.term = "";
    this.storage.type = "";
    this.storage.translations = [];
  }
  _extract() {
    const $descriptionWrapper = this.content.find(".lemma_desc");

    this.storage.term = $descriptionWrapper.find("a.dictLink").text();

    const $wordType = $descriptionWrapper.find(".tag_wordtype");
    if ($wordType.length) {
      this.storage.type = $wordType.text();
    }

    const $translations = this.content.find(".translation.featured");
    if ($translations.length) {
      for (let i = 0; i < $translations.length; i++) {
        let t = this.extractors.translation.run($translations.eq(i));

        this.storage.translations.push(t);
      }
    }
  }
}

module.exports = WordExtractor;
