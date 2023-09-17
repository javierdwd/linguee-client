const assert = require('assert');
const endpoint = require('../dist/utils/endpoint');

describe('utils/endpoint', () => {
  it('should return the endpoint domain', () => {
    assert.strictEqual(endpoint.getDomain(), 'https://www.linguee.com/');
  });

  it('should prevents usage with an empty term', () => {
    assert.throws(() => {
      endpoint.createSearchUrl();
    }, /Empty/);
  });

  it('should create a well formed search Url', () => {
    assert.strictEqual(
      endpoint.createSearchUrl('door', 'EN', 'ES'),
      'https://www.linguee.com/english-spanish/search/search?source=auto&ajax=1&query=door',
    );

    assert.strictEqual(
      endpoint.createSearchUrl('donkey kong', 'EN', 'ES'),
      'https://www.linguee.com/english-spanish/search/search?source=auto&ajax=1&query=donkey%20kong',
    );

    assert.strictEqual(
      endpoint.createSearchUrl('veröffentlichen', 'german', 'french'),
      'https://www.linguee.com/german-french/search/search?source=auto&ajax=1&query=ver%C3%B6ffentlichen',
    );
  });
});
