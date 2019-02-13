const Extractor = require("./Extractor");

class WordExtractor extends Extractor {
  constructor(extractors = {}) {
    super(extractors);
  }
  _setStorageDefaults() {
    this.storage.term = "";
    this.storage.type = "";
    this.storage.additionalInfo = null;
    this.storage.translations = [];
  }
  _extract() {
    const $descriptionWrapper = this.content.find(".lemma_desc");

    this.storage.term = $descriptionWrapper.find("a.dictLink").text();

    const $wordType = $descriptionWrapper.find(".tag_wordtype");
    if ($wordType.length) {
      this.storage.type = $wordType.text();
    }

    const $formsPlural = $descriptionWrapper.find(".forms_plural");
    if ($formsPlural.length) {
      this.getObject("additionalInfo").plural = $formsPlural
        .find(".formLink")
        .text()
        .trim();
    }

    const $formsVerbs = $descriptionWrapper.find(".forms_verb");
    if ($formsVerbs.length) {
      const verbs = (this.getObject("additionalInfo").verbs = []);

      $formsVerbs.find(".tag_s .formLink").each((i, elem) => {
        verbs[i] = this.$(elem).text();
      });
    }

    const $context = $descriptionWrapper.find(".tag_lemma_context");
    if ($context.length) {
      this.getObject("additionalInfo").context = $context
        .find(".placeholder")
        .text()
        .trim();
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
