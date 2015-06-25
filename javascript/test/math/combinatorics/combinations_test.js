// inspired by https://github.com/josdejong/mathjs/blob/master/test/function/probability/combinations.test.js
var assert = require('assert');
var combo = require('../../../math/combinatorics/combinations.js');
describe("Combinations",function(){
  it("shoiuld calculate the combinations of a number n choosing k subsets at a time", function(){
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
