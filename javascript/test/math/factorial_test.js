import assert from 'assert';
import Factorial from '../../math/factorial';

// inspired by: https://github.com/josdejong/mathjs/blob/master/test/function/probability/factorial.test.js

Object.keys(Factorial).forEach((key) => {
  const fn = Factorial[key];
  const factorial = fn;

  describe(`${key} Factorial`, () => {
    it('shoiuld calculate the factorial of a number', () => {
      assert.equal(factorial(0), 1);
      assert.equal(factorial(1), 1);
      assert.equal(factorial(2), 2);
      assert.equal(factorial(3), 6);
      assert.equal(factorial(4), 24);
      assert.equal(factorial(5), 120);
    });
  });
});
