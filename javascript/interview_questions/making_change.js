// https://en.wikipedia.org/wiki/Subset_sum_problem
// 
// also fun fact subset sum is actually a special case of knapsack where the weight and cost of items are equal
// https://en.wikipedia.org/wiki/Knapsack_problem#Subset-sum_problem
//
// but really shouts out to
// https://www.interviewcake.com/question/ruby/coin  
//
// also this is really a subset sum count. subset sum as defined by wikipedia short circuts when it finds the first solution and return true
// signifying that there is one if there is
//
// http://www.algorithmist.com/index.php/Subset_Sum
// http://stackoverflow.com/questions/22891076/count-number-of-subsets-with-sum-equal-to-k#
//
// another fun fact that most solutions carelessly in my opinion forget to mention is that these solutions only work for postive numbers
//
// the solution that works with negative numbers is pseudo polynomial in the range of the Sum of Negative values on the low end and the sum of the positive on the high end
//
// https://en.wikipedia.org/wiki/Subset_sum_problem#Pseudo-polynomial_time_dynamic_programming_solution
//
// another fun fact its only pseudo polynomial if the list is bounded. it devolves to exponential time any way if not lol
// http://cs.stackexchange.com/questions/1689/subset-sum-pseudo-polynomial-time-dynamic-programming-solution/3159#3159
//
var dsalgo = require('../utilities.js').dsalgo;

function numWaysNaiveRecursive(amount, denoms){
	
	var waysToGetAmount = 0, current_denom, remaining_denoms;
	
	if(amount === 0) return 1;
	if(amount < 0) return 0;
	if(denoms.length === 0) return 0;
	
	current_denom = denoms[0];
	remaining_denoms = denoms.slice(1,denoms.length);
	
	while (amount >= 0) {
		waysToGetAmount += numWaysRecursive(amount, remaining_denoms);
		amount = amount - current_denom;
	}

	return waysToGetAmount;
}

var amountCache = dsalgo.utils.simpleSet();

var cache_key = function(amount, denoms) {return amount + ":" + denoms.join(",");};

function numWaysRecursive(amount, denoms){
	
	var waysToGetAmount = 0, current_denom, remaining_denoms;
	
  if(dsalgo.utils.isDefined(amountCache[cache_key(amount,denoms)])){
    return amountCache[cache_key(amount,denoms)];
  } 

	if(amount === 0) return 1;
	if(amount < 0) return 0;
	if(denoms.length === 0) return 0;
	
	current_denom = denoms[0];

	remaining_denoms = denoms.slice(1,denoms.length);
	
	while (amount >= 0) {
		waysToGetAmount += numWaysRecursive(amount, remaining_denoms);
		amount = amount - current_denom;
	}

  amountCache[cache_key(amount,denoms)] = waysToGetAmount;
	return waysToGetAmount;
}

function numWaysIterative(amount, denoms){
	
	var ways_of_making_n_cents = dsalgo.utils.simpleArrayFill(0,amount + 1);
	ways_of_making_n_cents[0] = 1; 
	
	var next_amount, next_amount_remainder;
	
	for(var i = 0;  i < denoms.length ; i++ ){
		current_denom = denoms[i];
		
		for(var j = current_denom; j < amount + 1; j++){
			next_amount = j;
			
      next_amount_remainder = next_amount - current_denom;
			
			ways_of_making_n_cents[next_amount] = ways_of_making_n_cents[next_amount] + ways_of_making_n_cents[next_amount_remainder];
		}
	}
	
	return ways_of_making_n_cents[amount];
}

module.exports = {
  naive: numWaysNaiveRecursive,
  recursive: numWaysRecursive,
  iterative: numWaysIterative 
};
