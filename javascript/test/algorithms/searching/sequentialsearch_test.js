import assert from 'assert';
import seqsearch from '../../../algorithms/searching/sequentialsearch';
import dsalgo from '../../../utilities';

describe('Sequential Search', () => {
  describe('should work with arrays', () => {
    it('that are empty', () => {
      assert.equal(seqsearch([], 1), false);
    });

    it('with no duplicates', () => {
      assert.equal(seqsearch([9, 2, 8, 6, 1, 3], 9), 0);
      assert.equal(seqsearch([5, 2, 2, 6, 1, 3], 7), false);
    });

    it('that have duplicates', () => {
      assert.equal(seqsearch([3, 1, 4, 1, 5, 9, 2, 6, 5, 4], 1), 1);
    });

    it('that are random and non-sorted', () => {
      const array = dsalgo.utils.makeRandomArray({
        precision: 0,
      });

      const value = array[Math.floor(array.length / 2)];

      // we cant be sure there are no dupes since the array is random
      //  so we cant ask for a specfic index... (because we might get to duplicate value before the index return on line 25)
      //
      //  but we can make sure that the answer we get is not false
      //
      assert(seqsearch(array, value) !== false);
    });
  });
});
