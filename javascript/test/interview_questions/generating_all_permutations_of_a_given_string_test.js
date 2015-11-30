var assert = require('assert');
var stringPermutationsFns = require('../../interview_questions/generating_all_permutations_of_a_given_string.js');

Object.keys(stringPermutationsFns).forEach(function(key) {
  var stringPermutations = stringPermutationsFns[key];
  describe(key + ' String Permuations Words Question', function() {
    it('prints permutations of all characters of a string', function() {
      assert.deepEqual ( stringPermutations("cat") , [ 'cat', 'cta', 'act', 'atc', 'tca', 'tac' ] );
    });
    it('prints permutations of k characters of a string', function() {
      assert.deepEqual ( stringPermutations("cat", 2) , [ 'ca', 'ct', 'ac', 'at', 'tc', 'ta' ] );
    });
  });
});
