import assert from 'assert';
import InsertionSort from '../../../algorithms/sorting/insertionsort';
import dsalgo from '../../../utilities';

Object.keys(InsertionSort).forEach((key) => {
  const fn = InsertionSort[key];
  const insertionsort = fn;

  describe(`${key} Insertion Sort`, () => {
    describe('should work with arrays', () => {
      it('that are empty', () => {
        assert.deepEqual(insertionsort([]), []);
      });

      it('with no duplicates', () => {
        assert.deepEqual(insertionsort([9, 2, 8, 6, 1, 3]), [1, 2, 3, 6, 8, 9]);
        assert.deepEqual(insertionsort([5, 2, 2, 6, 1, 3]), [1, 2, 2, 3, 5, 6]);
        assert.deepEqual(insertionsort([5, 2, 4, 6, 1, 3]), [1, 2, 3, 4, 5, 6]);
      });

      it('that have duplicates', () => {
        assert.deepEqual(insertionsort([3, 1, 4, 1, 5, 9, 2, 6, 5, 4]), [1, 1, 2, 3, 4, 4, 5, 5, 6, 9]);
      });

      it('that have negative values', () => {
        assert.deepEqual(insertionsort([0, 0, 0, 0, 0, -1]), [-1, 0, 0, 0, 0, 0]);
      });

      it('that are random and non-sorted', () => {
        const array = dsalgo.utils.makeRandomArray({
          precision: 0,
        });

        insertionsort(array);
        for (let i = 1; i < array.length; i += 1) {
          assert((array[i - 1] <= array[i]) === true);
        }
      });
    });
  });
});
