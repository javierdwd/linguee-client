const assert = require('assert');
const linguee = require('../dist/cjs/linguee');

describe('Linguee', function () {
  // Catch integration errors in CI server  by default.
  const conditionalTestRunner = process.env.CI ? describe : describe.skip;

  conditionalTestRunner('translate()', function () {
    this.timeout(5000);

    it('should translate hello from english to spanish (hola)', async () => {
      const translation = await linguee.translate(
        'hello',
        'english',
        'spanish'
      );
      assert.deepStrictEqual(translation.words[0].translations[0].term, 'hola');
    });

    it('should translate song from english to spanish (canción)', async () => {
      const translation = await linguee.translate('song', 'english', 'spanish');
      assert.deepStrictEqual(
        translation.words[0].translations[0].term,
        'canción'
      );
    });

    it('should translate hello from english to russian (привет)', async () => {
      const translation = await linguee.translate(
        'hello',
        'english',
        'russian'
      );
      assert.deepStrictEqual(
        translation.words[0].translations[0].term,
        'привет!'
      );
    });
  });
});
