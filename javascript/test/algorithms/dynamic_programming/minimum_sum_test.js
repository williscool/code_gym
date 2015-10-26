var assert = require('assert');
var MinSum = require('../../../algorithms/dynamic_programming/minimum_sum.js');

describe("Minimum Sum", function() {
  it("works", function() {
    assert.equal(MinSum([1,2,5], 11), 3);
    assert.equal(MinSum([9, 6, 5, 1], 11), 2);
  });
});
