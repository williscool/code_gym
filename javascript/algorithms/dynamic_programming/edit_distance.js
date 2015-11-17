// var dsalgo = require('../../utilities.js').dsalgo;
// https://en.wikipedia.org/wiki/Edit_distance
// https://en.wikipedia.org/wiki/Levenshtein_distance

function iEditDistance(x,y) {
}

// 
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
//  iterative: iLCS,
  recursive: function(x,y) {return rEditDistance(x,y,x.length, y.length);} 
};
