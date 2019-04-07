const querystring = require("querystring");
const Extractor = require("./Extractor");

class LingueeExtractor extends Extractor {
  constructor(extractors = {}) {
    super(extractors);
  }
  _setStorageDefaults() {
    this.storage.noResults = false;
    this.storage.queryTerm = null;
    this.storage.words = [];
    this.storage.inexactWords = [];
    this.storage.wiki = null;
    this.storage.spelling = null;
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

    // Exact Words.
    const $exactContainer = this.content.find(".exact");

    if ($exactContainer.length) {
      const $words = $exactContainer.children(".lemma");

      for (let i = 0; i < $words.length; i++) {
        this.storage.words.push(this.extractors.word.run($words.eq(i), {}));
      }
    }

    // Inexact Words.
    const $inexactContainer = this.content.find(".inexact");

    if ($inexactContainer.length) {
      const $words = $inexactContainer.children(".lemma");

      for (let i = 0; i < $words.length; i++) {
        this.storage.inexactWords.push(
          this.extractors.word.run($words.eq(i), {})
        );
      }
    }

    // Wikipedia.
    const $wiki = this.content.find("#wikipedia-body");

    if ($wiki.length) {
      this.storage.wiki = this.extractors.wiki.run($wiki);
    }

    // Spelling suggestion
    const $spelling = this.content.find("h1.didyoumean");

    if ($spelling.length) {
      const suggestion = {};
      const spellingHref = $spelling.children("a").attr("href");
      const spellingQuery = querystring.parse(
        spellingHref.slice(spellingHref.indexOf("?") + 1)
      );

      suggestion.term = $spelling.find(".corrected").text();
      suggestion.queryTerm = spellingQuery.query;
      suggestion.querySource = spellingQuery.source;

      this.storage.spelling = suggestion;
    }
  }
}

module.exports = LingueeExtractor;
