var assert = require('assert');
// var assert = require('chai').assert
var SquareGrid = require('../../data_structures/square_grid.js');
var dsalgo = require('../../utilities.js').dsalgo;
var Graph = require('../../data_structures/graph.js');
var BFS = require('../../algorithms/graph/bfs.js');

describe('Square Grid', function() {

  it("throws an error if you dont provide dimensions", function() {
    assert.throws(function() {
      new SquareGrid();
    }, /height and width/);
  });

  describe('first grid diagram from the redblobgames tutorial', function() {

    it("can create it period", function() {
      var test_sg = new SquareGrid(30, 15);
      test_sg.add_rect(3, 3, 5, 12)
       .add_rect(13, 4, 15, 15)
       .add_rect(21, 0, 23, 7)
       .add_rect(23, 5, 26, 7);
      // if we made it here we are good
    });

    // need to keep the add_rect calls in the higher scope for rest of the test
    var sg = new SquareGrid(30, 15);
      sg.add_rect(3, 3, 5, 12)
       .add_rect(13, 4, 15, 15)
       .add_rect(21, 0, 23, 7)
       .add_rect(23, 5, 26, 7);

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

    describe("1d array index", function() {
      // (30 * 15) - 1 = 449
      it("can create an int id and and retrieve a location from it", function() {
        assert.equal(sg.locationToNumber(0,0), 0);
        assert.deepEqual(sg.numberToLocation(0), [0,0]);

        assert.equal(sg.locationToNumber(29,14), 449 );
        assert.deepEqual(sg.numberToLocation(449), [29, 14]);
      });

      it("properly detects a location's status", function() {

        var testX = sg.numberToLocation(449)[0];
        var testY = sg.numberToLocation(449)[1];
        
        assert.equal(sg.passable(testX,testY), true );

        var intID = sg.locationToNumber(21,0);

        var testX2 = sg.numberToLocation(intID)[0];
        var testY2 = sg.numberToLocation(intID)[1];
        
        assert.equal(sg.passable(testX2,testY2), false );

        var intIDagain = sg.locationToNumber(3,3);

        var testX3 = sg.numberToLocation(intIDagain)[0];
        var testY3 = sg.numberToLocation(intIDagain)[1];
        
        assert.equal(sg.passable(testX3,testY3), false );
      });
    });

    var adjList = sg.neighborsToAdjacencyList();

    describe("can build an adjacency_list", function() {

      it("correctly", function() {
        
        var locationArr = sg.numberToLocation(adjList[0][0]);
        var locX = locationArr[0];
        var locY = locationArr[1];
        assert.equal(sg.passable(locX, locY), true );
      });

      it("and does not add non passable wall edges to adjacency_list", function() {
        var numberNextToWall = sg.locationToNumber(3,2);
        var wallNumber = sg.locationToNumber(3,3);

        assert.equal(adjList[numberNextToWall].indexOf(wallNumber), -1 );
      });
    });

    describe("traversals", function() {
      var graph = new Graph({
        directed: true,
        adjList: adjList
      });

      it("bfs", function() {

        var start_number = sg.locationToNumber(8,7) ;

        var traversal = new BFS(graph, start_number);

        var bfsTEXT = dsalgo.utils.multilineString(function() {
/*!
→ → → → ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ← ← ← ← ← ####↓ ↓ ↓ ↓ ↓ ↓ ↓ 
→ → → → → ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ← ← ← ← ← ← ####↓ ↓ ↓ ↓ ↓ ↓ ↓ 
→ → → → → ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ← ← ← ← ← ← ← ####→ ↓ ↓ ↓ ↓ ↓ ↓ 
→ → ↑ ####↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ← ← ← ← ← ← ← ← ####→ → ↓ ↓ ↓ ↓ ↓ 
→ ↑ ↑ ####→ ↓ ↓ ↓ ↓ ↓ ↓ ← ####↑ ← ← ← ← ← ####→ → → ↓ ↓ ↓ ↓ 
↑ ↑ ↑ ####→ → ↓ ↓ ↓ ↓ ← ← ####↑ ↑ ← ← ← ← ##########↓ ↓ ↓ ← 
↑ ↑ ↑ ####→ → → ↓ ↓ ← ← ← ####↑ ↑ ↑ ← ← ← ##########↓ ↓ ← ← 
↑ ↑ ↑ ####→ → → A ← ← ← ← ####↑ ↑ ↑ ↑ ← ← ← ← ← ← ← ← ← ← ← 
↓ ↓ ↓ ####→ → ↑ ↑ ↑ ← ← ← ####↑ ↑ ↑ ↑ ↑ ← ← ← ← ← ← ← ← ← ← 
↓ ↓ ↓ ####→ ↑ ↑ ↑ ↑ ↑ ← ← ####↑ ↑ ↑ ↑ ↑ ↑ ← ← ← ← ← ← ← ← ← 
↓ ↓ ↓ ####↑ ↑ ↑ ↑ ↑ ↑ ↑ ← ####↑ ↑ ↑ ↑ ↑ ↑ ↑ ← ← ← ← ← ← ← ← 
→ ↓ ↓ ####↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ####↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ← ← ← ← ← ← ← 
→ → → → → ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ####↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ← ← ← ← ← ← 
→ → → → ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ####↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ← ← ← ← ← 
→ → → ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ####↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ← ← ← ← 
*/
});

        var toStr = sg.toString({
          point_to : traversal.info,
          start : start_number,
        });

        assert.deepEqual(toStr, bfsTEXT);

      });

      it("bfs early exit", function() {
        var start_number = sg.locationToNumber(8,7) ;
        var end_number = sg.locationToNumber(17,2) ;

        var early_exit_traversal = new BFS(graph, start_number, function(v){
          return v === end_number;
        });

        var earlyExitTEXT = dsalgo.utils.multilineString(function() {
/*!
. → → → ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ← . . . . ####. . . . . . . 
→ → → → → ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ← ← ← . . . ####. . . . . . . 
→ → → → → ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ← ← ← Z . . . ####. . . . . . . 
→ → ↑ ####↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ← ← ← ← ← ← . . ####. . . . . . . 
. ↑ ↑ ####→ ↓ ↓ ↓ ↓ ↓ ↓ ← ####↑ ← ← . . . ####. . . . . . . 
. . ↑ ####→ → ↓ ↓ ↓ ↓ ← ← ####↑ ↑ . . . . ##########. . . . 
. . . ####→ → → ↓ ↓ ← ← ← ####↑ . . . . . ##########. . . . 
. . . ####→ → → A ← ← ← ← ####. . . . . . . . . . . . . . . 
. . . ####→ → ↑ ↑ ↑ ← ← ← ####. . . . . . . . . . . . . . . 
. . ↓ ####→ ↑ ↑ ↑ ↑ ↑ ← ← ####. . . . . . . . . . . . . . . 
. ↓ ↓ ####↑ ↑ ↑ ↑ ↑ ↑ ↑ ← ####. . . . . . . . . . . . . . . 
→ ↓ ↓ ####↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ####. . . . . . . . . . . . . . . 
→ → → → → ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ####. . . . . . . . . . . . . . . 
→ → → → ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ####. . . . . . . . . . . . . . . 
. → → ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ####. . . . . . . . . . . . . . . 
*/
});

        var earlyToStr = sg.toString({
          point_to : early_exit_traversal.info,
          start : start_number,
          goal : end_number,
        });

        assert.deepEqual(earlyToStr , earlyExitTEXT);

      });

    });

  });

});

