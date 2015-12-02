// https://en.wikipedia.org/wiki/Rabin–Karp_algorithm
//
// http://www.geeksforgeeks.org/searching-for-patterns-set-3-rabin-karp-algorithm/
// https://www.topcoder.com/community/data-science/data-science-tutorials/introduction-to-string-searching-algorithms/
//
// http://algs4.cs.princeton.edu/53substring/RabinKarp.java.html
//
// fun fact all of the above solutions quitely rely on their respective languages 
// to cast the characters of the strings to ints in the hash functions
//
// inspiration for charCodeAt stuff https://gist.github.com/antivanov/1120948
//
var dsalgo = require('../../utilities.js').dsalgo;
var mod = dsalgo.utils.mod;

function rabinKarp(text, pattern) {

  var i,j;

  var n = text.length;
  var m = pattern.length;

  var d = 256; // d aka R aka the alphabetSize
  var q = 101; // our random prime... that we got from geeks for geeks who got it from the wikipedia article

  // from CLRS h === d ^ (m - 1) mod (q) is the value of the digit "1" in the high-order position of an m-digit text window. 
  //
  // what ever the fuck that means... 
  //
  // nevermind figured it out
  //
  // why do we need such a thing? because as we move through out input text to see if it contains our pattern... 
  // we are going over the text moving forward 1 character at a time to see if there is a hash match 
  //
  // when moving by that character what happens?
  //
  // we ignore the first character of our already checked substring of our text at the beginning the (lenght of our search pattern + amount of chars we've already looked at + 1)th a new one at the end
  // this fancy math function drops the first character and a later part of the code adds the new last character
  //
  // also here is a mini rant that no one will ever read. WHERE THE FUCK DO ACADEMICS GET THEIR VARIABLE NAMES FROM. WHY IN GOD'S NAME IS THIS NUMBER JUST CALLED h in CLRS?
  // RM in sedewicks algorithms in java code is slightly better but still not very descriptive... geez
 
  var RMthDight = 1;
  for (i = 0; i < m - 1; i++) {
   RMthDight = mod(d * RMthDight , q);
  }

  var p = 0; // hash val for pattern
  var t = 0; // hash val for text

  for (j = 0; j < m; j++) {
   p = mod(d * p + pattern.charCodeAt(j) , q);
   t = mod(d * t + text.charCodeAt(j) , q);
  }

  var locations = [];

  for (i = 0; i <= n - m; i++) {
    // only run our inner loop if we hit a hash match
    if(p === t){
      for (j = 0; j < m; j++) {
        if(text[i + j] !== pattern[j]) break; 
        if(j === m - 1) locations.push(i);
      }
    } 
    
    // keep rollin https://www.youtube.com/watch?v=RYnFIRc0k6E&feature=youtu.be&t=62
    t = mod( d * (t - text.charCodeAt(i) * RMthDight) + text.charCodeAt(i + m), q )
  }

  return locations;
}

module.exports = rabinKarp;
