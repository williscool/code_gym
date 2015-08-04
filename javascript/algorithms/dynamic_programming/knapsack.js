// https://en.wikipedia.org/wiki/Knapsack_problem
//
// this code only addresses the 0/1 knapsack. 
// 
// inspired by: http://www.geeksforgeeks.org/dynamic-programming-set-10-0-1-knapsack-problem/

// W = capacity
// n = # of item we are choosing

function naiveKnapsack(W, itemWeight, itemValue, n ) {
  
  // base case of zero capacity or zero items
  if(n === 0 || W === 0 ) return 0;

  // skip this item if its W is greater than W
  // nth item of zero indexed array
  //
  if(itemWeight[n-1] > W) return naiveKnapsack(W, itemWeight, itemValue, n-1);

  // test then return the maximum of 
  // 1. (the left side of the Math.max ) the case where the nth (and current) item is included and we test each of the other items with our W subtracted by the weight of the nth item
  // 2. (the right side of the Math.max ) the case where the nth  item IS NOT included and we simply test all of the other items
  return Math.max( itemValue[n-1] + naiveKnapsack(W - itemWeight[n-1], itemWeight, itemValue, n-1)
      , 
      naiveKnapsack(W, itemWeight, itemValue, n-1));

}


module.exports = naiveKnapsack;
