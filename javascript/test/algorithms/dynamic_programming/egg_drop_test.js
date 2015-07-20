var assert = require('assert');
var naiveEggDrop = require('../../../algorithms/dynamic_programming/egg_drop.js').naive;
describe("Egg Drop Problem",function(){
  describe("Naive Solution",function(){
    it("2 eggs 6 floors", function(){
      assert.equal( naiveEggDrop(2,6) , 3);
    });
    it("2 eggs 10 floors", function(){
      assert.equal( naiveEggDrop(2,10) , 4);
    });
  });
});
