import { load as CheerioLoad } from 'cheerio';

export type ExtractorContent = ReturnType<typeof CheerioLoad> & {
  cheerio?: string; // attribute located in __proto__
};

export type ExtractorStorage = Record<string, unknown>;

export function isExtractorStorage(
  storage: unknown | ExtractorStorage
): storage is ExtractorStorage {
  return storage instanceof Object;
}

export function CreateExtratorContent(elem: unknown): ExtractorContent {
  return CheerioLoad(elem);
}

export class Extractor {
  storage: ExtractorStorage = {};
  content: ExtractorContent | null = null;
  extractors: Record<string, Extractor>;

  constructor(extractors = {}) {
    this.extractors = extractors;
  }
  _setContent(content: ExtractorContent) {
    if (content.cheerio === '[cheerio object]') {
      this.content = content;
    } else {
      throw new TypeError('The content must be a cheerio instance');
    }
  }
  _setStorageDefaults() {
    // Implements in the child class.
    // Previous values of storage will be replaced.
  }
  _extract() {
    // Implements in the child class.
  }
  _setStorage(storage: ExtractorStorage) {
    if (typeof storage !== 'object') {
      throw new TypeError('Invalid storage');
    }

    this.storage = storage;

    this._setStorageDefaults();
  }
  run(content: ExtractorContent, storage: ExtractorStorage) {
    this._setContent(content);
    this._setStorage(storage || {});

    this._extract();

    return this.storage;
  }
  getObject(storageProperty: string): ExtractorStorage {
    let storageObject = this.storage[storageProperty];

    if (storageObject && isExtractorStorage(storageObject)) {
      return storageObject;
    }

    const newStorage: ExtractorStorage = {};

    this.storage[storageProperty] = newStorage;

    return newStorage;
  }
}

export default Extractor;
