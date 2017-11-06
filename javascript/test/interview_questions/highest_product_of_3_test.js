import assert from 'assert';
import highestProductOfThreeTypes from '../../interview_questions/highest_product_of_3';

Object.keys(highestProductOfThreeTypes).forEach((key) => {
  describe(`${key} Highest Product Of Three Question`, () => {
    it('should work', () => {
      assert.equal(highestProductOfThreeTypes[key]([1, 10, -5, 1, -100]), 5000);
    });
  });
});
