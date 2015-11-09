var dsalgo = require('../../utilities.js').dsalgo;
// https://en.wikipedia.org/wiki/Longest_increasing_subsequence
//
// https://www.youtube.com/watch?v=4fQJGoeW5VE
// https://www.hackerrank.com/challenges/longest-increasing-subsequent
// http://www.geekviewpoint.com/python/dynamic_programming/lis
//
// http://codereview.stackexchange.com/questions/95455/longest-increasing-subsequence
// http://stackoverflow.com/questions/2631726/how-to-determine-the-longest-increasing-subsequence-using-dynamic-programming
//
// http://www.cs.yale.edu/homes/aspnes/pinewiki/DynamicProgramming.html
//
// So this problem is another fun one whose actual execution is HORRIBLY explained the internet over.
//
// While the psuedocode or explainations seem straight forward enough most of the time (just calculate the longest increasing subsequence at each position and return the one last one. DUH RIGHT. ) NO
//
// In practice many solutions and explainations skip minor details that can kill your shot at actually understanding what the fuck is happening.
//
// So here goes. To paraphrase the yale pinewiki
//
// One way to do this would be to 
//   
//   "build up a table of longest increasing subsequences for each initial prefix of the array. 
//
//   At each step, when finding the longest increasing subsequence of elements 0..i ...
//   store in table[i] the full longest increasing subsequence ending at position i "
//  
//   but
//
//   "We don't really want to store in table[i] the full longest increasing subsequence ending at position i,
//   because it may be very big."
//
//   so to be more space efficient
//
//   "At each step, when finding the longest increasing subsequence of elements 0..i, 
//   we can just scan through all the possible values for the second-to-last element and 
//   read the length of the best possible subsequence ending there out of the table. 
//
//   When the table is complete, we can scan for the best last element and then work backwards to 
//   reconstruct the actual subsequence.
//
//   Since that second-to-last element also has a table entry that stores the index of its predecessor, 
//   by following the indices we can generate a subsequence of length O(n), 
//   even though we only stored O(1) pieces of information in each table entry."
//
//  So At each position in our input arr in our auxillary space we are going to keep track of 2 things
//
// 1. The interger lenght of longest subesquence we have been able to create thus far at this element
// 2. A pointer to the index of the first array element that gave us a subsequence of that length

function iLIS (arr) {
  var len = arr.length;
  
  if(len == 1) return arr;

  var memo = [], longestLen = 0, longestLenPosition = -1;
  
  for(var i = 0; i < len; i++) {
    
    memo.push({});
    memo[i].length = 1;
    memo[i].prev = len;
	
    for(var j = 0;  j < i ; j++){
	  
      if(arr[j] < arr[i] && memo[j].length + 1 > memo[i].length) {
	  
        memo[i].length = memo[j].length + 1;
        memo[i].prev = j;
      
        // saves us the extra O(n) highest len check from yale solution
        if(memo[i].length > longestLen) {
          longestLen = memo[i].length;
          longestLenPosition = i;
        } 
      }
	  
    }
  }

  var result = [];
 
  var pos = longestLenPosition;
  
  for (var k = 0; k < longestLen; k++) {
    result.push(arr[pos]);
    pos = memo[pos].prev;
  }
  
  //console.log(memo);
  // you could push write them into the array from the last position but its the same thing
  return result.reverse();
}

// http://www.geeksforgeeks.org/dynamic-programming-set-3-longest-increasing-subsequence/
// http://codingtonic.blogspot.com/2015/02/longest-increasing-sub-sequence-dynamic.html
// http://edusagar.com/questions/dynamic-programming/longest-increasing-subsequence-lis
// http://codereview.stackexchange.com/questions/102232/calculating-longest-increasing-sub-sequence-recursively
// http://jeffe.cs.illinois.edu/teaching/algorithms/notes/03-backtracking.pdf
// http://jeffe.cs.illinois.edu/teaching/algorithms/notes/05-dynprog.pdf        
//
// http://zsurface.com/html/indexLongestIncreasingSubsequenceRecursion.html
// also pg 45 of Competitive Programming ed 1 http://cpbook.net/
//
// http://settri.blogspot.com/2015/08/dynamic-programming.html
//
// Fun fact about the recursive solution to this problem that I think I undestand correctly  but im not sure.
//
// So there are recursion tree's that give suboptimal values and you have to use a global variable for the max or max list
// to make sure you return the max length from the largest tree
//
// again HORRIBLY explained around the internet

var MAX = 1;
function recursiveLIS(arr, len)  {

  if(len <= 1) return 1;
  
	var max_ending_here = 1; // init to just having one. i.e if this num was lower than the previous and we are starting a new subseq

  for(var i = 0; i < len; i++) {
	
      var maxAtI = recursiveLIS(arr, i);
      if( arr[i - 1] < arr[len - 1]) {
         max_ending_here = Math.max(max_ending_here, maxAtI + 1);
      }

  }

  MAX = Math.max(MAX, max_ending_here)
  return max_ending_here;
}


function recursive(arr){
	var len = arr.length;
	
	if (len <= 1) return arr;
	
	var memo = [{length:1, prev: arr.length}];
	
	memo = recursiveLIS(arr, arr.length, memo);

  var result = [];
 
  var pos = longestLenPosition;
  
  console.log(memo);
  for (var k = 0; k < max; k++) {
    result.push(arr[pos]);
    pos = memo[pos].prev;
  }

  return result.reverse();
}

module.exports = {
  iterative: iLIS,
  recursive: function(arr){  recursiveLIS(arr, arr.length); return MAX; }
};
