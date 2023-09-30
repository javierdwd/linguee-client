const AudioExtractor = require('./AudioExtractor').default;
const TranslationExtractor = require('./TranslationExtractor').default;
const WikiExtractor = require('./WikiExtractor').default;
const WordExtractor = require('./WordExtractor').default;
const LingueeExtractor = require('./LingueeExtractor').default;

const ucFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

class ExtractorsFactory {
  static create(type) {
    let _create = `_create${ucFirst(type)}Extractor`;

    if (ExtractorsFactory.hasOwnProperty(_create)) {
      return ExtractorsFactory[_create].call();
    }

    throw new Error('Invalid Extractor');
  }
  static _createLingueeExtractor() {
    return new LingueeExtractor({
      word: ExtractorsFactory.create('word'),
      wiki: ExtractorsFactory.create('wiki'),
    });
  }
  static _createWordExtractor() {
    return new WordExtractor({
      translation: ExtractorsFactory.create('translation'),
      audio: ExtractorsFactory.create('audio'),
    });
  }
  static _createWikiExtractor() {
    return new WikiExtractor();
  }
  static _createTranslationExtractor() {
    return new TranslationExtractor();
  }
  static _createAudioExtractor() {
    return new AudioExtractor();
  }
}

module.exports = ExtractorsFactory;
