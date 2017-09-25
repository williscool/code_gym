import dsalgo from '../../utilities';
// bit manipulation is a central point of this module
// camelcasing is also not useful here as 1) its consitent throughout the file. 2) this was not used anywhere else just for learning here
/* eslint-disable no-bitwise, camelcase  */

/**
 *  https://en.wikipedia.org/wiki/Floating-point
 *  https://en.wikipedia.org/wiki/IEEE_floating_point
 *  https://en.wikipedia.org/wiki/Single-precision_floating-point_format
 *
 *  "scientific notation in base 2 thats what floating point is"
 *
 *  - Floating Point Numbers - Computerphile
 *  https://www.youtube.com/watch?v=PZRI1IfStY0&feature=youtu.be&t=265
 *
 *  https://www.youtube.com/watch?v=yh2m7BSzRRo
 *  https://www.youtube.com/watch?v=TZI6Fd4WmIs
 *
 *  http://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html
 *
 *  https://en.wikipedia.org/wiki/Exponent_bias
 *  https://en.wikipedia.org/wiki/Offset_binary
 *
 * Flip the bits and add one. That's two compliment binary
 *
 *  http://www.h-schmidt.net/FloatConverter/IEEE754.html
 *
 *   http://blog.chewxy.com/2014/02/24/what-every-javascript-developer-should-know-about-floating-point-numbers/
 *  http://bartaz.github.io/ieee754-visualization/
 *
 *  also shout out cs 2110 from gatech for inspiration of the function interfaces
 *
 *  the exponent can be negative or positive in addition to whether the number itself is negative or positive
 *
 *  https://en.wikipedia.org/wiki/Single-precision_floating-point_format#Converting_from_decimal_representation_to_binary32_format
 *
 *  http://www.docjar.com/html/api/sun/misc/FloatingDecimal.java.html
 *   http://steve.hollasch.net/cgindex/coding/ieeefloat.html
 *
 *  Lord it took me a lot of resources to understand this shit lol
 *
 *  doesn't handle lots of edge and corner cases but is fine for educational purposes
 *
 * @module IEEEConverter
 * @module FloatingPoint
 */

/**
  * This function transforms a string representing a decimal number to its ieee floating binary representation as a string
  *
  * @param {string} decInput
  * @returns {string}
  */
