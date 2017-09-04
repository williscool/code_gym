var assert = require('assert');
var dsalgo = require('../../../utilities.js').default;
var IEEEConverter = require('../../../algorithms/bit_manipulation/floating_point.js');

describe("Floating Point", function() {
  it("Decimal to IEEE", function() {
    var dectoieee = IEEEConverter.dectoieee;

    assert.deepEqual(dectoieee("-5.75"), "11000000101110000000000000000000");
    assert.deepEqual(dectoieee("5.75"), "01000000101110000000000000000000");

    assert.deepEqual(dectoieee("-17.25"), "11000001100010100000000000000000");
    assert.deepEqual(dectoieee("17.25"), "01000001100010100000000000000000");

    assert.deepEqual(dectoieee("0.375"), "00111110110000000000000000000000");
    assert.deepEqual(dectoieee("0.0"), "00000000000000000000000000000000");
  });
  it("IEEE to Decimal", function() {
    var ieeetodec = IEEEConverter.ieeetodec;
    assert.deepEqual(ieeetodec("11000000101110000000000000000000"), "-5.75");
    assert.deepEqual(ieeetodec("11000001100010100000000000000000"), "-17.25");

    assert.deepEqual(ieeetodec("01000000101110000000000000000000"), "5.75");
    assert.deepEqual(ieeetodec("00111110110000000000000000000000"), "0.375");
  });
});
