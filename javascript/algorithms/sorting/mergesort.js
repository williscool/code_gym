// http://en.wikipedia.org/wiki/Merge_sort
var dsalgo = require('../../utilities.js').dsalgo;
var swap = dsalgo.utils.swap;

module.exports.mergesort = {};

// inspired by http://www.nczonline.net/blog/2012/10/02/computer-science-and-javascript-merge-sort/
// the wikipedia entry psuedocode was doing to much
function merge(left, right) {
  var result = [],
    iLeft = 0,
    iRight = 0;

  while (iLeft < left.length && iRight < right.length) {
    if (left[iLeft] < right[iRight]) {
      result.push(left[iLeft]);
      iLeft = iLeft + 1;
    } else {
      result.push(right[iRight]);
      iRight = iRight + 1;
    }
  }

  // lol wat http://stackoverflow.com/questions/7124884/why-does-1-2-3-4-1-23-4-in-javascript
  // return result + left.slice(iLeft) + right.slice(iRight);
  //
  // slice returns all the elements after and at the index you give it
  return result.concat(left.slice(iLeft)).concat(right.slice(iRight));
}

module.exports.mergesort.topDown = function(list) {
  var mergesort = module.exports.mergesort.topDown;

  if (list.length <= 1) {
    return list;
  }

  var left = [],
    right = [],
    middle = list.length >> 1, // http://googleresearch.blogspot.com/2006/06/extra-extra-read-all-about-it-nearly.html
    len = list.length,
    i;

  for (i = 0; i < len; i++) {
    if (i < middle) {
      left.push(list[i]);
    } else {
      right.push(list[i]);
    }
  }

  left = mergesort(left);
  right = mergesort(right);

  return merge(left, right);
};

module.exports.mergesort.bottomUp = function(list) {
  var mergesort = module.exports.mergesort.bottomUp;

  if (list.length <= 1) {
    return list;
  }

  var len = list.length,
    temp = [],
    blockSize, i;

  for (blockSize = 1; blockSize < len; blockSize = (blockSize * 2)) {

    // we want to take all of the elements as long as we dont go out of bounds
    // if we were to do len - blocksize then we would miss the last iteration in some cases where 
    // the right side is smaller than the left
    for (i = 0; i < len; i = i + (blockSize * 2)) {
      // javascript list slice is not inclusive of the element at the end index that you give it
      var left = list.slice(i, i + blockSize),
        right = list.slice(i + blockSize, Math.min((i + (2 * blockSize)), len));

      temp = temp.concat(merge(left, right));
    }

    list = temp;
    temp = [];
  }

  return list;
};


