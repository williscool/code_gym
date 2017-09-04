// https://en.wikipedia.org/wiki/Knapsack_problem
//
// this code only addresses the 0/1 knapsack.
//
// inspired by: http://www.geeksforgeeks.org/dynamic-programming-set-10-0-1-knapsack-problem/

// W = capacity
// n = # of item we are choosing

function naiveKnapsack(W, itemWeight, itemValue, n) {

  // base case of zero capacity or zero items
  if (n === 0 || W === 0) return 0;

  // skip this item if its W is greater than W
  // nth item of zero indexed array
  //
  if (itemWeight[n - 1] > W) return naiveKnapsack(W, itemWeight, itemValue, n - 1);

  // test then return the maximum of
  // 1. (the left side of the Math.max ) the case where the nth (and current) item is included and we test each of the other items with our W subtracted by the weight of the nth item
  // 2. (the right side of the Math.max ) the case where the nth  item IS NOT included and we simply test all of the other items
  return Math.max(itemValue[n - 1] + naiveKnapsack(W - itemWeight[n - 1], itemWeight, itemValue, n - 1),
    naiveKnapsack(W, itemWeight, itemValue, n - 1));

}

// loosely inspired by: http://www.programminglogic.com/knapsack-problem-dynamic-programming-algorithm/
// this version is just caching the naive version's subproblem answers
var dsalgo = require('../../utilities.js').default;
var tdCache = [];
function topDownKnapsack(W, itemWeight, itemValue, n) {

  if (dsalgo.utils.isDefined(tdCache[n]) && dsalgo.utils.isDefined(tdCache[n][W])) return tdCache[n][W];

  if (n === 0 || W === 0) return 0;

  if (itemWeight[n - 1] > W) return naiveKnapsack(W, itemWeight, itemValue, n - 1);

  // init nth dimension cache array if need be
  if (!dsalgo.utils.isDefined(tdCache[n]))
    tdCache[n] = [];

  tdCache[n][W] = Math.max(itemValue[n - 1] + naiveKnapsack(W - itemWeight[n - 1], itemWeight, itemValue, n - 1),
    naiveKnapsack(W, itemWeight, itemValue, n - 1));

  return tdCache[n][W];
}


// this version though starts from the base problem of no weight and 0 items and builds up all the subproblem cache until the answer
function bottomUpKnapsack(W, itemWeight, itemValue, n) {

  var buCache = [];

  for (var i = 0; i <= n; i++) {
    buCache[i] = []; //init cache array
    for (var w = 0; w <= W; w++) {

      if (i === 0 || w === 0)
        buCache[i][w] = 0;
      else if (itemWeight[i - 1] <= w) {
        buCache[i][w] = Math.max(itemValue[i - 1] + buCache[i - 1][w - itemWeight[i - 1]], buCache[i - 1][w]);
      } else {
        buCache[i][w] = buCache[i - 1][w];
      }

    }
  }

  return buCache[n][W];
}

module.exports = {
  naive: naiveKnapsack,
  top_down: topDownKnapsack,
  bottom_up: bottomUpKnapsack
};
