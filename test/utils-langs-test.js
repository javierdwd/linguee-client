const assert = require("assert");
const Lang = require("../dist/utils/Lang").default;

describe("utils/Lang", () => {
  it("should return an Object with 25 languages and a list of isolated codes", () => {
    assert.strictEqual(Lang.available().length, 25);
  });

  it("should return a language option object", () => {
    assert.deepStrictEqual(Lang.get("fr"), {
      code: "FR",
      name: "french"
    });

    assert.deepStrictEqual(Lang.get("estonian"), {
      code: "ET",
      name: "estonian"
    });
  });

  it("should return the available languages for a specified code", () => {
    assert.deepStrictEqual(Lang.available("RU"), ["EN"]);

    // prettier-ignore
    assert.deepStrictEqual(Lang.available("portuguese"), [
      "EN", "DE", "FR", "ES", "IT",
      "NL", "PL", "SV", "DA", "FI",
      "EL", "CS", "RO", "HU", "SK",
      "BG", "SL", "LT", "LV", "ET",
      "MT"]);
  });
});
