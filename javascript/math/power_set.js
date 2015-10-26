// https://en.wikipedia.org/wiki/Power_set aka generating all subsets
//
// http://rosettacode.org/wiki/Power_set#JavaScript
//
// https://www.mathsisfun.com/sets/power-set.html
//  
//  http://codereview.stackexchange.com/questions/7001/generating-all-combinations-of-an-array

function powerSet(arr){
  var len = arr.length;

  // power set inclues an empty set so we just add that as the first item in our result
  var result = [[]];

  for(var i = 0; i < len; i++){
    // have to update the result length (rLen) variable each time or the function will never terminate
    for(var j = 0, rLen = result.length ; j < rLen ; j++){
      //console.log(rLen)
      //console.log(result[j].concat(arr[i]));
                // result[j] + arr[i]
      result.push(result[j].concat(arr[i]));
    }
  }

  return result;
}

module.exports = powerSet;
