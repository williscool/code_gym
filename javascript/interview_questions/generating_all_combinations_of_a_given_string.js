// technically this is the same as doing a power set of the characters of a string
// minus the empty one
//
// http://introcs.cs.princeton.edu/java/23recursion/Combinations.java.html
//
// https://docs.python.org/2/library/itertools.html
// https://github.com/Zolmeister/Polish.js/blob/master/polish.js
// http://thomas-cokelaer.info/blog/2012/11/how-do-use-itertools-in-python-to-build-permutation-or-combination/

var dsalgo = require('../utilities.js').dsalgo;
var result, combLen, replace;

function generateRecursiveStringCombinations(prefix, remaining) {

  // if we are about to go over the length of combinations we want to generate quit recursion now
  if(dsalgo.utils.isDefined(combLen) && prefix.length >= combLen) return;

  for(var i = 0, l = remaining.length ; i < l; i++) {
    
    // if there is no predetermined length always append our new combination. if there is a length defined than wait until our prefix reaches the proper size to
    if(!dsalgo.utils.isDefined(combLen) || prefix.length + 1 == combLen) {
      result.push(prefix + remaining[i]); 
    }

    generateRecursiveStringCombinations( prefix + remaining[i], replace ? remaining : remaining.slice(i + 1) );
  }

}

module.exports = {
  recursive: function (str, k, shouldReplace) { 
    if(dsalgo.utils.isDefined(k)) combLen = k;

    if(!dsalgo.utils.isDefined(shouldReplace)) {
      replace = false;
    } else {
      replace = shouldReplace;
    }
    
    result = [];
    generateRecursiveStringCombinations("", str);
    return result;
  }
};
