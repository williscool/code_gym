// naive way enumerate all possbilites of coins
// pick smallest num.
// that sucks
//
// so how to make it better? 
// 
// https://www.topcoder.com/community/data-science/data-science-tutorials/dynamic-programming-from-novice-to-advanced/
// http://www.geeksforgeeks.org/find-minimum-number-of-coins-that-make-a-change/

module.exports = function(V , S){

  // n === V.length
  var cache = []; 
  
  cache[0] = 0;
  for(var i = 1;  i <= S; i++) {
    cache[i] = Number.POSITIVE_INFINITY;
  }
  
  for(i = 1; i <= S; i++) {
    for(var j = 0; j < V.length; j++) {
      var m = cache[i - V[j]];

      if(V[j] <= i && m + 1 < cache[i] ){
        cache[i] = m + 1;
      }
    }
  }
  
  return cache[S];
}
