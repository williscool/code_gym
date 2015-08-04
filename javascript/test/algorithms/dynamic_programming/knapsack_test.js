// inspired by: http://www.geeksforgeeks.org/dynamic-programming-set-10-0-1-knapsack-problem/
var assert = require('assert');
var naiveKnapsack = require('../../../algorithms/dynamic_programming/knapsack.js').naive;
var topDownKnapsack = require('../../../algorithms/dynamic_programming/knapsack.js').top_down;
var bottomUpKnapsack = require('../../../algorithms/dynamic_programming/knapsack.js').bottom_up;

describe("Knapsack Problem",function(){
  describe("Naive Solution",function(){
    it("capacity=50 values=[60,100,120] weights=[10,20,30]", function(){
      var W,weights,values;

      W = 50;
      values = [60,100,120];
      weights = [10,20,30];

      assert.equal( naiveKnapsack(W, weights, values, values.length) , 220);
    });
  });

  describe("TopDown Solution",function(){
    it("capacity=50 values=[60,100,120] weights=[10,20,30]", function(){
      var W,weights,values;

      W = 50;
      values = [60,100,120];
      weights = [10,20,30];

      assert.equal( topDownKnapsack(W, weights, values, values.length) , 220);
    });
  });

  describe("Bottom Up Solution",function(){
    it("capacity=50 values=[60,100,120] weights=[10,20,30]", function(){
      var W,weights,values;

      W = 50;
      values = [60,100,120];
      weights = [10,20,30];

      assert.equal( bottomUpKnapsack(W, weights, values, values.length) , 220);
    });
  });
});
