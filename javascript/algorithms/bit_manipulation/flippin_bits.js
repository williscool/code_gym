// https://en.wikipedia.org/wiki/Bit_manipulation
// https://www.youtube.com/watch?v=uUtb0BaeosQ
//
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators
// https://www.topcoder.com/community/data-science/data-science-tutorials/a-bit-of-fun-fun-with-bits/
//
// https://en.wikipedia.org/wiki/Two%27s_complement#Converting_from_two.27s_complement_representation

var dsalgo = require('../../utilities.js').default;

module.exports = function(a, b) {

  var flips = {};

  flips.binarya = dsalgo.utils.dec2bin(a);
  flips.binaryb = dsalgo.utils.dec2bin(b);

  flips.nota = ~a;
  flips.notb = ~b;

  flips.and = a & b;
  flips.or = a | b;
  flips.xor = a ^ b;

  flips.rightshifta_by_b = a >> b;
  flips.leftshifta_by_b = a << b;

  flips.logicalrightshifta_by_b = a >>> b;

  return flips;

};
