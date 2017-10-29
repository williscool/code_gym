var assert = require('assert');
var intToBinFns = require('../../../algorithms/bit_manipulation/integer_to_binary.js');

Object.keys(intToBinFns).forEach(function(key) {
   it(key +  " Integer to Binary", function() {
    var intToBin = intToBinFns[key];
    assert.deepEqual( intToBin(4) , "100" );
    assert.deepEqual( intToBin(8) , "1000" );
    assert.deepEqual( intToBin(366) , "101101110" );
  });
});
