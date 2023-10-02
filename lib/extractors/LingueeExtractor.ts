import Extractor, {
  ExtractorContent,
  ExtractorStorage,
  RunableExtractor,
} from './Extractor';

import Lang, { LangCode } from '../utils/Lang';

import type { WordExtractor, WordExtractorStorage } from './WordExtractor';
import type { WikiExtractor, WikiExtractorStorage } from './WikiExtractor';

export interface SpellingExtractorStorage {
  term: string;
  queryTerm: string;
  querySource: string;
}

export interface LingueeExtractorStorage extends ExtractorStorage {
  queryTerm: string | null;
  words: WordExtractorStorage[];
  inexactWords: WordExtractorStorage[];
  wiki: WikiExtractorStorage | null;
  spelling: SpellingExtractorStorage | null;
  from: LangCode;
  to: LangCode;
}

export type LingueeExtractors = {
  word: WordExtractor;
  wiki: WikiExtractor;
};

export class LingueeExtractor
  extends Extractor
  implements RunableExtractor<LingueeExtractorStorage>
{
  declare extractors: LingueeExtractors;

  constructor(extractors: LingueeExtractors) {
    super(extractors);
  }

  createExtratorStorage(): LingueeExtractorStorage {
    return {
      queryTerm: null,
      words: [],
      inexactWords: [],
      wiki: null,
      spelling: null,
      from: '' as LangCode,
      to: '' as LangCode,
    };
  }

  run(content: ExtractorContent): LingueeExtractorStorage | void {
    const storage = this.createExtratorStorage();
    const queryTerm = content.find('#data').attr('data-query');

    if (!queryTerm) {
      throw new Error('Query term not found');
    }

    storage.queryTerm = queryTerm;

    if (content.find('h1.noresults').length) {
      return;
    }

    const sourceLang = content.find('#data').attr('data-sourcelang') || '';
    const targetLang = content.find('#data').attr('data-targetlang') || '';

    if (Lang.isLangCode(sourceLang)) {
      storage.from = sourceLang;
    } else {
      throw new Error('Error reading sourceLang code from response');
    }

    if (Lang.isLangCode(targetLang)) {
      storage.to = targetLang;
    } else {
      throw new Error('Error reading targetLang code from response');
    }

    // Exact Words.
    const $exactContainer = content.find('.exact');

    if ($exactContainer.length) {
      const $words = $exactContainer.children('.lemma');

      for (let i = 0; i < $words.length; i++) {
        const word = this.extractors.word.run($words.eq(i));

        storage.words.push(word);
      }
    }

    // Inexact Words.
    const $inexactContainer = content.find('.inexact');

    if ($inexactContainer.length) {
      const $words = $inexactContainer.children('.lemma');

      for (let i = 0; i < $words.length; i++) {
        const inexacWord = this.extractors.word.run(
          $words.eq(i)
        ) as WordExtractorStorage;

        storage.inexactWords.push(inexacWord);
      }
    }

    // Wikipedia.
    const $wiki = content.find('#wikipedia-body');

    if ($wiki.length) {
      storage.wiki = this.extractors.wiki.run($wiki) as WikiExtractorStorage;
    }

    // Spelling suggestion
    const $spelling = content.find('h1.didyoumean');

    if ($spelling.length) {
      const spellingHref = $spelling.children('a').attr('href');

      if (spellingHref) {
        try {
          const spellingQuery = new URLSearchParams(spellingHref.split('?')[1]);

          const suggestion: SpellingExtractorStorage = {
            term: $spelling.find('.corrected').text() || '',
            queryTerm: spellingQuery.get('query') || '',
            querySource: spellingQuery.get('source') || '',
          };

          if (suggestion.queryTerm && suggestion.querySource) {
            storage.spelling = suggestion;
          }
        } catch (error) {
          console.warn('Error parsing Term spelling suggestion URL');
        }
      }
    }

    return storage;
  }
}

export default LingueeExtractor;
