const fs = require("fs");
const assert = require("assert");
const cheerio = require("cheerio");
const Extractor = require("../dist/extractors/Extractor");
const TranslationExtractor = require("../dist/extractors/TranslationExtractor");
const WordExtractor = require("../dist/extractors/WordExtractor");
const WikiExtractor = require("../dist/extractors/WikiExtractor");
const LingueeExtractor = require("../dist/extractors/LingueeExtractor");
const ExtractorsFactory = require("../dist/extractors/ExtractorsFactory");

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

describe("Audio Extractor", () => {
  const extractor = ExtractorsFactory.create("audio");
  const storage = {};

  let htmlResponse = readExampleFile("term-EN-ES-answer");
  const $ = cheerio.load(htmlResponse);

  $audio = $(".exact .lemma a.audio").eq(0);

  extractor.run($audio, storage);

  it("should extract audio(s) and return their Urls and version", () => {
    assert.strictEqual(storage.audios.length, 2);
    assert.strictEqual(
      storage.audios[0].url,
      "https://www.linguee.com/mp3/EN_US/a3/a363b8d13575101a0226e8d0d054f2e7-100.mp3"
    );
    assert.strictEqual(storage.audios[0].version, "American English");
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

  const $3 = cheerio.load(readExampleFile("term-EN-ES-war"));
  const storage3 = extractor.run($3(".exact .lemma").eq(0));
  const storage4 = extractor.run($3(".exact .lemma").eq(2));

  it("should find non featured and uncommon translations", () => {
    assert.strictEqual(storage3.uncommonTranslations.length, 1);
    assert.strictEqual(storage4.translations.length, 3);
  });
});

describe("Wiki Extractor", () => {
  const extractor = ExtractorsFactory.create("wiki");
  const storage = {};

  let htmlResponse = readExampleFile("term-EN-ES-sial");
  const $ = cheerio.load(htmlResponse);

  $wiki = $("#wikipedia-body");

  extractor.run($wiki, storage);

  it("should extract Wikipedia's provided information", () => {
    assert.ok(storage.legal);
    assert.strictEqual(storage.abstracts.length, 2);
  });

  it("should return the term along with a content and a reference url", () => {
    assert.strictEqual(storage.abstracts[0].term, "Sial");
    assert.doesNotThrow(() => {
      const regExp = /^https?:\/\/[a-z]{2}\.wikipedia\.org.*$/;

      if (regExp.test(storage.abstracts[0].sourceUrl) === false) {
        throw new Error("Invalid source Url");
      }
    });
  });
});

describe("Linguee Extractor", () => {
  const extractor = ExtractorsFactory.create("linguee");

  context("Test empty results", () => {
    let storageA = {};
    extractor._setStorage(storageA);

    it("QueryTerm should be null", () => {
      assert.deepStrictEqual(storageA.queryTerm, null, "(non default value)");
    });

    htmlResponse = readExampleFile("term-not-found");
    $ = cheerio.load(htmlResponse);

    let storageB = extractor.run($("#extractor-wrapper"));

    it("should set the noResult property to true", () => {
      assert.deepStrictEqual(storageB.noResults, true);
    });
  });

  context("Check the root resources founded", () => {
    htmlResponse = readExampleFile("term-EN-ES-nation");
    const $ = cheerio.load(htmlResponse);
    const storage = extractor.run($("#extractor-wrapper"));

    htmlResponse = readExampleFile("term-EN-ES-wherefores");
    const $2 = cheerio.load(htmlResponse);
    const storage2 = extractor.run($2("#extractor-wrapper"));

    it("should find exact and inexact words", () => {
      assert.strictEqual(storage.words.length, 2);
      assert.strictEqual(storage2.inexactWords.length, 1);
    });

    htmlResponse = readExampleFile("term-EN-ES-sial");
    const $3 = cheerio.load(htmlResponse);
    const storage3 = extractor.run($3("#extractor-wrapper"));

    it("should find wikipedia's articles briefs", () => {
      assert.strictEqual(storage3.wiki.abstracts.length, 2);
    });

    htmlResponse = readExampleFile("term-EN-ES-wherefore");
    const $4 = cheerio.load(htmlResponse);
    const storage4 = extractor.run($4("#extractor-wrapper"));

    it("should extract the spelling suggestion", () => {
      assert.strictEqual(storage4.spelling.term, "therefore");
      assert.strictEqual(storage4.spelling.queryTerm, "therefore");
      assert.strictEqual(storage4.spelling.querySource, "auto");
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
