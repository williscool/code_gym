import assert from 'assert';
import PermutationTypes from '../../../math/combinatorics/permutations';
// inspired by https://github.com/josdejong/mathjs/blob/v3.16.3/test/function/probability/permutations.test.js

const {
  without_repetition: permutationsWithRep,
  without_repetition_optimized: permutationsWithRepOpt,
  with_repetition: permutationsWithRepetition,
} = PermutationTypes;

(['without_repetition', 'without_repetition_optimized']).forEach((key) => {
  // iife
  const permutations = (function functionPicker() {
    if (key === 'without_repetition') {
      return permutationsWithRep;
    }
    return permutationsWithRepOpt;
  }());

  describe(`Permutations ${key}`, () => {
    it('should calculate the permutations of a number', () => {
      assert.equal(permutations(0), 1);
      assert.equal(permutations(1), 1);
      assert.equal(permutations(2), 2);
      assert.equal(permutations(3), 6);
      assert.equal(permutations(4), 24);
      assert.equal(permutations(5), 120);
    });
    it('should calculate the permutations of a number n choosing k at a time', () => {
      assert.equal(permutations(5, 0), 1);
      assert.equal(permutations(5, 1), 5);
      assert.equal(permutations(5, 3), 60);
      assert.equal(permutations(5, 4), 120);
      assert.equal(permutations(9, 8), 362880);
      assert.equal(permutations(7, 5), 2520);
    });
  });
});

describe('Permutations with Repetition', () => {
  it('should calculate the permutations of a number n choosing k at a time with repetition', () => {
    assert.equal(permutationsWithRepetition(5, 0), 1);
    assert.equal(permutationsWithRepetition(5, 1), 5);
    assert.equal(permutationsWithRepetition(5, 2), 25);
  });
});
