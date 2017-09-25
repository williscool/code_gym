import dsalgo from '../../utilities';
// bit manipulation is litterally the entire point of this module
/* eslint-disable no-bitwise  */

/**
 * Literally just a function that takes an a and b and does bit manipulations with the 2
 *
 * Pretty useless for all other purposes outside of learning
 *
 * https://en.wikipedia.org/wiki/Bit_manipulation
 * https://www.youtube.com/watch?v=uUtb0BaeosQ
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators
 * https://www.topcoder.com/community/data-science/data-science-tutorials/a-bit-of-fun-fun-with-bits/
 *
 * https://en.wikipedia.org/wiki/Two%27s_complement#Converting_from_two.27s_complement_representation
 *
 * @export
 * @param {number} a
 * @param {number} b
 * @returns {Object}
 */
export default function (a, b) {
  const flips = {};

  flips.binarya = dsalgo.utils.dec2bin(a);
  flips.binaryb = dsalgo.utils.dec2bin(b);

  flips.nota = ~a;
  flips.notb = ~b;

  flips.and = a & b;
  flips.or = a | b;
  flips.xor = a ^ b;

  flips.rightshifta_by_b = a >> b;
  flips.leftshifta_by_b = a << b;

  /**
   * Unlike an arithmetic shift, a logical shift does not preserve a number's sign bit or distinguish a number's exponent from its significand (mantissa);
   * every bit in the operand is simply moved a given number of bit positions, and the vacant bit-positions are filled, usually with zeros.
   */
  flips.logicalrightshifta_by_b = a >>> b;

  return flips;
}
