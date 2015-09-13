var assert = require('assert');
var GetMaxProfit = require('../../interview_questions/stock_price.js');
var dsalgo = require('../../utilities.js').dsalgo;

describe('Stock Price Array Question', function() {

  describe('should work with arrays', function() {

    it('that are empty', function() {
      assert.throws(function() {
        GetMaxProfit([]);
      }, /2 prices/);
    });

    it('with no duplicates', function() {
      assert.equal(GetMaxProfit([2, 3, 10, 5, 1, 17, 4, 100]), 99);
    });

    it('that have duplicates', function() {
      assert.equal(GetMaxProfit([3, 1, 4, 1, 5, 9, 2, 6, 5, 4]), 8);
    });

    it('that have negative values', function() {
      assert.deepEqual(GetMaxProfit([0, 0, 0, 0, 0, -1]), 0);
      assert.deepEqual(GetMaxProfit([-1, 0, 0, 0, 0, -1]), 1);
    });

  });

});
