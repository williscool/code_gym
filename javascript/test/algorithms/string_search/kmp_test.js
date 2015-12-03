var assert = require('assert');
var kmp = require('../../../algorithms/string_search/kmp.js');

describe('KMP String Search', function() {
  it('works with empty strings', function() {
    assert.deepEqual ( kmp("", "") , [] );
    assert.deepEqual ( kmp("", "dfas") , [] );
  });
  it('works non empty strings', function() {
    assert.deepEqual ( kmp("GEEKS FOR GEEKS", "GEEK") , [0,10] );
    assert.deepEqual ( kmp("AABAACAADAABAAABAA", "AABA") , [0,9,13] );
  });
});
