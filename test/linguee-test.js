const assert = require("assert");
const linguee = require("../lib/linguee");

describe("Linguee", () => {
  describe("createUrl()", () => {
    it("should prevents usage with an empty term", () => {
      assert.throws(linguee.createUrl, /Empty/);
    });

    it("should return a fulfilled translation URL", () => {
      assert.deepStrictEqual(
        linguee.createUrl("hello", "english", "spanish"),
        "https://www.linguee.com/english-spanish/search/search?source=auto&ajax=1&query=hello"
      );
    });
  });

  describe.skip("translate()", function() {
    this.timeout(4000);

    it("should translate hello from english to spanish (hola)", async () => {
      const translation = await linguee.translate(
        "hello",
        "english",
        "spanish"
      );
      assert.deepStrictEqual(translation.words[0].translations[0].term, "hola");
    });
  });
});
