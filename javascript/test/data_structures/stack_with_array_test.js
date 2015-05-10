var assert = require('assert');
var Stack = require('../../data_structures/stack/stack_with_array.js');


describe('Stack with Array', function(){

  describe('#push()', function(){
    var stack = new Stack();
    it("stack has one item on it", function(){
      stack.push(42);
      assert.equal(0, stack.stack_top_index);
    });
  });

  describe('#pop()', function(){
    var stack = new Stack();
      stack.push(42);
    var num = stack.pop();
    it("correct number is returned from stack", function(){
      assert.equal(42, num);
    });

    it("zero items on stack", function(){
      assert.equal(-1, stack.stack_top_index);
    });
  });

  describe('#isEmpty()', function(){
    it("returns stack has one item on it", function(){
      var stack = new Stack();
      stack.push(42).push(50);
      assert.equal(false, stack.isEmpty());
    });
    it("returns false when stack is empty", function(){
      var stack = new Stack();
      stack.push(42).push(50);
      stack.pop();
      stack.pop();
      assert.equal(true, stack.isEmpty());
    });
  });

});

