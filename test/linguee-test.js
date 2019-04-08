const assert = require("assert");
const linguee = require("../lib/linguee");

describe("Linguee", () => {
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
