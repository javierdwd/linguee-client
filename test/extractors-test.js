const fs = require("fs");
const assert = require("assert");
const cheerio = require("cheerio");
const Extractor = require("../lib/extractors/Extractor");
const TranslationExtractor = require("../lib/extractors/TranslationExtractor");
const WordExtractor = require("../lib/extractors/WordExtractor");
const LingueeExtractor = require("../lib/extractors/LingueeExtractor");
const ExtractorsFactory = require("../lib/extractors/ExtractorsFactory");

const readExampleFile = file => {
  let fileContent = fs.readFileSync(`${__dirname}/examples/${file}.html`);
  return `<div id="extractor-wrapper">${fileContent}</div>`;
};

const readExampleJsFile = file => {
  return require("./examples/" + file);
};

describe("Base Extractor", () => {
  const extractor = new Extractor();

  it("should throw an exception if a string is passed as parameter to setStorage()", () => {
    assert.throws(() => {
      extractor._setStorage("An String");
    }, /Invalid storage/);
  });

  it("should throw an exception if anything other than an instance of Cherio is used as content", () => {
    assert.throws(() => {
      extractor.run({});
    }, /cheerio instance/);
  });

  it("should return an object", () => {
    const storage = {
      objectProperty: {
        childProperty: ""
      },
      nullProperty: null
    };

    extractor._setStorage(storage);

    assert.deepStrictEqual(extractor.getObject("nullProperty"), {});
    assert.deepStrictEqual(extractor.getObject("objectProperty"), {
      childProperty: ""
    });
  });
});

describe("Translation Extractor", () => {
  const extractor = ExtractorsFactory.create("translation");
  const storage = {};

  let htmlResponse = readExampleFile("term-EN-ES-answer");
  const $ = cheerio.load(htmlResponse);

  $translation = $(".exact .lemma")
    .eq(0)
    .find(".translation.featured")
    .eq(0);

  extractor.run($translation, storage);

  it('should translate correctly the word "answer"', () => {
    assert.deepStrictEqual(storage.term, "respuesta");
    assert.deepStrictEqual(
      storage.examples[0].phrase,
      "My teacher surely knows the answer."
    );
  });
});

describe("Word Extractor", () => {
  const extractor = ExtractorsFactory.create("word");

  const $ = cheerio.load(readExampleFile("term-EN-ES-answer"));
  const storage = extractor.run($(".exact .lemma").eq(1));

  const $2 = cheerio.load(readExampleFile("term-EN-ES-nation"));
  const storage2 = extractor.run($2(".exact .lemma").eq(0));

  it("should extract the basic data", () => {
    assert.strictEqual(storage.type, "verb");
    assert.strictEqual(storage.additionalInfo.context, "sb./sth.");
    assert.deepStrictEqual(storage.additionalInfo.verbs, [
      "answered",
      "answered"
    ]);
    assert.strictEqual(storage2.term, "nation");
    assert.strictEqual(storage2.additionalInfo.plural, "nations");
  });
});

describe("Linguee Extractor", () => {
  const extractor = ExtractorsFactory.create("linguee");
  let htmlResponse = "";
  let $ = null;

  context("Validate non-successful responses (fs) of Linguee.com", () => {
    let storageA = {};
    extractor._setStorage(storageA);

    it("should return null", () => {
      assert.deepStrictEqual(storageA.queryTerm, null, "(non default value)");
    });

    htmlResponse = readExampleFile("term-not-found");
    $ = cheerio.load(htmlResponse);

    let storageB = extractor.run($("#extractor-wrapper"));

    it("should set the noResult property to true", () => {
      assert.deepStrictEqual(storageB.noResults, true);
    });
  });

  context("Validate successful responses (fs) of Linguee.com", () => {
    it("the storage should contain exactly the same data", () => {
      htmlResponse = readExampleFile("term-EN-ES-answer");
      $ = cheerio.load(htmlResponse);

      const fileStorageC = readExampleJsFile("term-EN-ES-answer");
      let storageC = extractor.run($("#extractor-wrapper"));

      assert.deepStrictEqual(storageC, fileStorageC);
    });
  });
});

describe("Factory", () => {
  const extractor = ExtractorsFactory.create("linguee");

  it("should be an instance of the WordExtractor class", () => {
    assert.ok(extractor instanceof LingueeExtractor);
  });

  it("Should return an LingueeExtractor instance", () => {
    assert.ok(extractor.extractors.word instanceof WordExtractor);
  });

  it("Should return an TranslationExtractor instance", () => {
    assert.ok(
      extractor.extractors.word.extractors.translation instanceof
        TranslationExtractor
    );
  });
});
