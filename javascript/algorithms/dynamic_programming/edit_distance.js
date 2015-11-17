// https://en.wikipedia.org/wiki/Edit_distance
// https://en.wikipedia.org/wiki/Levenshtein_distance
//
// http://www.geeksforgeeks.org/dynamic-programming-set-5-edit-distance/

function iEditDistance(x,y) {

  var m = x.length, n = y.length;

  var memo = [];
  while (memo.push([]) < n + 1); // http://stackoverflow.com/a/23867573/511710
 
  for(var i = 0; i <= m; i++) {
    for(var j = 0;  j <= n ; j++){
	  
      if(i === 0) {
        // if first string is empty. all we can do is insert all characters of the second into the first
        memo[i][j] = j;
      } else if(j === 0){
        // if second string is empty. all we can do is delete all characters of the first
        memo[i][j] = i;
      } else if(x[i - 1] == y[j - 1]){
        memo[i][j] = memo[i- 1][j-1];
      } else {
        memo[i][j] = 1 + Math.min(
              memo[i - 1][j], // delete char from first
              memo[i][j-1], // delete char from second 
              memo[i- 1][j-1] // delte char from both
            );
      }
	  
    }
  }
    
  return memo[m][n];
}

function rEditDistance(x,y, m, n)  {
 
  // if first string is empty. all we can do is insert all characters of the second into the first
  if (m === 0) return n;
  
  // if second string is empty. all we can do is delete all characters of the first
  if (n === 0) return m;

  // if last chars a equal no need to do anything so check the rest
  if(x[m - 1] == y[n - 1]){
    return rEditDistance(x,y, m -1, n -1);
  } 
    
  return 1 + Math.min( 
        rEditDistance(x,y, m, n -1), // delete char from second
        rEditDistance(x,y, m -1, n), // delte char from first
        rEditDistance(x,y, m -1, n -1) // delte char from both
      );
}

module.exports = {
  iterative: iEditDistance,
  recursive: function(x,y) {return rEditDistance(x,y,x.length, y.length);} 
};
