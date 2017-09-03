import assert from 'assert';
import Stack from '../../data_structures/stack';

Object.keys(Stack).forEach((key) => {
  describe(`Stack with ${key}`, () => {
    describe('#push()', () => {
      const stack = new Stack[key]();
      it('stack has one item on it', () => {
        stack.push(42);
        assert.equal(0, stack.stack_top_index);
      });
    });

    describe('#peek()', () => {
      const stack = new Stack[key]();
      it('can show the value of the item on the top of the stack ', () => {
        stack.push(42);
        assert.equal(42, stack.peek());
      });
    });

    describe('#pop()', () => {
      const stack = new Stack[key]();
      stack.push(42);
      const num = stack.pop();

      it('correct number is returned from stack', () => {
        assert.equal(42, num);
      });

      it('zero items on stack', () => {
        assert.equal(-1, stack.stack_top_index);
      });

      it('works with more than one item on the stack', () => {
        stack.push(42).push(50).push(75);
        assert.equal(stack.pop(), 75);
        assert.equal(stack.pop(), 50);
      });
    });

    describe('#isEmpty()', () => {
      it('returns stack has one item on it', () => {
        const stack = new Stack[key]();
        stack.push(42).push(50);
        assert.equal(false, stack.isEmpty());
      });
      it('returns false when stack is empty', () => {
        const stack = new Stack[key]();
        stack.push(42).push(50);
        stack.pop();
        stack.pop();
        assert.equal(true, stack.isEmpty());
      });
    });
  });
});
