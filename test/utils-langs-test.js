const assert = require("assert");
const langs = require("../dist/utils/langs");

describe("utils/langs", () => {
  it("should return an Object with 25 languages and a list of isolated codes", () => {
    assert.strictEqual(Object.entries(langs.list()).length, 25);
    assert.strictEqual(langs.codes().length, 25);
  });

  it("should return a language option object", () => {
    assert.deepStrictEqual(langs.get("fr"), {
      code: "FR",
      name: "french"
    });

    assert.deepStrictEqual(langs.get("estonian"), {
      code: "ET",
      name: "estonian"
    });
  });

  it("should return the available languages for a specified code", () => {
    assert.deepStrictEqual(langs.available("RU"), ["EN"]);

    // prettier-ignore
    assert.deepStrictEqual(langs.available("portuguese"), [
      "EN", "DE", "FR", "ES", "IT",
      "NL", "PL", "SV", "DA", "FI",
      "EL", "CS", "RO", "HU", "SK",
      "BG", "SL", "LT", "LV", "ET",
      "MT"]);
  });
});
