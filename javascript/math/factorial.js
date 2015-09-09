module.exports = function(n) {

  if (n === 0) return 1;

  var result = n;

  for (var i = n - 1; i > 0; i--) {
    result = result * i;
  }

  return result;
};
