import assert from 'assert';
import ProductOfAllExceptAtIndex from '../../interview_questions/product_of_ints_except_at_index';

Object.keys(ProductOfAllExceptAtIndex).forEach((key) => {
  const fn = ProductOfAllExceptAtIndex[key];
  const productOfAllExceptAtIndex = fn;

  describe(`${key} Product Of All Except At Index Question`, () => {
    it('should work with arrays', () => {
      assert.deepEqual(productOfAllExceptAtIndex([1, 7, 3, 4]), [84, 12, 28, 21]);
    });
  });
});
