var assert = require('assert');
var whichAppearsTwice = require('../../interview_questions/which_appears_once.js');

describe('Which Appears Once Question', function() {
  it('works', function() {
     assert.equal(whichAppearsTwice([1,2,2,3,3,4,4,6,6,7,7,8,8,9,9]), 1);
     assert.equal(whichAppearsTwice([5,5,2,2,3,3,4,1,4,1,6,7,7,8,8,9,9]), 6);
  });
});
