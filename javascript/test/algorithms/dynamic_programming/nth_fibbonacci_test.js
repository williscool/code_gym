var assert = require('assert');
var fibbonacciFns = require('../../../algorithms/dynamic_programming/nth_fibbonacci.js');

Object.keys(fibbonacciFns).forEach(function(key) {
  describe(key + " nth fibbonacci", function() {
    var fibbonacci = fibbonacciFns[key];
    it("shoiuld calculate nth fibbonacci number", function() {
      assert.equal(fibbonacci(0), 0);
      assert.equal(fibbonacci(1), 1);
      assert.equal(fibbonacci(2), 1);
      assert.equal(fibbonacci(3), 2);
      assert.equal(fibbonacci(4), 3);
      assert.equal(fibbonacci(5), 5);
      assert.equal(fibbonacci(12), 144);
    });
  });
});
