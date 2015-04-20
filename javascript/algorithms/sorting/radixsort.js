var countingsort = require('./countingsort.js');
// http://en.wikipedia.org/wiki/Radix_sort#Least_significant_digit_radix_sorts
//
// inspired by
// http://www.geeksforgeeks.org/radix-sort/
// https://github.com/kennyledet/Algorithm-Implementations/blob/master/Radix_Sort/Java/PatrickYevsukov/radix_sort.java
//
// only works with positve numbers

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
function arrayMax(numArray) {
  return Math.max.apply(null, numArray);
}

module.exports = function (list) {
 
  var max, power , base = 10;
 
  var max = arrayMax(list);

  for(power = 1; (max / power) > 1 ; power = power * base) {
    list = countingsort(list,power);
  }

  return list;
}
