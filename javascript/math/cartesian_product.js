var dsalgo = require('../utilities.js').dsalgo;
// https://en.wikipedia.org/wiki/Cartesian_product
// https://docs.python.org/2/library/itertools.html 
//
// http://stackoverflow.com/a/12305169/511710

function cartesianProduct(/* arguments */){

  var appendTo = function (current, args) {
    
    var copy,
      remaining = args.slice(1),
      last = remaining.length === 0,
      result = [];
     
    for(var i = 0; i < args[0].length; i++) {
       copy = dsalgo.utils.arrayDeepCopy(current);
       copy.push(args[0][i]);

       if(last){
         result.push(copy);
       } else{
         result = result.concat(appendTo(copy,remaining));
       }
  
    }
      
    return result;
  };

  return appendTo([], Array.prototype.slice.call(arguments));
}

module.exports = cartesianProduct;
