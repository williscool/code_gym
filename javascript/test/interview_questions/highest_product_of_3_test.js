var assert = require('assert');
var highestProductOfThree = require('../../interview_questions/highest_product_of_3.js');

describe('Highest Product Of Three  Question', function() {
  it('should work', function() {
    assert.equal ( highestProductOfThree([1,10,-5,1,-100]), 5000);
  });
});
