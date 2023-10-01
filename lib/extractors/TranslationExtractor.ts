import Extractor, {
  ExtractorContent,
  ExtractorStorage,
  RunableExtractor,
} from './Extractor';

export interface TranslationExtractorStorage extends ExtractorStorage {
  term: string;
  type: string;
  examples: Array<{
    phrase: string;
    translation: string;
  }>;
}

export class TranslationExtractor
  extends Extractor
  implements RunableExtractor<TranslationExtractorStorage>
{
  constructor(extractors = {}) {
    super(extractors);
  }
  createExtratorStorage(): TranslationExtractorStorage {
    return {
      term: '',
      type: '',
      examples: [],
    };
  }

  run(content: ExtractorContent) {
    const storage = this.createExtratorStorage();
    const $descriptionWrapper = content.find('.translation_desc');

    storage.term = $descriptionWrapper.find('a.dictLink').text();

    const $type = $descriptionWrapper.find('.tag_type');
    if ($type.length) {
      storage.type = $type.attr('title') || '';
    }

    const $examplesWrapper = content.find('.example_lines');
    if ($examplesWrapper.length) {
      const $examples = $examplesWrapper.children('.example');

      for (let i = 0; i < $examples.length; i++) {
        storage.examples.push({
          phrase: $examples.eq(i).find('.tag_s').text(),
          translation: $examples.eq(i).find('.tag_t').text(),
        });
      }
    }

    return storage;
  }
}

export default TranslationExtractor;
