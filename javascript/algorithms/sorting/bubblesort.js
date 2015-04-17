// http://en.wikipedia.org/wiki/Bubble_sort#Implementation
// https://www.youtube.com/watch?v=hR-NXv5Tma0
// bubble bubble..
module.exports.BubbleSort = {};

module.exports.BubbleSort.Naive = function (list) {

  var len, sorted, i;

  len = list.length;
  
  do {
    // assume array is sorted at first and let the for loop tell us if it isn't
    sorted = true; 
    
    for( i = 0; i < len; i++ ){
      
      if(list[i-1] > list[i]) {
        list = swap(list, i-1, i);
        sorted = false;
      }
    }
    
  } while (!sorted);
  
  return list;
}

function swap(list, firstIndex, secondIndex) {
  var temp = list[firstIndex];
  list[firstIndex] = list[secondIndex];
  list[secondIndex] = temp;
  return list;
}

module.exports.BubbleSort.Optimized = function (list) {

  var len, sorted, i;

  len = list.length;
  
  do {
    // assume array is sorted at first and let the for loop tell us if it isn't
    sorted = true; 
    
    for( i = 0; i < len; i++ ){
      
      if(list[i-1] > list[i]) {
        list = swap(list, i-1, i);
        sorted = false;
      }
    }
    
    len = len - 1;
  } while (!sorted);
  
  return list;
}

module.exports.BubbleSort.fromRightEnd = function (list) {

  var len, sorted, i;

  len = list.length;
  
  do {
    // assume array is sorted at first and let the for loop tell us if it isn't
    sorted = true; 
    
    for( i = 0; i < len; i++ ){
      
      if(list[i-1] > list[i]) {
        list = swap(list, i-1, i);
        sorted = false;
      }
    }
    
    len = len - 1;
  } while (len !=0);
  
  return list;
}
