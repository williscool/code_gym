// https://www.interviewcake.com/question/ruby/permutation-palindrome
var dsalgo = require('../utilities.js').dsalgo;

function hasPalindromePermutation(word) {
	var parity_map = {}, chr;
	
	for(var i =0; i < word.length ; i++){
		chr = word[i];
		
		// nifty trick of using true or false as even/odd to avoid possible integer overflow from counters
		if(!dsalgo.utils.isDefined(parity_map[chr])){
			// one is odd
			parity_map[chr] = false;
		} else if (!parity_map[chr]){
			// was odd is now even
			parity_map[chr] = true;
		} else {
			// was even is now odd
			parity_map[chr] = false;
		}
	}
	
	var odd_count = 0;
	
	var keys = Object.keys(parity_map);

	for(var j =0 ; j < keys.length ; j++){
		if(parity_map[keys[j]] === false) odd_count++;
		if(odd_count > 1) return false;
  }
	
	return true;
}


module.exports = hasPalindromePermutation;
