// so things dont get dupped all over the place

module.exports.dsalgo = {utils: {}}

module.exports.dsalgo.utils.swap = function (list, firstIndex, secondIndex) {
  var temp = list[firstIndex];
  list[firstIndex] = list[secondIndex];
  list[secondIndex] = temp;
  return list;
}

module.exports.dsalgo.utils.makeRandomArray = function (config) {
  var conf = config || {};
  var precision = conf.precision || 2;
  var multiplier = 100;
  var size = 100;
  var result = [];

  for (var i = size; i > 0; i -= 1) {
    result.push(parseFloat((Math.random() * multiplier).toFixed(precision)));
  }
  return result;
}
