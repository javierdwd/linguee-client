const assert = require('assert');
const Endpoint = require('../dist/cjs/utils/Endpoint').default;

describe('utils/endpoint', () => {
  it('should return the endpoint domain', () => {
    assert.strictEqual(Endpoint.getDomain(), 'https://www.linguee.com/');
  });

  it('should prevents usage with an empty term', () => {
    assert.throws(() => {
      Endpoint.createSearchUrl();
    }, /Empty/);
  });

  it('should create a well formed search Url', () => {
    assert.strictEqual(
      Endpoint.createSearchUrl('door', 'EN', 'ES'),
      'https://www.linguee.com/english-spanish/search/search?source=auto&ajax=1&query=door'
    );

    assert.strictEqual(
      Endpoint.createSearchUrl('donkey kong', 'EN', 'ES'),
      'https://www.linguee.com/english-spanish/search/search?source=auto&ajax=1&query=donkey+kong'
    );

    assert.strictEqual(
      Endpoint.createSearchUrl('veröffentlichen', 'german', 'french'),
      'https://www.linguee.com/german-french/search/search?source=auto&ajax=1&query=ver%C3%B6ffentlichen'
    );
  });
});
