var dsalgo = require('../../utilities.js').dsalgo;
// https://en.wikipedia.org/wiki/Longest_common_substring_problem
// http://wcipeg.com/wiki/Longest_common_substring
// https://github.com/mission-peace/interview/blob/master/src/com/interview/dynamic/LongestCommonSubstring.java
// https://www.youtube.com/watch?v=BysNXJHzCEs
// http://algorithms.tutorialhorizon.com/dynamic-programming-longest-common-substring/

function iLCS(x,y) {
  var M = x.length;
  var N = y.length;

  var memo = dsalgo.utils.create2Darray(M + 1,N + 1);
  
  var max = 0;
  for(var i = 0; i <= M; i++) {
    for(var j = 0;  j <= N ; j++){
	  
      if(i === 0 || j === 0) {
        memo[i][j] = 0;
      } else if(x[i - 1] === y[j - 1]){
        memo[i][j] = memo[i - 1][j - 1] + 1;
        max = Math.max(max,memo[i][j]);
      } else {
        memo[i][j] = 0;
      }
	  
    }
  }

  return max;
 
}


module.exports = {
  iterative: iLCS
};
