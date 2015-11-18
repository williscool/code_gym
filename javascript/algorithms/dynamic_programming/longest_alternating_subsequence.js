// https://en.wikipedia.org/wiki/Longest_alternating_subsequence
// also called zigzag or alternating 
// https://community.topcoder.com/stat?c=problem_statement&pm=1259&rd=4493
//
// http://www.hiredintech.com/algorithm-design/writing-code/
// a bit wrong but still interesting http://rafal.io/posts/topcoder-zigzag.html

function iLAS(arr) {
  if(arr.length === 0) return 0;
  // no matter what as long as the length of the arr isnt 0 the LAS will be of size 1
  var up = [1];
  var down = [1];

  var longest = 1;

  for(var i = 1; i < arr.length; i++) {
    // init this next number to 1
    up.push(1);
    down.push(1);

    for(var j = 0;  j < i ; j++){
      if( arr[j] < arr[i] ) { // if the previous number (j) is lower than the current we are checking (i)
        up[i] = Math.max(down[j] + 1, up[i]);
      }
      
      if(arr[j] > arr[i]){ // if the previous number (j) is higer than the current we are checking (i)
        down[i] = Math.max(up[j] + 1, down[i]);
      }
    }

    longest = Math.max(longest, up[i], down[i]);
  }
  
  return longest;
}

// https://www.quora.com/Is-it-possible-to-compute-longest-alternating-subsequence-of-a-sequence-O-n-time-If-so-how
function linLAS(arr){
  var curL = 0, longestL = 0, lastDir = 0, lastVal = arr[0];
  
  var newDir;

  for(var i = 1;  i < arr.length ; i++){
    newDir = arr[i] - lastVal; 

    if( newDir * lastDir > 0 ) {
      curL = 0;
    } else {
      curL++;
      longestL = Math.max(longestL, curL);
    }
    
    lastVal = arr[i];
    lastDir = newDir;
  }
  
  return longestL;
}

module.exports = {
  quadratic: iLAS,
  linear: linLAS
};
