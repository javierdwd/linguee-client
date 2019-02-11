const Extractor = require("./Extractor");

class LingueeExtractor extends Extractor {
  constructor(extractors = {}) {
    super(extractors);
  }
  _setStorageDefaults() {
    this.storage.noResults = false;
    this.storage.queryTerm = null;
    this.storage.words = [];
  }
  _extract() {
    const queryTerm = this.content.find("#data").attr("data-query");
    const _self = this;

    if (!queryTerm) {
      throw new Error("Query term not found");
    }

    this.storage.queryTerm = queryTerm;

    if (this.content.find("h1.noresults").length) {
      this.storage.noResults = true;

      return;
    }

    // Exact Translations.
    const $exactContainer = this.content.find(".exact");

    if ($exactContainer.length) {
      const $words = $exactContainer.children(".lemma");

      for (let i = 0; i < $words.length; i++) {
        this.storage.words.push(this.extractors.word.run($words.eq(i), {}));
      }
    }
  }
}

module.exports = LingueeExtractor;
