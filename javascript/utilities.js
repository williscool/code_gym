// so things dont get dupped all over the place

var fs = require('fs');
var resolve = require('path').resolve;
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

utils.arrayDeepCopy = function(thing){
  // array slice is fine for just numbers. would need to use JSON method if needed objects
  // return JSON.parse(JSON.stringify(thing)) ;
  // http://davidwalsh.name/javascript-clone-array
  return thing.slice(0);
}

utils.simpleArrayFill = function (value,len) {
  // http://stackoverflow.com/a/20223361/511710
  //
  var A=[], i=0;
  while (i<len) A[i++]= value;
  return A;
}

utils.makeNumberUnlessNaN = function (val) {
  var num = parseInt(val);

  if (!isNaN(num)) return num;
  return val;
}

utils.multilineString = function(f) {
  // http://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript/5571069#5571069
  return f.toString().
      replace(/^[^\/]+\/\*!?/, '').
      replace(/\*\/[^\/]+$/, '');
}

// http://stackoverflow.com/a/12834464/511710
utils.sortObjectByKey = function(obj) {
    var keys = Object.keys(obj).sort();
    var sorted_obj = {};

    // create new array based on Sorted Keys
    keys.forEach(function(key){
        sorted_obj[key] = obj[key];
    });

    return sorted_obj;
}

utils.requireText = function(dir , path) {
  
  if(arguments.length < 2) return Error("give me a file and a pathname or you are gonna have a bad time");

  // inspired by 
  //
  // http://stackoverflow.com/a/6832105/511710
  // http://stackoverflow.com/a/12753026/511710
  //
  // also you have to pass dir because if not you'd have to do all kinds of crazy shit to get resolve to use the right path
  // re: google "node resolve caller"
  //
 return fs.readFileSync(resolve(dir + "../" + path)).toString();
}

utils.simpleSet = function(){
  // http://stackoverflow.com/a/18890005/511710
  // https://github.com/mbostock/d3/blob/master/src/arrays/set.js#L10

  return Object.create(null);
}

utils.dec2bin = function(n){
  // http://stackoverflow.com/questions/9939760/how-do-i-convert-an-integer-to-binary-in-javascript/16155417#16155417
  return (n >>> 0).toString(2);
}
