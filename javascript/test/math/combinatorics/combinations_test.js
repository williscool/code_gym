// inspired by https://github.com/josdejong/mathjs/blob/master/test/function/probability/combinations.test.js
var assert = require('assert');
var combo = require('../../../math/combinatorics/combinations.js').without_repetition;
describe("Combinations",function(){
  it("should calculate the combinations of a number n choosing k subsets at a time", function(){
    assert.equal(combo(0,0), 1);
    assert.equal(combo(7,0), 0);
    assert.equal(combo(16,1), 16);
    assert.equal(combo(7,5), 21);
    assert.equal(combo(20,15), 15504);
    assert.equal(combo(63,7), 553270671);
    assert.equal(combo(25,6), 177100);
    assert.equal(combo(10,5), 252);
  });
});

var combo_with_repetition = require('../../../math/combinatorics/combinations.js').with_repetition;

describe("Combinations with Repetition",function(){
  it("should calculate the combinations of a number n choosing k subsets at a time with repetition", function(){
    // http://www.mathsisfun.com/combinatorics/combinations-permutations-calculator.html
    assert.equal(combo_with_repetition(0,0), 1);
    assert.equal(combo_with_repetition(7,0), 0);
    assert.equal(combo_with_repetition(16,1), 16);
    assert.equal(combo_with_repetition(5,3), 35);
    assert.equal(combo_with_repetition(7,5), 462);
  });
});
