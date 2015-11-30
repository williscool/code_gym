// 
// http://introcs.cs.princeton.edu/java/23recursion/IntegerToBinary.java.html
var dsalgo = require('../../utilities.js').dsalgo;

function intToBin(num) {
	var res = []
	
	while(num > 0){
		res.push(num % 2);
		num = num >> 1; // need integer division by 2 for this algo to work. which is equivalent to bitshift right by 1
	}
	
	return res.reverse().join("");
}

function recIntToBin(num) {
  // so this function is funny. im (ab)using js's type coersion with the base case of the the recusion to turn this into a string
  // otherwise it would add all the numbers
  if (num == 0) return "";  
	return recIntToBin(num >> 1) + num % 2;
}

module.exports = {
  iterative: intToBin,
  recursive: recIntToBin
};
