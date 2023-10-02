import AudioExtractor from './AudioExtractor';
import TranslationExtractor from './TranslationExtractor';
import WikiExtractor from './WikiExtractor';
import WordExtractor from './WordExtractor';
import LingueeExtractor from './LingueeExtractor';

const ucFirst = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export class ExtractorsFactory {
  static create<T>(type: string): T {
    let _creatorFunctionName: string = `_create${ucFirst(type)}Extractor`;

    if (Reflect.has(ExtractorsFactory, _creatorFunctionName)) {
      const creatorFunction = Reflect.get(
        ExtractorsFactory,
        _creatorFunctionName
      );

      return creatorFunction();
    }

    throw new Error('Invalid Extractor');
  }
  static _createLingueeExtractor() {
    return new LingueeExtractor({
      word: ExtractorsFactory.create<WordExtractor>('word'),
      wiki: ExtractorsFactory.create<WikiExtractor>('wiki'),
    });
  }
  static _createWordExtractor() {
    return new WordExtractor({
      translation:
        ExtractorsFactory.create<TranslationExtractor>('translation'),
      audio: ExtractorsFactory.create<AudioExtractor>('audio'),
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

export default ExtractorsFactory;
