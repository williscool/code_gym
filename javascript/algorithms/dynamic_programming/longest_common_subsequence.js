var dsalgo = require('../../utilities.js').dsalgo;
// https://en.wikipedia.org/wiki/Longest_common_subsequence_problem
// http://introcs.cs.princeton.edu/java/96optimization/
// http://code.cloudkaksha.org/algorithm/dynamic-programming/longest-common-subsequence
//
// fun fact: you can use LCS of some combination of you input to get a solution for many other problems. 
// though its usually not the most optimal solution it does work (i've previously done it with LIS)
//
// LIS = LCS(input,input.sort())
// 
// for example longest palindromic subsequence is merely
//
// LPS = LCS(input,input.reverse())
// http://www.geeksforgeeks.org/dynamic-programming-set-12-longest-palindromic-subsequence/
// http://cs.stackexchange.com/questions/2466/fastest-algorithm-for-finding-the-longest-palindrome-subsequence/10698#10698
//
// http://algorithms.tutorialhorizon.com/longest-palindromic-subsequence/
// LPS on its own https://www.quora.com/What-is-a-dynamic-programming-algorithm-to-find-the-longest-palindrome-that-is-a-subsequence-of-a-given-input-string-without-reversing-the-string

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
 
  var m = M, n = N;
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

// https://youtu.be/xnWqLAI3TKs?t=277
function rLCS(x,y)  {

  // slicing isn't free and costs this algo more time
 // If performance was a concern I would do something else... like not using the recursive version of this function in the first place lol
 
  if (x.length === 0 || y.length === 0) return [];

  var x0 = x[0], y0 = y[0];
  var xRest = x.slice(1), yRest = y.slice(1);
  
  if(x0 == y0){
    return [x0].concat(rLCS(xRest,yRest));
  } else {
    var lcsRestWithoutX0 = rLCS(x,yRest);
    var lcsRestWithoutY0 = rLCS(xRest,y);

    if(lcsRestWithoutX0.length > lcsRestWithoutY0.length){
      return lcsRestWithoutX0;
    } else {
      return lcsRestWithoutY0;
    }
  }
  
}

module.exports = {
  iterative: iLCS,
  recursive: rLCS
};
