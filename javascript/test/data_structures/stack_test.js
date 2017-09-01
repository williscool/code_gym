import assert from 'assert';
import Stack from '../../data_structures/stack';

Object.keys(Stack).forEach(function(key) {

  describe('Stack with ' + key, function() {

    describe('#push()', function() {
      var stack = new Stack[key]();
      it("stack has one item on it", function() {
        stack.push(42);
        assert.equal(0, stack.stack_top_index);
      });
    });

    describe('#pop()', function() {
      var stack = new Stack[key]();
      stack.push(42);
      var num = stack.pop();

      it("correct number is returned from stack", function() {
        assert.equal(42, num);
      });

      it("zero items on stack", function() {
        assert.equal(-1, stack.stack_top_index);
      });

      it("works with more than one item on the stack", function() {
        stack.push(42).push(50).push(75);
        assert.equal(stack.pop(), 75);
        assert.equal(stack.pop(), 50);
      });
    });

    describe('#isEmpty()', function() {
      it("returns stack has one item on it", function() {
        var stack = new Stack[key]();
        stack.push(42).push(50);
        assert.equal(false, stack.isEmpty());
      });
      it("returns false when stack is empty", function() {
        var stack = new Stack[key]();
        stack.push(42).push(50);
        stack.pop();
        stack.pop();
        assert.equal(true, stack.isEmpty());
      });
    });

  });

});
