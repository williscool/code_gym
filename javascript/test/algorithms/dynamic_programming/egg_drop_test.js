var assert = require('assert');
var naiveEggDrop = require('../../../algorithms/dynamic_programming/egg_drop.js').naive;
var dpEggDrop = require('../../../algorithms/dynamic_programming/egg_drop.js').dp;

describe("Egg Drop Problem", function() {
  describe("Naive Solution", function() {
    it("2 eggs 6 floors", function() {
      assert.equal(naiveEggDrop(2, 6), 3);
    });
    it("2 eggs 10 floors", function() {
      assert.equal(naiveEggDrop(2, 10), 4);
    });
  });

  describe("Dynamic Programming Solution", function() {
    it("2 eggs 6 floors", function() {
      assert.equal(dpEggDrop(2, 6), 3);
    });
    it("2 eggs 10 floors", function() {
      assert.equal(dpEggDrop(2, 10), 4);
    });
    it("2 eggs 100 floors", function() {
      assert.equal(dpEggDrop(2, 100), 14);
    });
  });
});
