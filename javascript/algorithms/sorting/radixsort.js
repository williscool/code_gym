/*jshint loopfunc:true */
//http://stackoverflow.com/questions/10451865/jshint-wont-let-me-use-foreach-in-a-for-loop
//
// http://en.wikipedia.org/wiki/Radix_sort#Least_significant_digit_radix_sorts
//
// inspired by
// http://www.geeksforgeeks.org/radix-sort/
// https://github.com/kennyledet/Algorithm-Implementations/blob/master/Radix_Sort/Java/PatrickYevsukov/radix_sort.java
// http://www.dreamincode.net/forums/topic/199650-least-significant-digit-radix-sort/page__view__findpost__p__1166098
//
// https://medium.com/@tyguyo/all-sorts-of-sorts-5da9873aa046
// https://codehost.wordpress.com/2011/07/22/radix-sort/
//
// only works with positve numbers

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
function arrayMax(numArray) {
  return Math.max.apply(null, numArray);
}

module.exports = function (list) {

   if(list.length < 2) {
    return list;
   }

   var max, maxLen, i, base = 10, buckets = [], digit;

   // http://stackoverflow.com/a/8492462/511710
   var log = function(b, n) {  
    return Math.log(n) / Math.log(b);  
   };

   var index_function = function (value, digit) {
     // get the digit at a place in the number
    return  Math.floor( value / Math.pow(base, digit) % base ); 
   };
 
   max = arrayMax(list);
   maxLen = Math.floor(log(base, max) + 1);
   
   i = 0;
   while(i < base){
     // make buckets for numbers to go into
     // another bucket sort
     buckets[i] = [];
     i++;
   }

   for(digit = 0; digit < maxLen; digit++ ){

     // im sorry im sick of writing for loops
     list.forEach(function(val){
      //var index = index_function(val,digit); 
      //if(!buckets[index]) debugger;
      buckets[index_function(val,digit)].push(val);
     });
     
     // now that we've built the buckets and shifted them 
     // we need to flatten them back into the list
     list = []; 
     buckets.forEach(function(val, i){
        list = list.concat(val);
        // then reset buckets to get them ready for next round
        buckets[i] = [];
     });
   }

  return list;
};
