import * as Cheerio from 'cheerio';

export type ExtractorContent = Cheerio.Cheerio<Cheerio.Document> & {
  cheerio?: string; // attribute localized in __proto__
};

export type ExtractorStorage = Record<string, unknown>;

export function isExtractorStorage(
  storage: unknown | ExtractorStorage
): storage is ExtractorStorage {
  return storage instanceof Object;
}

export function createExtractorContent(
  elem: Parameters<typeof Cheerio.load>[0]
): ExtractorContent {
  return Cheerio.load(elem).root();
}

export interface RunableExtractor<E> {
  run(content: ExtractorContent): E | void;
  createExtratorStorage(): E;
}

export type NullableStorage<E extends ExtractorStorage> = E & {
  hasContent: boolean;
};

export class Extractor {
  protected extractors: Record<string, RunableExtractor<unknown>>; // Must be declared in the child Extractor implementation

  constructor(extractors = {}) {
    this.extractors = extractors;
  }

  protected validateContent(content: ExtractorContent): boolean {
    if (content.cheerio !== '[cheerio object]') {
      throw new TypeError('The content must be a cheerio instance');
    }

    return true;
  }
}

export default Extractor;
