import assert from 'assert';
import GCDTypes from '../../math/gcd';

Object.keys(GCDTypes).forEach((key) => {
  const gcd = GCDTypes[key];
  describe(`Euclidean algorithm for Greatest Common Denominator ${key}`, () => {
    console.log(gcd(7,5));
    it('should calculate the gcd of a number', () => {
      assert.equal(gcd(102, 68), 34);
      assert.equal(gcd(12, 8), 4);
    });
  });
});
