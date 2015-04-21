// http://en.wikipedia.org/wiki/Binary_search_algorithm
module.exports.binarysearch = {};

//inspired by 
//
// http://en.wikipedia.org/wiki/Binary_search_algorithm#Recursive
// http://en.wikibooks.org/wiki/Algorithm_Implementation/Search/Binary_search#JavaScript
module.exports.binarysearch.recursive = function (list, needle, min, max) {
  var binarysearch = module.exports.binarysearch.recursive;

  var len = list.length,mid,max;

  // initilize values if they are undefined
  if(!min) min = 0;
  if(!max) max = len;

  // recursed to an empty list so return value having not been found
  if (min > max) return false;

  mid = (min + max) >> 1;

  midValue = list[mid];

  if (needle == midValue){
    return mid;
  } else if (needle > midValue){
    // target is lower search lower values in list
    return binarysearch(list, needle, mid + 1, max);
  }
  else {
    // target is lower search lower values in list
    return binarysearch(list, needle, min, mid - 1);
  }
  
};
