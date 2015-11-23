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

function iPP(A,M,N) {

  var memo = dsalgo.utils.create2Darray(N + 1);

  for(var x = 1; x <= M; x++) {
    for(var y = 1;  y <= N; y++){

      if(!dsalgo.utils.isDefined(A[x][y])) A[x][y] = 0;
      if(!dsalgo.utils.isDefined(memo[x][y])) memo[x][y] = 0;

      if(x === 1) {
        if(y === 1) {
          memo[x][y] = A[x][y];
        } else {
          memo[x][y] = A[x][y] + memo[x][y-1];
        }
      } else {
        if(y === 1) {
          memo[x][y] = A[x][y] + memo[x - 1][y];
        } else {
          memo[x][y] = A[x][y] + Math.max( memo[x - 1][y], memo[x][y-1]);
        }
      }
	  
    }
  }

  return memo[M][N];
}

module.exports = {
  iterative: iPP,
  recursive: rPP
};
