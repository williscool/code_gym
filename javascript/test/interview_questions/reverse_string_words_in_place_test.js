var assert = require('assert');
var reverseWordsInPlace = require('../../interview_questions/reverse_string_words_in_place.js');

describe('Reverse Words Question', function() {
  it('works', function() {
    assert.deepEqual ( reverseWordsInPlace("find you will pain only go you recordings security the into if") , "if into the security recordings you go only pain will you find" );
  });
});
