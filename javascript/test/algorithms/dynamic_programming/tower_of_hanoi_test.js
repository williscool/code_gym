// inspired by: https://github.com/josdejong/mathjs/blob/master/test/function/probability/factorial.test.js

var assert = require('assert');
var toh = require('../../../algorithms/dynamic_programming/tower_of_hanoi.js');
describe("Tower of Hanoi", function() {
  it("3 disks", function() {
    var n = 3;
    var moves = toh(n, 1, 2, 3);
    // console.log(moves);
    // console.log(moves.length);
    //
    // TODO: test the actual moves
    assert.equal(moves.length, Math.pow(2, n) - 1);
  });
  it("5 disks", function() {
    var n = 5;
    var moves = toh(n, 1, 2, 3);
    // console.log(moves);
    // console.log(moves.length);
    //
    // TODO: test the actual moves
    assert.equal(moves.length, Math.pow(2, n) - 1);
  });
});
