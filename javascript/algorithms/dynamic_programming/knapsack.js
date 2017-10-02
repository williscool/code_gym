import dsalgo from '../../utilities';

/**
 * https://en.wikipedia.org/wiki/Knapsack_problem
 *
 * Given a set of items, each with a weight and a value,
 * determine the number of each item to include in a collection so that the total weight is less than or equal to a given limit
 * and the total value is as large as possible.
 *
 * It derives its name from the problem faced by someone who is constrained by a fixed-size knapsack (or backpac)
 * and must fill it with the most valuable items.
 *
 * The most common problem being solved is the 0-1 knapsack problem, which restricts the number xi of copies of each kind of item to zero or one.
 * this module only addresses the 0/1 knapsack.
 *
 * inspired by: http://www.geeksforgeeks.org/dynamic-programming-set-10-0-1-knapsack-problem/
 *
 * https://www.youtube.com/watch?v=PGlykcD-Z2o
 *
 * @module Knapsack
 */

/**
 * Naive Knapsack
 *
 * @param {number} W capacity of the knapsack
 * @param {number[]} itemWeights the weights of the items to choose from
 * @param {number[]} itemValues the values of the items to choose from
 * @param {number} n # of item we are choosing to us or not use
 * @returns {number} maximized value you can fit into the knapsack given the constraints
 */
function naiveKnapsack(W, itemWeights, itemValues, n) {
  // base case of zero capacity or zero items
  if (n === 0 || W === 0) return 0;

  // skip this item if its weight is greater than weight (W) we are trying to construct now
  //
  // nth item of zero indexed array
  if (itemWeights[n - 1] > W) return naiveKnapsack(W, itemWeights, itemValues, n - 1);

  // test then return the maximum of
  //
  // 1. (the left side of the Math.max)
  // the case where the nth (and current) item is included and we test each of the other items with our W subtracted by the weight of the nth item
  //
  // 2. (the right side of the Math.max)
  // the case where the nth item IS NOT included and we simply test all of the other items trying to add up to W
  return Math.max(itemValues[n - 1] + naiveKnapsack(W - itemWeights[n - 1], itemWeights, itemValues, n - 1),
    naiveKnapsack(W, itemWeights, itemValues, n - 1));
}


const tdCache = [];
/**
 * Top Down Knapsack
 *
 * loosely inspired by: http://www.programminglogic.com/knapsack-problem-dynamic-programming-algorithm/
 * this version is just caching the naive version's subproblem answers
 *
 * @param {number} W capacity of the knapsack
 * @param {number[]} itemWeights the weights of the items to choose from
 * @param {number[]} itemValues the values of the items to choose from
 * @param {number} n # of item we are choosing to us or not use
 * @returns {number} maximized value you can fit into the knapsack given the constraints
 */
function topDownKnapsack(W, itemWeights, itemValues, n) {
  if (dsalgo.utils.isDefined(tdCache[n]) && dsalgo.utils.isDefined(tdCache[n][W])) return tdCache[n][W];

  if (n === 0 || W === 0) return 0;

  if (itemWeights[n - 1] > W) return topDownKnapsack(W, itemWeights, itemValues, n - 1);

  // init nth dimension cache array if need be
  if (!dsalgo.utils.isDefined(tdCache[n])) tdCache[n] = [];

  tdCache[n][W] = Math.max(itemValues[n - 1] + topDownKnapsack(W - itemWeights[n - 1], itemWeights, itemValues, n - 1),
    topDownKnapsack(W, itemWeights, itemValues, n - 1));

  return tdCache[n][W];
}

/**
 * Bottom up knapsack
 *
 * this version though starts from the base problem of no weight and 0 items and builds up all the subproblem's cache until the answer
 *
 * @param {number} W capacity of the knapsack
 * @param {number[]} itemWeights the weights of the items to choose from
 * @param {number[]} itemValues the values of the items to choose from
 * @param {number} n # of items to choose from
 * @returns {number} maximized value you can fit into the knapsack given the constraints
 */
function bottomUpKnapsack(W, itemWeights, itemValues, n) {
  const buCache = [];

  for (let i = 0; i <= n; i += 1) {
    buCache[i] = []; // init cache array
    for (let w = 0; w <= W; w += 1) {
      if (i === 0 || w === 0) {
        buCache[i][w] = 0;
      } else if (itemWeights[i - 1] <= w) {
        buCache[i][w] = Math.max(itemValues[i - 1] + buCache[i - 1][w - itemWeights[i - 1]], buCache[i - 1][w]);
      } else {
        buCache[i][w] = buCache[i - 1][w];
      }
    }
  }

  return buCache[n][W];
}

export default {
  naive: naiveKnapsack,
  top_down: topDownKnapsack,
  bottom_up: bottomUpKnapsack,
};

