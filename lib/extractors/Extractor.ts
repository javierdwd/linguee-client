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

export function CreateExtratorContent(elem: unknown): ExtractorContent {
  return Cheerio.load(elem).root();
}

export interface RunableExtractor<E> {
  run(content: ExtractorContent): E | void;
  createExtratorStorage(): E;
}

export type NullableStorage<E extends ExtractorStorage> = E & {
  hasContent: boolean;
};

export class Extractor<E = ExtractorStorage> {
  protected extractors: Record<string, RunableExtractor<E>>;

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
