import type {
  ExtractorContent,
  ExtractorStorage,
  RunableExtractor,
} from './Extractor';

import Extractor, { createExtractorContent } from './Extractor';

import type { TranslationExtractorStorage } from './TranslationExtractor';
import type { AudioExtractorStorage } from './AudioExtractor';

export interface WordExtractorAdditionalInfoStorage extends ExtractorStorage {
  plural: string;
  verbs: string[];
  context: string;
}

export interface WordExtractorStorage extends ExtractorStorage {
  term: string;
  type: string;
  additionalInfo: WordExtractorAdditionalInfoStorage | null;
  translations: TranslationExtractorStorage[];
  uncommonTranslations: TranslationExtractorStorage[];
  audio: AudioExtractorStorage[];
}

export class WordExtractor
  extends Extractor
  implements RunableExtractor<WordExtractorStorage>
{
  constructor(extractors = {}) {
    super(extractors);
  }

  createExtratorStorage(): WordExtractorStorage {
    return {
      term: '',
      type: '',
      additionalInfo: null,
      translations: [],
      uncommonTranslations: [],
      audio: [],
    };
  }

  createAdditionalInfoStorage(): WordExtractorAdditionalInfoStorage {
    return {
      verbs: [],
      plural: '',
      context: '',
    };
  }

  run(content: ExtractorContent): WordExtractorStorage {
    const storage = this.createExtratorStorage();

    const $descriptionWrapper = content.find('.lemma_desc');
    storage.term = $descriptionWrapper.find('a.dictLink').text();

    const $audio = $descriptionWrapper.find('a.audio');
    if ($audio.length) {
      // TODO: Remove type enforcement requirement.
      const audio = this.extractors.audio.run($audio) as AudioExtractorStorage;

      if (audio) {
        storage.audio.push(audio);
      }
    }

    const $wordType = $descriptionWrapper.find('.tag_wordtype');
    if ($wordType.length) {
      storage.type = $wordType.text();
    } else if ($descriptionWrapper.find('.tag_type').length) {
      storage.type = $descriptionWrapper.find('.tag_type').text();
    }

    const $formsPlural = $descriptionWrapper.find('.forms_plural');
    const additionalInfo = this.createAdditionalInfoStorage();
    let joinAdditionalInfo = false;

    if ($formsPlural.length) {
      joinAdditionalInfo = true;
      additionalInfo.plural = $formsPlural.find('.formLink').text().trim();
    }

    const $formsVerbs = $descriptionWrapper.find('.forms_verb');
    if ($formsVerbs.length) {
      joinAdditionalInfo = true;

      $formsVerbs.find('.tag_s .formLink').each((_, elem) => {
        additionalInfo.verbs.push(createExtractorContent(elem).text());
      });
    }

    const $context = $descriptionWrapper.find('.tag_lemma_context');
    if ($context.length) {
      joinAdditionalInfo = true;
      additionalInfo.context = $context.find('.placeholder').text().trim();
    }

    const $translationsLines = content.find('.translation_lines');

    if (joinAdditionalInfo) {
      storage.additionalInfo = additionalInfo;
    }

    (() => {
      const $translations = $translationsLines.find('> .translation');
      if ($translations.length) {
        for (let i = 0; i < $translations.length; i++) {
          // TODO: Remove type enforcement requirement.
          const translation = this.extractors.translation.run(
            $translations.eq(i)
          ) as TranslationExtractorStorage;

          storage.translations.push(translation);
        }
      }
    })();

    (() => {
      const $translationsGroup = $translationsLines.find('.translation_group');

      for (let i = 0; i < $translationsGroup.length; i++) {
        const $uncommon = $translationsGroup.eq(i).find('.notascommon');
        const $translations = $translationsGroup.eq(i).find('.translation');

        for (let j = 0; j < $translations.length; j++) {
          // TODO: Remove type enforcement requirement.
          const translation = this.extractors.translation.run(
            $translations.eq(j)
          ) as TranslationExtractorStorage;

          if (!$uncommon.length) {
            storage.translations.push(translation);
          } else {
            storage.uncommonTranslations.push(translation);
          }
        }
      }
    })();

    return storage;
  }
}

export default WordExtractor;
