const TranslationExtractor = require("./TranslationExtractor");
const WordExtractor = require("./WordExtractor");
const LingueeExtractor = require("./LingueeExtractor");

const ucFirst = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

class ExtractorsFactory {
  static create(type) {
    let _create = `_create${ucFirst(type)}Extractor`;

    if (ExtractorsFactory.hasOwnProperty(_create)) {
      return ExtractorsFactory[_create].call();
    }

    throw new Error("Invalid Extractor");
  }
  static _createLingueeExtractor() {
    return new LingueeExtractor({
      word: ExtractorsFactory.create("word")
    });
  }
  static _createWordExtractor() {
    return new WordExtractor({
      translation: ExtractorsFactory.create("translation")
    });
  }
  static _createTranslationExtractor() {
    return new TranslationExtractor();
  }
}

module.exports = ExtractorsFactory;
