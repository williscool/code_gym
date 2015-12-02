// https://en.wikipedia.org/wiki/String_searching_algorithm
// https://en.wikipedia.org/wiki/Rabin%E2%80%93Karp_algorithm#Shifting_substrings_search_and_competing_algorithms
//
// http://www.geeksforgeeks.org/searching-for-patterns-set-1-naive-pattern-searching/
// https://www.topcoder.com/community/data-science/data-science-tutorials/introduction-to-string-searching-algorithms/

function naiveSS(text, pattern) {

  var n = text.length;
  var m = pattern.length;
  var locations = [];

  for (var i = 0; i <= n - m; i++) {
    for (var j = 0; j < m; j++) {
      if(text[i + j] !== pattern[j]) break; 
      if(j === m - 1) locations.push(i);
    }
  }

  return locations;
}


module.exports = naiveSS;
