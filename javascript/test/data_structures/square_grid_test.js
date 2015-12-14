var assert = require('assert');
// var assert = require('chai').assert
var SquareGrid = require('../../data_structures/square_grid.js');
var dsalgo = require('../../utilities.js').dsalgo;

describe('Square Grid', function() {

  it("throws an error if you dont provide dimensions", function() {
    assert.throws(function() {
      new SquareGrid();
    }, /height and width/);
  });

  describe('first grid diagram from the redblobgames tutorial', function() {
    var sg = new SquareGrid(30, 15);
    it("can create it period", function() {
      sg.add_rect(3, 3, 5, 12)
       .add_rect(13, 4, 15, 15)
       .add_rect(21, 0, 23, 7)
       .add_rect(23, 5, 26, 7);
    });

    it("text representation is correct", function() {
        var TEXT = dsalgo.utils.multilineString(function() {
/*!
. . . . . . . . . . . . . . . . . . . . . ####. . . . . . . 
. . . . . . . . . . . . . . . . . . . . . ####. . . . . . . 
. . . . . . . . . . . . . . . . . . . . . ####. . . . . . . 
. . . ####. . . . . . . . . . . . . . . . ####. . . . . . . 
. . . ####. . . . . . . . ####. . . . . . ####. . . . . . . 
. . . ####. . . . . . . . ####. . . . . . ##########. . . . 
. . . ####. . . . . . . . ####. . . . . . ##########. . . . 
. . . ####. . . . . . . . ####. . . . . . . . . . . . . . . 
. . . ####. . . . . . . . ####. . . . . . . . . . . . . . . 
. . . ####. . . . . . . . ####. . . . . . . . . . . . . . . 
. . . ####. . . . . . . . ####. . . . . . . . . . . . . . . 
. . . ####. . . . . . . . ####. . . . . . . . . . . . . . . 
. . . . . . . . . . . . . ####. . . . . . . . . . . . . . . 
. . . . . . . . . . . . . ####. . . . . . . . . . . . . . . 
. . . . . . . . . . . . . ####. . . . . . . . . . . . . . . 
*/
});

      assert.deepEqual(sg.toString(),TEXT);
    });
  });

});

