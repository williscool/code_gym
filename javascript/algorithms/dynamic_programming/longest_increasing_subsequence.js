var dsalgo = require('../../utilities.js').default;
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

  var memo = [], longestLen = 1, longestLenPosition = 0;

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
//
// this is a O(2^n) algorithm that I dont really see how you could cache

var max_list;
function recursiveLIS(arr, k, tmp_list)  {

  tmp_list.push(arr[k]);

  for(var i = k; i < arr.length - 1; i++) {

      if( arr[k] < arr[i + 1]) {
        recursiveLIS(arr, i + 1, tmp_list);
      }

  }

  if(tmp_list.length > max_list.length) max_list = dsalgo.utils.arrayDeepCopy(tmp_list);
  if(tmp_list.length > 0) tmp_list.pop();
}

// https://en.wikipedia.org/wiki/Longest_increasing_subsequence#Efficient_algorithms
// http://marcodiiga.github.io/longest-increasing-subsequence/
// http://www.cs.cmu.edu/afs/cs/academic/class/15210-f13/www/recitations/rec13.pdf
// http://www.geeksforgeeks.org/longest-monotonically-increasing-subsequence-size-n-log-n/
// http://www.geeksforgeeks.org/construction-of-longest-monotonically-increasing-subsequence-n-log-n/
// http://stackoverflow.com/questions/3992697/longest-increasing-subsequence

// this version only works for sequences with no duplicates. have to do the crazy parent array thing for dups
function nlogkLIS(arr) {

    if(arr.length < 2){
      return arr;
    }

    var lo,hi,mid,j;

    var M = [0]; // aka the tail index array of longest increasing subsequence ending at any index i
    var P = []; // aka the previous index number in arr of the longest increasing subsequence at i

    var L = 1;
    for(var i = 1; i < arr.length; i++) {

      lo = 0;
      hi = L;

      if(arr[M[hi -1]] < arr[i]){
        j = hi;
      } else {

         while( lo > hi - 1){
           mid = (lo + hi) >> 1;

           if(arr[M[mid - 1]] < arr[i]) {
              lo = mid;
           } else {
              hi = mid;
           }
         }

         j = lo; // aka newL in wikipedia solution or the newest length of longest subsequence at the current arr[i]

      }

      P[i] = M[j - 1];

      if(j == L || arr[i] < arr[M[j]] ){
        M[j] = i;
        // Math.max is the universal convient way to say if something is larger take that larger one
        L = Math.max(L, j +1);
      }

    }

    var result = [];
    var pos = M[L - 1];

    // console.log(M)
    // console.log(P)
    for(var k = 0; k < L; k++) {
      // console.log(pos)
      result.push(arr[pos]);
      pos = P[pos];
    }

    return result.reverse();
}

var LCS = require('./longest_common_subsequence.js').iterative;

// http://introcs.cs.princeton.edu/java/96optimization/
function LISwithLCS(arr){
  var copy = dsalgo.utils.arrayDeepCopy(arr);
  var lis = LCS(arr, copy.sort());
  return lis;
}

// https://en.wikipedia.org/wiki/Patience_sorting#Algorithm_for_finding_a_longest_increasing_subsequence
// https://www.cs.princeton.edu/courses/archive/spring13/cos423/lectures/LongestIncreasingSubsequence.pdf
// http://www.perlmonks.org/?node_id=547199
//
// Think about it if you run through your list from beginning to end and make a new pile every time you meet a number higher than your last pile
// which numbers are at the top of your piles? the Longest_increasing_subsequence :)
var patiencesort = require('../sorting/patiencesort.js');
function LISwithPatienceSort(arr){
  return patiencesort(arr, true);
}

// fun fact had to rewrite the recusive init anonymous function to init the max_list to nothing
// otherwise it will only ever calculate the correct value for the first list you give it

module.exports = {
  iterative: iLIS,
  recursive: function(arr){ max_list = []; recursiveLIS(arr, 0, []); return max_list; },
  nlogk: nlogkLIS,
  LISwithLCS: LISwithLCS,
  LISwithPatienceSort: LISwithPatienceSort
};
