// https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm  
// https://en.wikipedia.org/wiki/String_(computer_science)
// https://en.wikipedia.org/wiki/Suffix
// https://en.wikipedia.org/wiki/Affix
// https://en.wikipedia.org/wiki/Substring#Prefix
//
// http://www.geeksforgeeks.org/searching-for-patterns-set-2-kmp-algorithm
// https://gist.github.com/blasten/d42bd0d814b7df1addea

function kmp(text, pattern) {

  var m = pattern.length;
  var n = text.length;

  var locations = [];
  var lpsArr = buildLPSArr(pattern);

  var i = 0, j = 0; // start looking at 0th index of text and pattern

  while (i < n) {

    if(pattern[j] === text[i]){
      i++;
      j++;
    } 

    if(j === m - 1){
      // found a full pattern match add to matches
      locations.push(i - j);

      // reset j to last character of match
      j = lpsArr[j - 1];

    } else if(pattern[j] !== text[i]) {  // mismatch case

      if (j !== 0){
        // matched a few chars skip as many as possible in text
        j = lpsArr[j - 1];
      } else { 
        // matched no characters start over looking for pattern at next text index
        i++;
      }
    } 
  }

  return locations;
}

// https://github.com/miguelmota/knuth-morris-pratt/blob/master/kmp.js
function buildLPSArr(pattern){
  var M = pattern.length;

  var lpsLen = 0; // len of longest prefix that ends at this char
  var pos;

  var lpsArray = [0]; // init zeroth pos to zero
  pos = 1;
  
  while (pos < M) {

    if(pattern[pos] === pattern[lpsLen]){
      // match
      lpsLen++;
      lpsArray[pos] = lpsLen;
      pos++;
    
    } else { //  pattern[pos] !== pattern[lpsLen]
      // mismatch

      if (lpsLen === 0){
        // len is 0 so new pos is zero also
        lpsArray[pos] = lpsLen; 
        pos++;
      } else { // lpsLen !== 0
        lpsLen = lpsArray[lpsLen - 1]; 
        // note that we dont increment pos here 
        // why because we have a partial match so we are running back in in the LPS arr to the longest match before this mismatch i think
      }
    } 
  }

  return lpsArray;
}


module.exports = kmp;
