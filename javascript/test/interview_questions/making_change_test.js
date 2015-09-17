var assert = require('assert');
var naiveSubsetSum = require('../../interview_questions/making_change.js').naive;
var recursiveSubsetSum = require('../../interview_questions/making_change.js').recursive;
var iterativeSubsetSum = require('../../interview_questions/making_change.js').iterative;

describe("Making Change Question", function() {

  describe("Naive Recursive Solution", function() {
    it("amount=4 denominations=[1,2,3]", function() {
      var amount, values;

      amount = 4;
      denominations = [1,2,3];

      assert.equal(naiveSubsetSum(amount, denominations), 4);
    });
  });

  describe("Recursive Solution", function() {
    it("amount=4 denominations=[1,2,3]", function() {
      var amount, values;

      amount = 4;
      denominations = [1,2,3];

      assert.equal(recursiveSubsetSum(amount, denominations), 4);
    });
  });

  describe("Iterative Solution", function() {
    it("amount=4 denominations=[1,2,3]", function() {
      var amount, values;

      amount = 4;
      denominations = [1,2,3];

      assert.equal(iterativeSubsetSum(amount, denominations), 4);
    });
  });

});
