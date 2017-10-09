import assert from 'assert';
import GetMaxProfit from '../../interview_questions/stock_price';

describe('Stock Price Array Question', () => {
  describe('should work with arrays', () => {
    it('that are empty', () => {
      assert.throws(() => {
        GetMaxProfit([]);
      }, /2 prices/);
    });

    it('with no duplicates', () => {
      assert.equal(GetMaxProfit([2, 3, 10, 5, 1, 17, 4, 100]), 99);
    });

    it('that have duplicates', () => {
      assert.equal(GetMaxProfit([3, 1, 4, 1, 5, 9, 2, 6, 5, 4]), 8);
    });

    it('that have negative values', () => {
      assert.deepEqual(GetMaxProfit([0, 0, 0, 0, 0, -1]), 0);
      assert.deepEqual(GetMaxProfit([-1, 0, 0, 0, 0, -1]), 1);
    });
  });
});
