/*

// https://www.interviewbit.com/problems/rotated-array/

[]
[1]
[2,1]
[3,4,5,6,1,2]

*/

function smallestNum(arr){
  
  if(arr.length < 1) return false;
  
  var smallest = arr[0];
  
  arr.forEach(function(num){
    if(num < smallest){
      smallest = num;
    }
  });
  
  return smallest;
}


function bSearchSmallestNum(arr){
  
  var len = arr.length;
  
  if(len < 1) return false;
  
  var min = 0;
  var max = len - 1;
  
  // Binary search looking for element where previous element to it and next element are greater than it
  
  while(min <= max) {
    
    // case where we went through entire search space and ended up with elements equal
    if(arr[min] <= arr[max]) return arr[min]; 
  
    var mid = (min + max) >> 1 ; // bitshift one is same as Math.floor and handles overflow
    
    // modulo len because if len is the last element we want to look at the first element and vice versus
    var next = (mid + 1) % len;
    var prev = (mid + len - 1) % len;
    
    // our pivot is less than the element before and after it. we found our pivot so we can return
    if(arr[mid] <= arr[prev] && arr[mid] <= arr[next] ) {
      return arr[mid];
    } else if (arr[mid] <= arr[max]){
      max = mid + 1;
    } else if (arr[mid] >= arr[min]){
      min = mid + 1;
    } 
    
  }
  
}

module.exports = {
  linear: smallestNum,
  binary_search: bSearchSmallestNum
};
