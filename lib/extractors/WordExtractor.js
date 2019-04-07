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
    this.storage.uncommonTranslations = [];
  }
  _extract() {
    const $descriptionWrapper = this.content.find(".lemma_desc");

    this.storage.term = $descriptionWrapper.find("a.dictLink").text();

    const $audio = $descriptionWrapper.find("a.audio");
    if ($audio.length) {
      this.extractors.audio.run($audio, this.storage);
    }

    const $wordType = $descriptionWrapper.find(".tag_wordtype");
    if ($wordType.length) {
      this.storage.type = $wordType.text();
    } else if ($descriptionWrapper.find(".tag_type").length) {
      this.storage.type = $descriptionWrapper.find(".tag_type").text();
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

    const $translationsLines = this.content.find(".translation_lines");

    (() => {
      const $translations = $translationsLines.find("> .translation");
      if ($translations.length) {
        for (let i = 0; i < $translations.length; i++) {
          let t = this.extractors.translation.run($translations.eq(i));

          this.storage.translations.push(t);
        }
      }
    })();

    (() => {
      const $translationsGroup = $translationsLines.find(".translation_group");

      for (let i = 0; i < $translationsGroup.length; i++) {
        const $uncommon = $translationsGroup.eq(i).find(".notascommon");
        const storageProp = $uncommon.length
          ? "uncommonTranslations"
          : "translations";
        const $translations = $translationsGroup.eq(i).find(".translation");

        for (let j = 0; j < $translations.length; j++) {
          let t = this.extractors.translation.run($translations.eq(j));

          this.storage[storageProp].push(t);
        }
      }
    })();
  }
}

module.exports = WordExtractor;
