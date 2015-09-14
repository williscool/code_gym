// https://www.interviewcake.com/question/product-of-other-numbers

// n^2

// n extra space

// slow as balls
var dsalgo = require('../utilities.js').dsalgo;

function slowProductOfAllExceptAtIndex (ints){
	
	var product_arr = [];
	
	ints.forEach(function (num, i,array) {
		ints.forEach(function (otherNum, j) {
			if(i != j){
				if(!dsalgo.utils.isDefined(product_arr[i])) {
					product_arr[i] =  otherNum;
				} else {
					product_arr[i] = product_arr[i] * otherNum;
				}
			}
		});
	});
	
	return product_arr;
}

// 5n
// n extra space  
// but uses division so it would blowup on zero

function divisionPAllExceptAtIndex(ints){
	
	var product_arr = [ints[0]];
	
	ints.forEach(function (num, i,array) {
		if(i > 0) {
			product_arr[i] = product_arr[i - 1] * num;
		}
	});
	
	ints.reverse();
	product_arr.reverse();
	
	var multiplicator = ints[0];
	
	ints.forEach(function (num, i,array) {
		if(i > 0) {
			product_arr[i] = product_arr[i] * multiplicator;
			multiplicator = multiplicator * num;
		}
	});
	
	ints.forEach(function (num, i,array) {
		product_arr[i] = product_arr[i] /  num;
	});
	
  // reverse it back again lol
	product_arr.reverse();
	return product_arr;
}

// 5n 

// n extra space

function foreachPAllExceptAtIndex(ints) {
	
	var numsBefore = ints[0];
	var product_arr = [ints[0]];
	
	ints.forEach(function (num, i,array) {
		if(i > 0) {
			product_arr[i] = numsBefore;
			numsBefore = numsBefore * num;
		}
	});
	
	ints.reverse();
	product_arr.reverse();
	
	var numsAfter = ints[0];
	
	ints.forEach(function (num, i,array) {
		if(i > 0) {
			product_arr[i] = product_arr[i] * numsAfter;
			numsAfter = numsAfter * num;
		}
	});
	
  // again reverse it back
	product_arr.reverse();
	return product_arr;
}


// 2n version 
// still n extra space of course

function whilePAllExceptAtIndex(ints) {
	
	var numsBefore = ints[0];
	var product_arr = [ints[0]];
	var i = 1;
	
	while (i < ints.length) {
		product_arr[i] = numsBefore;
		numsBefore = numsBefore * ints[i];
		i++;
	}
	
	var numsAfter = ints[ints.length - 1];
	i = ints.length - 2;
	
	while (i >= 0) {
		product_arr[i] = product_arr[i] * numsAfter;
		numsAfter = numsAfter * ints[i];
		i--	;
	}
	
	return product_arr;
}

module.exports = {
  slow: slowProductOfAllExceptAtIndex,
  division: divisionPAllExceptAtIndex,
  foreach_loop: foreachPAllExceptAtIndex,
  while_loop: whilePAllExceptAtIndex
};
