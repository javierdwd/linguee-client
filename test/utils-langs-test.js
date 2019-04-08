const assert = require("assert");
const langs = require("../lib/utils/langs");

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
});
