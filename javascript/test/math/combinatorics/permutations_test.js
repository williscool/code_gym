// inspired by https://github.com/josdejong/mathjs/blob/master/test/function/probability/permutation.test.js
var assert = require('assert');
var permutations = require('../../../math/combinatorics/permutations.js');
describe("Permutations",function(){
  it("should calculate the combinations of a number", function(){
    assert.equal(permutations(0), 1);
    assert.equal(permutations(1), 1);
    assert.equal(permutations(2), 2);
    assert.equal(permutations(3), 6);
    assert.equal(permutations(4), 24);
    assert.equal(permutations(5), 120);
  });
  it("should calculate the combinations of a number n choosing k at a time", function(){
    assert.equal(permutations(5,3), 60);
    assert.equal(permutations(5,4), 120);
    assert.equal(permutations(9,8), 362880);
    assert.equal(permutations(7,5), 2520);
  });
});
