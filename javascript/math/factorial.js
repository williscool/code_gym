var countDown = function(n) {

  if (n === 0) return 1;

  var result = n;

  for (var i = n - 1; i > 0; i--) {
    result = result * i;
  }

  return result;
};

// https://www.khanacademy.org/computing/computer-science/algorithms/recursive-algorithms/p/challenge-iterative-factorial
var countUp = function(n) {
  var result = 1;
    
  for(var i = 1; i <= n; i++ ){
    result = result * i;
  } 

  return result;
};

var recursive = function(n) {
	// base case: 
	if(n === 0) {
	    return 1;
	}
	
	// recursive case:
	return recursive(n - 1) * n;
};

module.exports = {
  count_down_iterative: countDown,
  count_up_iterative: countUp,
  recursive: recursive
};
