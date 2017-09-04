var assert = require('assert');
var dsalgo = require('../../../utilities.js').default;
var flippinBits = require('../../../algorithms/bit_manipulation/flippin_bits.js');

describe("Flipping Some Bits", function() {
  var fb = flippinBits(2, 4);

  it("Binary Representation", function() {
    assert.equal(fb.binarya, "10");
    assert.equal(fb.binaryb, "100");
  });

  it("Not", function() {
    assert.deepEqual(dsalgo.utils.dec2bin(fb.nota), "11111111111111111111111111111101");
    assert.deepEqual(dsalgo.utils.dec2bin(fb.notb), "11111111111111111111111111111011");
  });

  it("And", function() {
    assert.equal(fb.and, 0);
  });

  it("Or", function() {
    assert.equal(fb.or, 6);
  });

  it("Xor", function() {
    assert.equal(fb.or, 6);
  });

  it("right shift", function() {
    var fb = flippinBits(4, 2);
    assert.equal(fb.rightshifta_by_b, 1);
  });

  it("left shift", function() {
    var fb = flippinBits(4, 2);
    assert.equal(fb.leftshifta_by_b, 16);
  });

  it("logical right shift", function() {
    var fb = flippinBits(-8, 1);
    // leading zeros get dropped in the conversion
    assert.equal(dsalgo.utils.dec2bin(fb.logicalrightshifta_by_b), "1111111111111111111111111111100");
  });
});
