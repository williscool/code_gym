import assert from 'assert';
import CombinationTypes from '../../../math/combinatorics/combinations';
// inspired by https://github.com/josdejong/mathjs/blob/v3.16.3/test/function/probability/combinations.test.js

const {
  without_repetition: combo,
  with_repetition: comboWithRep,
} = CombinationTypes;

describe('Combinations', () => {
  it('should calculate the combinations of a number n choosing k subsets at a time', () => {
    assert.equal(combo(0, 0), 1);
    assert.equal(combo(0, 1), 0);
    assert.equal(combo(7, 0), 1);
    assert.equal(combo(16, 1), 16);
    assert.equal(combo(7, 5), 21);
    assert.equal(combo(20, 15), 15504);
    assert.equal(combo(63, 7), 553270671);
    assert.equal(combo(25, 6), 177100);
    assert.equal(combo(10, 5), 252);
  });
});

describe('Combinations with Repetition', () => {
  it('should calculate the combinations of a number n choosing k subsets at a time with repetition', () => {
    // http://www.mathsisfun.com/combinatorics/combinations-permutations-calculator.html
    assert.equal(comboWithRep(0, 0), 1);
    assert.equal(comboWithRep(0, 1), 0);
    assert.equal(comboWithRep(7, 0), 1);
    assert.equal(comboWithRep(16, 1), 16);
    assert.equal(comboWithRep(5, 3), 35);
    assert.equal(comboWithRep(7, 5), 462);
  });
});
