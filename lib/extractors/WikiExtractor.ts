import type { ExtractorContent } from './Extractor';
import Extractor, { ExtractorStorage, RunableExtractor } from './Extractor';

export interface WikiExtractorStorage extends ExtractorStorage {
  legal: string;
  abstracts: Array<{
    term: string;
    sourceUrl?: string;
    content: string;
  }>;
}

export class WikiExtractor
  extends Extractor<WikiExtractorStorage>
  implements RunableExtractor<WikiExtractorStorage>
{
  constructor(extractors = {}) {
    super(extractors);
  }

  createExtratorStorage(): WikiExtractorStorage {
    return {
      legal: '',
      abstracts: [],
    };
  }

  run(content: ExtractorContent): WikiExtractorStorage {
    const storage = this.createExtratorStorage();
    const $abstracts = content.children('.abstract');

    for (let i = 0; i < $abstracts.length; i++) {
      const $abstract = $abstracts.eq(i);

      storage.abstracts.push({
        term: $abstract.children('h2').text().replace(':', ''),
        sourceUrl: $abstract.find('.source_url a').attr('href'),
        // content: $abstract.get(0).childNodes[1].data.trim(), // Text node.
        content: '', // TODO: IMPORTANT! Fix typing and restore the commented code.
      });
    }

    const $attribution = content.find('.attribution p');
    if ($attribution.length) {
      storage.legal = $attribution.text();
    }

    return storage;
  }
}

export default WikiExtractor;
