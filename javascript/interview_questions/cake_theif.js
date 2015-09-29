var dsalgo = require('../utilities.js').dsalgo;
// https://en.wikipedia.org/wiki/Knapsack_problem#Unbounded_knapsack_problem
// https://www.interviewcake.com/question/ruby/cake-thief
//
// so in doing the unbouned knapsack problem I figured out the crucial intution of the algorithm for all types. 
//
// what you are doing is checking that 
//
// 1. at each capacity from 1 to W (where W is the capacity of the knapsack you want to check) 
//
//  2. for each item that weighs less than or equal to each capacity up to and including W (which is will from now on be refered to as lowercase w)
//
//  3. which item will give the most value at each given knapsack capacity + the maximum value of a knapsack with capacity w minus the weight of each item
//
// 4. once you have calculated the previous up to W return the maximum value at W
//
// the sub operations at step 3. change based on if the number of an item that can be included in the knapsack is 
//
// 1. limited inclusion or exclusion (0/1), 
// 2. infinite (unbounded) 
//
// also fun fact if you can you can take a portion of an item (fractional) the time is reduced to polynomial time https://en.wikipedia.org/wiki/Continuous_knapsack_problem

// in this function W === cap
function iterativeUnboundedKnapsack (item_arrs, cap){
	
	var current_highest_take_possible, max_value_at_this_cap, weight, value, max_value_using_this_item;
	
	var max_value_at_capacities = [0];

	// for each weight up to the capacity of the bag
	for (var w = 0; w <= cap; w++) {

		current_highest_take_possible = 0;

		for (var i = 0; i < item_arrs.length ; i++) {

		  weight = item_arrs[i][0];
		  value  = item_arrs[i][1];

		  if (weight === 0 && value != 0){
        // think about this. if you have an item that has zero wieght or cost but is worth something. how much can you put in the knapsack?
        // an infinite amount. You will be the richest person ever. Congrats you win at life.
        return "to inifinity and beyond!";
		  }
		  
		  // if the weight of the current cake or item is lower than the capacity we are checking it could also have a better price ratio. so we will check it
		  if (weight <= w) {
        
        // little hack to keep from having to init all values at each w to zero;
        if (!dsalgo.utils.isDefined(max_value_at_capacities[w - weight])) max_value_at_capacities[w - weight] = 0;

        max_value_using_this_item = value + max_value_at_capacities[w - weight];

        // now we check if using the value of this item plus the max value of w minus its weight is greater than any other value we have seen before
        // if so we replace the current_highest_take_possible with it
        current_highest_take_possible = Math.max(max_value_using_this_item, current_highest_take_possible);
		  } 

		}

		max_value_at_capacities[w] = current_highest_take_possible;
	}
	
	return max_value_at_capacities[cap];
}

module.exports = iterativeUnboundedKnapsack;
