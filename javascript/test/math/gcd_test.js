var assert = require('assert');
var gcd = require('../../math/gcd.js');
describe("Greated Common Denominator",function(){
  it("should calculate the gcd of a number", function(){
    assert.equal(gcd(102,68), 34);
    assert.equal(gcd(12,8), 4);
  });
});
