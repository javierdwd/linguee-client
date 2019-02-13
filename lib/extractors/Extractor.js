cheerio = require("cheerio");

class Extractor {
  constructor(extractors = {}) {
    this.storage = null;
    this.content = null;
    this.extractors = extractors;
  }
  _setContent(content) {
    if (content instanceof cheerio) {
      this.content = content;
    } else {
      throw new TypeError("The content must be a cheerio instance");
    }
  }
  _setStorageDefaults() {
    // Implements in the child class.
    // Previous values of storage will be replaced.
  }
  _extract() {
    // Implements in the child class.
  }
  _setStorage(storage) {
    if (typeof storage !== "object") {
      throw new TypeError("Invalid storage");
    }

    this.storage = storage;

    this._setStorageDefaults();
  }
  run(content, storage) {
    this._setContent(content);
    this._setStorage(storage || {});

    this._extract();

    return this.storage;
  }
  getObject(storageProperty) {
    if (
      this.storage.hasOwnProperty(storageProperty) &&
      this.storage[storageProperty] instanceof Object
    ) {
      return this.storage[storageProperty];
    }
    this.storage[storageProperty] = {};

    return this.storage[storageProperty];
  }
}

module.exports = Extractor;
