var assert = require('assert');
var boyerMoore = require('../../../algorithms/string_search/boyer_moore.js');

describe('KMP String Search', function() {
  it('works with empty strings', function() {
    // boyerMoore more is special in that it calculating the bad char arr of an empty string will find it returning 0 for another empty string lol
    // dont know if I should handle as special case or if that is intended behavior
    //
    // leaving for for notes
    assert.deepEqual ( boyerMoore("", "") , [0] ); 
    assert.deepEqual ( boyerMoore("", "dfas") , [] );
  });
  it('works non empty strings', function() {
    assert.deepEqual ( boyerMoore("GEEKS FOR GEEKS", "GEEK") , [0,10] );
    assert.deepEqual ( boyerMoore("AABAACAADAABAAABAA", "AABA") , [0,9,13] );
  });
});
