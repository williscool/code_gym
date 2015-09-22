// http://en.wikipedia.org/wiki/Counting_sort
// inspired by http://en.wikibooks.org/wiki/Algorithm_Implementation/Sorting/Counting_sort
//
//
// turns out bucket sort is basically just a generalization of counting sort
// http://en.wikipedia.org/wiki/Bucket_sort#Comparison_with_other_sorting_algorithms
//
// but instead of a bucket for every number you can make up your own arbitrariliy sized buckets
//
// presumably / preferably based off of some knowledge that would help you make the buckets some uniform size
// then you either recursively bbecket sort or use another sort perhaps selection sort on the smaller buckets
//
//  http://en.wikipedia.org/wiki/Bucket_sort#Optimizations
//
//  so no need to re do for that
//
//  https://www.interviewcake.com/question/ruby/top-scores

module.exports = function(list, power) {

  var i, j, k, min, max,
    counts = [],
    result = [],
    len = list.length;

  var index_function = function(value, min) {
    return value - min;
  };

  // calculate min and max from the numbers in the list
  min = list[0];
  max = list[0];
  list.forEach(function(val) {
    if (val > max) {
      max = val;
    }

    if (val < min) {
      min = val;
    }
  });

  if (power) {
    // overwite the index function to use a certain significant digit
    index_function = function(value, min) {

      return ((value / power) % 10) - min;
    };
  }

  // setup array to hold counts of differnt values
  for (i = 0; i < max - min + 1; i++) {
    counts[i] = 0;
  }

  // count number of distinct values in their respective array place
  for (i = 0; i < len; i++) {
    // current value minus the min to keep it in array bounds
    counts[index_function(list[i],min)]++;
  }

  k = 0;

  // put output values in result array
  //
  // repeat values based on count at counts index
  counts.forEach(function(val, i) {
    for (j = 0; j < counts[i]; j++) {
      result[k] = i + min;
      k = k + 1;
    }
  });

  return result;
};
