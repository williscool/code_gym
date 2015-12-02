var assert = require('assert');
var rabinKarp = require('../../../algorithms/string_search/rabin_karp.js');

describe('Rabin Karp String Search', function() {
  it('works with empty strings', function() {
    assert.deepEqual ( rabinKarp("", "") , [] );
    assert.deepEqual ( rabinKarp("", "dfas") , [] );
  });
  it('works non empty strings', function() {
    assert.deepEqual ( rabinKarp("GEEKS FOR GEEKS", "GEEK") , [0,10] );
    assert.deepEqual ( rabinKarp("AABAACAADAABAAABAA", "AABA") , [0,9,13] );
  });
});
