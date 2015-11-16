var dsalgo = require('../../utilities.js').dsalgo;
// https://en.wikipedia.org/wiki/Longest_common_subsequence_problem
// http://introcs.cs.princeton.edu/java/96optimization/
// http://code.cloudkaksha.org/algorithm/dynamic-programming/longest-common-subsequence

function iLCS(x,y) {
  var M = x.length;
  var N = y.length;

  var memo = [];
  while (memo.push([]) < N + 1); // http://stackoverflow.com/a/23867573/511710
  
  for(var i = 0; i <= M; i++) {
    for(var j = 0;  j <= N ; j++){
	  
      if(i === 0 || j === 0) {
        memo[i][j] = 0;
      } else if(x[i] === y[j]){
        memo[i][j] = memo[i - 1][j - 1] + 1;
      } else {
        memo[i][j] = Math.max(memo[i][j - 1], memo[i - 1][j]) ;
      }
	  
    }
  }
 
  var m = M + 1, n = N + 1;
  var result = [];

  // http://www.geeksforgeeks.org/printing-longest-common-subsequence/
  while(m > 0 && n > 0) {

    //
    // console.log(memo[m][n])
    // console.log(m + " : " + n)
    //
    if(x[m] === y[n]){
      // memo index  memo[m][n] houses the true length of the LCS so we need to substract one to get the index its refering to 
      result.push(x[m - 1]);
      m--;
      n--;
    } else if(memo[m - 1][n] >= memo[m][n - 1]){
      m--; 
    } else {
      n--;
    }
  }
  
  // console.log(memo)
  return result.reverse();
}

function recursiveLCS(arr)  {
  
}

module.exports = {
  iterative: iLCS //,
  // recursive: function(arr){ max_list = []; recursiveLIS(arr, 0, []); return max_list; },
};
