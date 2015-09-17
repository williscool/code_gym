// https://www.interviewcake.com/question/ruby/coin  
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
