var assert = require('assert');
var Stack = require('../../data_structures/stack/stack_with_linked_list.js');

describe('Stack with Linked List', function(){

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
});

