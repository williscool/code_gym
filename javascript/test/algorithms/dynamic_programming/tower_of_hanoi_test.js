import assert from 'assert';
import toh from '../../../algorithms/dynamic_programming/tower_of_hanoi';

describe('Tower of Hanoi', () => {
  it('3 disks', () => {
    const n = 3;
    const moves = toh(n, 1, 2, 3);
    console.log(moves);
    // console.log(moves.length);
    //
    // TODO: test the actual moves
    assert.equal(moves.length, (2 ** n) - 1);
  });
  it('5 disks', () => {
    const n = 5;
    const moves = toh(n, 1, 2, 3);
    // console.log(moves);
    // console.log(moves.length);
    //
    // TODO: test the actual moves
    assert.equal(moves.length, (2 ** n) - 1);
  });
});
