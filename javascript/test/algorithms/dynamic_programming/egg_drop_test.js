import assert from 'assert';
import EggDropTypes from '../../../algorithms/dynamic_programming/egg_drop';

const {
  naive: naiveEggDrop,
  top_down: topDown,
  bottom_up: bottomUp,
} = EggDropTypes;

describe('Egg Drop Problem', () => {
  describe('Naive Solution', () => {
    it('2 eggs 6 floors', () => {
      assert.equal(naiveEggDrop(2, 6), 3);
    });
    it('2 eggs 10 floors', () => {
      assert.equal(naiveEggDrop(2, 10), 4);
    });
  });

  describe('Top Down Dynamic Programming Solution', () => {
    it('2 eggs 6 floors', () => {
      assert.equal(topDown(2, 6), 3);
    });
    it('2 eggs 10 floors', () => {
      assert.equal(topDown(2, 10), 4);
    });
    it('2 eggs 36 floors', () => {
      assert.equal(topDown(2, 36), 8);
    });
    it('2 eggs 100 floors', () => {
      assert.equal(topDown(2, 100), 14);
    });
  });

  describe('Bottom Up Dynamic Programming Solution', () => {
    it('2 eggs 6 floors', () => {
      assert.equal(bottomUp(2, 6), 3);
    });
    it('2 eggs 10 floors', () => {
      assert.equal(bottomUp(2, 10), 4);
    });
    it('2 eggs 36 floors', () => {
      assert.equal(bottomUp(2, 36), 8);
    });
    it('2 eggs 100 floors', () => {
      assert.equal(bottomUp(2, 100), 14);
    });
  });
});
