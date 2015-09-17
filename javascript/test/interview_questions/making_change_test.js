var assert = require('assert');
var naiveNumWays = require('../../interview_questions/making_change.js').naive;
var recursiveNumWays = require('../../interview_questions/making_change.js').recursive;
var iterativeNumWays = require('../../interview_questions/making_change.js').iterative;

describe("Making Change Question", function() {

  describe("Naive Recursive Solution", function() {
    it("amount=4 denominations=[1,2,3]", function() {
      var amount, values;

      amount = 4;
      denominations = [1,2,3];

      assert.equal(naiveNumWays(amount, denominations), 4);
    });
  });

  describe("Recursive Solution", function() {
    it("amount=4 denominations=[1,2,3]", function() {
      var amount, values;

      amount = 4;
      denominations = [1,2,3];

      assert.equal(recursiveNumWays(amount, denominations), 4);
    });
  });

  describe("Iterative Solution", function() {
    it("amount=4 denominations=[1,2,3]", function() {
      var amount, values;

      amount = 4;
      denominations = [1,2,3];

      assert.equal(iterativeNumWays(amount, denominations), 4);
    });
  });

});