function dectoieee(decInput) {
  let positive = true;
  let dec = decInput.slice(0); // operate on a copy of the input string

  if (dec.indexOf('-') > -1) {
    positive = false;
    // replace sign with nothing
    dec = dec.replace('-', '');
  }

  const decimalArray = dec.split('.');

  // http://math.stackexchange.com/questions/64042/what-are-the-numbers-before-and-after-the-decimal-point-referred-to-in-mathemati
  let integer = parseInt(decimalArray[0], 10);
  let fraction = decimalArray[1];

  if (!dsalgo.utils.isDefined(fraction)) {
    // no fractional part so zero
    fraction = 0;
  }

  // http://interactivepython.org/runestone/static/pythonds/BasicDS/ConvertingDecimalNumberstoBinaryNumbers.html
  let binary_integer = '';

  while (integer > 0) {
    // right shift by one is same as integer division by 2

    binary_integer += integer % 2;
    integer >>= 1;
  }

  let binary_fraction = '';

  // need to keep track of leading zeros so we can know when a place changes into integer
  const leading_zeros = [];
  const fraction_chars = fraction.split('');

  while (fraction_chars[0] === '0') {
    leading_zeros.push(fraction_chars.shift(0));
  }

  // shift up significant figs so it doesnt confuse parseInt to think its an octal number
  let fractional_part = fraction.substr(leading_zeros.length);
  fractional_part = parseInt(fraction, 10);

  const starting_string_of_fraction = fractional_part.toString();
  let current_string_of_fraction;
  let sig_bits_used = 0;

  // while the fractional_part is greater than zero and we haven't run out of bits to signify with
  while (fractional_part > 0 && sig_bits_used < 24) {
    // left shift by one is same as multiply by 2
    fractional_part <<= 1;
    current_string_of_fraction = fractional_part.toString();

    // we multiplied enough to get a one. drop the most significant bit and move on
    if (current_string_of_fraction.length > (starting_string_of_fraction.length + leading_zeros.length)) {
      binary_fraction += '1';

      // drop the most significant figure
      fractional_part = parseInt(current_string_of_fraction.substr(1), 10);
    } else {
      // we did not multiply enough to get a one so we put a zero and dont monkey with the fractional_part
      binary_fraction += '0';
    }

    sig_bits_used += 1;
  }

  // now that we have both the integer and fractional binary we need to move the floating point and bias the exponent

  let sign_bit = '0';
  if (!positive) {
    sign_bit = '1';
  }

  /*
   * several cases here
   *
   * 1. you have a binary integer part that is non zero. simple just take the substr(1) of it and add that to your binary fraction as your exponent
   * 2. you have a zero binary integer. in this case your have to move back
   *
   * */

  let mantissa;
  let exponent_num = 0;

  const INT_PART_ZERO = parseInt(decimalArray[0], 10) === 0;
  const FRACTION_PART_ZERO = parseInt(starting_string_of_fraction, 10) === 0;

  if (!INT_PART_ZERO) {
    // since we have no leading zeros in our integer part we can assume that the shift we would need to make is just dropping the first 1
    exponent_num = binary_integer.substr(1).length;
    mantissa = binary_integer.substr(1) + binary_fraction;
  } else if (INT_PART_ZERO && !FRACTION_PART_ZERO) {
    // will have to move over an extra one in the end because we drop the leading one
    exponent_num = -1;

    const bin_fraction_chars = binary_fraction.split('');

    while (parseInt(bin_fraction_chars[0], 10) === 0) {
      bin_fraction_chars.shift(0);
      exponent_num -= 1;
    }

    mantissa = bin_fraction_chars.join('').substr(1);
  } else {
    // fraction and integer part zero
    // special case denoted by zeros for for everything
    exponent_num = 0;
    mantissa = 0;
  }

  // bias is 127
  let exponent = dsalgo.utils.dec2bin(exponent_num + 127);
  let extra_zeros;

  if (INT_PART_ZERO && FRACTION_PART_ZERO) {
    // special case
    exponent = '00000000';
  }

  // ieee single precision
  // need this cuz js drops leading zero
  if (exponent.length !== 8) {
    extra_zeros = dsalgo.utils.simpleArrayFill(0, 8 - exponent.length);
    exponent = extra_zeros.join('') + exponent;
  }

  const possibly_short_ieee = sign_bit + exponent + mantissa;

  let ieee = possibly_short_ieee;

  if (possibly_short_ieee.length !== 32) {
    extra_zeros = dsalgo.utils.simpleArrayFill(0, 32 - possibly_short_ieee.length);
    ieee += extra_zeros.join('');
  }

  return ieee;
}

/**
 * Translates a string representing an ieee floating point binary number into its decimal form in a string
 *
 * https://en.wikipedia.org/wiki/Single-precision_floating-point_format#Converting_from_single-precision_binary_to_decimal
 *
 * @param {string} ieee
 * @returns {string}
 */
function ieeetodec(ieee) {
  const numbers = ieee.split('');

  const sign_bit = numbers[0];
  const ieee_exponent = numbers.slice(1, 9);
  const ieee_mantissa = numbers.slice(9, 32);
  let integer;
  let fraction;
  let decimal_integer;
  let decimal_fraction;

  // http://stackoverflow.com/questions/10258828/how-to-convert-binary-string-to-decimal
  const exponent_shift = parseInt(ieee_exponent.join(''), 2) - 127;

  // add back the one that gets removed in conversion
  const binary_mantissa = [1].concat(ieee_mantissa);

  if (exponent_shift > 0) {
    // array slice is not inclusive of second param so we need to add one
    integer = binary_mantissa.slice(0, exponent_shift + 1);
    // array slice is inclusive of first param so add one here too
    fraction = binary_mantissa.slice(exponent_shift + 1, binary_mantissa.length);
    decimal_integer = parseInt(integer.join(''), 2);
  } else {
    integer = 0;
    decimal_integer = 0;

    // we start multiply at the .5 place so we add one less zero than would be needed for the full shift... I think
    const extra_zeros = dsalgo.utils.simpleArrayFill(0, Math.abs(exponent_shift) - 1);
    fraction = extra_zeros.concat(binary_mantissa);
  }

  // init fraction value
  decimal_fraction = 0;

  let value_at_place = 0.5;

  while (fraction.length > 0) {
    const num = fraction.shift();

    decimal_fraction += num * value_at_place;
    value_at_place /= 2;
  }

  let dec = decimal_integer + decimal_fraction;

  if (parseInt(sign_bit, 10) === 1) {
    dec = `-${dec}`;
  }

  return dec;
}

export default {
  dectoieee,
  ieeetodec,
};
