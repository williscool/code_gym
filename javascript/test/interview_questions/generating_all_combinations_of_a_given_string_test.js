var assert = require('assert');
var stringCombinationsFns = require('../../interview_questions/generating_all_combinations_of_a_given_string.js');

Object.keys(stringCombinationsFns).forEach(function(key) {
  var stringCombinations = stringCombinationsFns[key];
  describe(key + ' Combinations of a String', function() {
    it('prints combinations of all characters of a string', function() {
      assert.deepEqual ( stringCombinations("abc") , [ '', 'a', 'ab', 'abc', 'ac', 'b', 'bc', 'c' ] );
    });
    // it('prints combinations of size k characters of a string', function() {
    //   assert.deepEqual ( stringCombinations("abc", 2) , [ '', 'a', 'ab', 'ab', 'ac', 'b', 'bc', 'c' ] );
    // });
  });
});
