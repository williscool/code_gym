var assert = require('assert');
var naiveSS = require('../../../algorithms/string_search/naive_string_search.js');

describe('Naive String Search', function() {
  it('works with empty strings', function() {
    assert.deepEqual ( naiveSS("", "") , [] );
    assert.deepEqual ( naiveSS("", "dfas") , [] );
  });
  it('works non empty strings', function() {
    assert.deepEqual ( naiveSS("AABAACAADAABAAABAA", "AABA") , [0,9,13] );
  });
});
