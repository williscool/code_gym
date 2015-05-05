// so things dont get dupped all over the place

module.exports.dsalgo = {utils: {}}
var utils = module.exports.dsalgo.utils;

// techincally the return here is unnecessary since we never make a deepCopy of the array 
// so its muting the original. But I just like this interface better
utils.swap = function (list, firstIndex, secondIndex) {
  var temp = list[firstIndex];
  list[firstIndex] = list[secondIndex];
  list[secondIndex] = temp;
  return list;
}

utils.isTruthy = function (thing) {
  // https://github.com/jasmine/jasmine/blob/master/src/core/matchers/toBeTruthy.js
  // http://nfriedly.com/techblog/2009/07/advanced-javascript-operators-and-truthy-falsy/
  return !!thing;
}

utils.isFalsy = function (thing) {
  // https://github.com/jasmine/jasmine/blob/master/src/core/matchers/toBeFalsy.js
  return !utils.isTruthy(thing);
}

utils.isDefined = function (thing) {
  // https://github.com/jasmine/jasmine/blob/master/src/core/matchers/toBeFalsy.js
  return utils.isFalsy(typeof thing === "undefined");
}

utils.makeRandomArray = function (config) {
  var conf = config || {};
  // need to be able to set to zero
  // http://stackoverflow.com/a/7615236/511710
  var precision = (!utils.isDefined(config.precision)) ? 2 : conf.precision;
  var multiplier = 100;
  var size = 100;
  var result = [];

  for (var i = size; i > 0; i -= 1) {
    result.push(parseFloat((Math.random() * multiplier).toFixed(precision)));
  }
  return result;
}


utils.simpleArrayFill = function (value,len) {
  // http://stackoverflow.com/a/20223361/511710
  //
  var A=[], i=0;
  while (i<len) A[i++]= value;
  return A;
}

utils.arrayDeepCopy = function(thing){
  // array slice is fine for just numbers. would need to use JSON method if needed objects
  // return JSON.parse(JSON.stringify(thing)) ;
  // http://davidwalsh.name/javascript-clone-array
  return thing.slice(0);
}
