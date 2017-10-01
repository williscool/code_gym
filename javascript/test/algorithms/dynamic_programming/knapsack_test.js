// inspired by: http://www.geeksforgeeks.org/dynamic-programming-set-10-0-1-knapsack-problem/
import assert from 'assert';
import KnapsackTypes from '../../../algorithms/dynamic_programming/knapsack';

describe('Knapsack Problem', () => {
  const W = 50;
  const values = [60, 100, 120];
  const weights = [10, 20, 30];

  Object.keys(KnapsackTypes).forEach((key) => {
    describe(`${key} Solution`, () => {
      const knapsack = KnapsackTypes[key];
      it(`capacity=${W} values=[${values}] weights=[${weights}]`, () => {
        assert.equal(knapsack(W, weights, values, values.length), 220);
      });
    });
  });
});
