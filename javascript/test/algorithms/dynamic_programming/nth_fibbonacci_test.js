import assert from 'assert';
import fibbonacciFns from '../../../algorithms/dynamic_programming/nth_fibbonacci';

Object.keys(fibbonacciFns).forEach((key) => {
  describe(`${key} nth fibbonacci`, () => {
    const fibbonacci = fibbonacciFns[key];
    it('shoiuld calculate nth fibbonacci number', () => {
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
