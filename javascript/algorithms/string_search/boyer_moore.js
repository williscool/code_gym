// https://en.wikipedia.org/wiki/Boyer–Moore_string_search_algorithm
//
// http://www.geeksforgeeks.org/pattern-searching-set-7-boyer-moore-algorithm-bad-character-heuristic/
//
// http://stackoverflow.com/a/6209778/511710
//
// https://dzone.com/articles/algorithm-week-boyer-moore
// http://www.inf.fh-flensburg.de/lang/algorithmen/pattern/bmen.htm
// https://golang.org/src/strings/search.go
//
// TODO: make suffix skip thingy work based on
// https://gist.github.com/jhermsmeier/2138865
//
// illustrated by its creator here
//
// http://www.cs.utexas.edu/~moore/best-ideas/string-searching/index.html
// http://www.cs.utexas.edu/~moore/best-ideas/string-searching/fstrpos-example.html

var dsalgo = require('../../utilities.js').default;

function buildBadCharArray(pattern){
  var numCharsinAlphabet = 256;

  var badCA = dsalgo.utils.simpleArrayFill(-1 , numCharsinAlphabet);

  for (var i = 0; i < pattern.length ; i++) {
    badCA[pattern.charCodeAt(i)] = i;
  }

  return badCA;
}

function boyerMoore(text, pattern) {

  var m = pattern.length;
  var n = text.length;

  var locations = [];
  var badCharArray = buildBadCharArray(pattern);

  var s = 0; // how far to shift pattern with respect to search text
  var j;

  while (s <= (n - m)) {
    // start j at end of pattern
    j = m - 1;

    // move j back in the text until a mismatch
    while(j >= 0 && pattern[j] === text[s + j]){
      j--;
    }

    if(j < 0){
      // found a full pattern match add to matches
      locations.push(s);

      // time to set new shift
      // if pushing over by the pattern by the the number of chars equal the adding the last occurrence of the next char do that
      // if not add 1
      s += (s + m < n) ? m - badCharArray[text.charCodeAt(s + m)] : 1;
    } else {
      // move the pattern to the last occurence of the bad char in our pattern. or over one if it isnt there at all
      s += Math.max(1, j - badCharArray[text.charCodeAt(s + j)]);
    }
  }

  return locations;
}

module.exports = boyerMoore;
