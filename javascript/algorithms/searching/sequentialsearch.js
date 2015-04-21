// http://en.wikipedia.org/wiki/Linear_search
module.exports = function (list, needle) {
  var len = list.length, i;
  
  i = 0;
  while (i < len) {
    // if we find the value return its index
    if (list[i] == needle) return i;
    i++;
  }

  // if not return false
  return false;
};
