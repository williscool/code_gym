var dsalgo = require('../../utilities.js').dsalgo;
// http://wcipeg.com/wiki/Dynamic_programming 
// http://wcipeg.com/wiki/Dynamic_programming#Example:_recursive_solution_to_Plentiful_Paths

function rPP(A,x,y){
  // cheat and make A[x][y] = 0 if it is not 1; so we dont have to do the extra zero setting work
  if(!dsalgo.utils.isDefined(A[x][y])) A[x][y] = 0;

  if(x === 1) {
    if(y === 1) {
      return A[x][y];
    } else {
      return A[x][y] + rPP(A, x , y-1);
    }
  } else {
    if(y === 1) {
      return A[x][y] + rPP(A, x - 1 , y);
    } else {
      return A[x][y] + Math.max(rPP(A, x -1, y) , rPP(A, x, y - 1));
    }
  }
}

function iEditDistance(A,x,y) {

  var m = x.length, n = y.length;

  var memo = [];
 
  for(var i = 0; i <= m; i++) {
    for(var j = 0;  j <= n ; j++){
	  
    }
  }
    
  return memo[m][n];
}


module.exports = {
  // iterative: iEditDistance,
  recursive: rPP
};
