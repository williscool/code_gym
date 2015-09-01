// https://en.wikipedia.org/wiki/Floating-point
// https://en.wikipedia.org/wiki/IEEE_floating_point
// https://en.wikipedia.org/wiki/Single-precision_floating-point_format
//
// "scientific notation in base 2 thats what floating point is"
//
// https://www.youtube.com/watch?v=PZRI1IfStY0&feature=youtu.be&t=265
//
// https://www.youtube.com/watch?v=yh2m7BSzRRo
// https://www.youtube.com/watch?v=TZI6Fd4WmIs
//
// http://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html
//
// https://en.wikipedia.org/wiki/Exponent_bias
// https://en.wikipedia.org/wiki/Offset_binary
//
// http://www.h-schmidt.net/FloatConverter/IEEE754.html
//
//  http://blog.chewxy.com/2014/02/24/what-every-javascript-developer-should-know-about-floating-point-numbers/
// http://bartaz.github.io/ieee754-visualization/
//
// also shout out cs 2110 from gatech for inspiration of the function interfaces  

// the exponent can be negative or positive in addition to whether the number itself is negative or positive
//
// https://en.wikipedia.org/wiki/Single-precision_floating-point_format#Converting_from_decimal_representation_to_binary32_format
//
// http://www.docjar.com/html/api/sun/misc/FloatingDecimal.java.html
//  http://steve.hollasch.net/cgindex/coding/ieeefloat.html
//  
// Lord it took me a lot of resources to understand this shit lol
//

var dsalgo = require('../../utilities.js').dsalgo;

function dectoieee(dec){

   var positive = true;

   if(dec.indexOf("-") > -1) {
     positive = false;
     // replace sign with nothing
     dec = dec.replace("-","");
   } 

   var decimalArray = dec.split(".");

   // http://math.stackexchange.com/questions/64042/what-are-the-numbers-before-and-after-the-decimal-point-referred-to-in-mathemati
   var integer = parseInt(decimalArray[0]);
   var fraction = decimalArray[1];

   if(!dsalgo.utils.isDefined(fraction)) {
     // no fractional part so zero
     fraction = 0;
   }

   // http://interactivepython.org/runestone/static/pythonds/BasicDS/ConvertingDecimalNumberstoBinaryNumbers.html
   var binary_integer = "";

   while(integer > 0) {
     // right shift by one is same as integer division by 2

     binary_integer += integer % 2;
     integer = integer >> 1;
   }

   var binary_fraction = "";

   // need to keep track of leading zeros so we can know when a place changes into integer
   var leading_zeros = [];
   var fraction_chars = fraction.split("");

   while(fraction_chars[0] == "0") {
      leading_zeros.push(fraction_chars.unshift(0));
   }

   // shift up significant figs so it doesnt confuse parseInt to think its an octal number
   var fractional_part = fraction.substr(leading_zeros.length);
   fractional_part = parseInt(fraction);

   var starting_string_of_fraction = fractional_part.toString();
   var current_string_of_fraction;
   var sig_bits_used = 0;

   // while the fractional_part is greater than zero and we haven't run out of bits to signify with
   while(fractional_part > 0 && sig_bits_used < 24) {

     // left shift by one is same as multiply by 2
     fractional_part = fractional_part << 1;
     current_string_of_fraction = fractional_part.toString();

     // we multiplied enough to get a one. drop the most significant bit and move on
     if(current_string_of_fraction.length > (starting_string_of_fraction.length + leading_zeros.length)){
       binary_fraction += '1';

       // drop the most significant figure
       fractional_part = parseInt(current_string_of_fraction.substr(1));
     } else {
       // we did not multiply enough to get a one so we put a zero and dont monkey with the fractional_part
       binary_fraction += '0';
     }

     sig_bits_used += 1;
   }

   // now that we have both the integer and fractional binary we need to move the floating point and bias the exponent


   var sign_bit = "0";
   if(!positive){ sign_bit = "1";}

   /*
    * several cases here
    *
    * 1. you have a binary integer part that is non zero. simple just take the substr(1) of it and add that to your binary fraction as your exponent
    * 2. you have a zero binary integer. in this case your have to move back
    *
    * */
   
   var mantissa;
   var exponent_num = 0;
   
   var INT_PART_ZERO = parseInt(decimalArray[0]) === 0;
   var FRACTION_PART_ZERO = parseInt(starting_string_of_fraction) === 0;

   if(!INT_PART_ZERO) {
       // since we have no leading zeros in our integer part we can assume that the shift we would need to make is just dropping the first 1
      exponent_num = binary_integer.substr(1).length;
      mantissa = binary_integer.substr(1) + binary_fraction;

   } else if ( INT_PART_ZERO && !FRACTION_PART_ZERO) {

      bin_fraction_chars = binary_fraction.split("");

      while(parseInt(bin_fraction_chars[0]) === 0) {
        bin_fraction_chars.unshift(0);
        exponent_num = exponent_num - 1;
      }

   } else {
      // fraction and integer part zero   
      // special case denoted by zeros for for everything
      exponent_num = 0;
      mantissa = 0;
   }


   // bias is 127
   var exponent = dsalgo.utils.dec2bin(exponent_num + 127); 

   if (INT_PART_ZERO && FRACTION_PART_ZERO) {
     // special case
      exponent = "00000000";
   }

   var possibly_short_ieee = sign_bit + exponent + mantissa;

   var ieee = possibly_short_ieee;

   if(possibly_short_ieee.length != 32){
      var extra_zeros = dsalgo.utils.simpleArrayFill(0 , 32 - possibly_short_ieee.length);
      ieee += extra_zeros.join("");
   }

   return ieee;
};

function ieeetodec(ieee){

  var dec = ieee;

  return dec;
};

module.exports = {
  dectoieee: dectoieee,
  ieeetodec: ieeetodec
};
