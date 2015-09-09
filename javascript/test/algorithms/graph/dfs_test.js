var assert = require('assert');
var DFSContainer = require('../../../algorithms/graph/dfs.js');
var Graph = require('../../../data_structures/graph.js');
var dsalgo = require('../../../utilities.js').dsalgo;

(["iterative", "recursive"]).forEach(function(key) {

  describe(key + ' Depth First Search', function() {

    // iife
    var fn = (function functionPicker(key) {
      if (key == "recursive") {
        return DFSContainer.recursive_info;
      } else {
        return DFSContainer.iterative;
      }
    })();

    var DFS = fn;
    describe('traverse graph', function() {
      // http://en.wikipedia.org/wiki/Depth-first_search#/media/File:Depth-first-tree.svg
      var adjListToo = [
        [], // make zero an un connected vertex so I can number stuff just like picture
        [2, 7, 8],
        [1, 3, 6],
        [2, 4, 5],
        [3],
        [3],
        [2],
        [1],
        [1, 9, 12],
        [8, 10, 11],
        [9],
        [9],
        [8]
      ];

      var graph = new Graph({
        adjList: adjListToo
      });

      var dfsInfo = new DFS(graph, 1);

      it("marks source vertex's predecessor as null", function() {
        assert.deepEqual(dfsInfo[1], {
          visitedOrder: 1,
          predecessor: null,
          distance: 0,
          isVisited: true
        });
      });

      it('goes in correct order', function() {
        //dfsInfo.forEach(function(val,i){
        //  console.log("index: "+ i);
        //  console.log(val);
        //})
        assert.deepEqual(dfsInfo[2], {
          visitedOrder: 2,
          predecessor: 1,
          distance: 1,
          isVisited: true
        });
        assert.deepEqual(dfsInfo[3], {
          visitedOrder: 3,
          predecessor: 2,
          distance: 2,
          isVisited: true
        });
        assert.deepEqual(dfsInfo[11], {
          visitedOrder: 11,
          predecessor: 9,
          distance: 3,
          isVisited: true
        });
        assert.deepEqual(dfsInfo[12], {
          visitedOrder: 12,
          predecessor: 8,
          distance: 2,
          isVisited: true
        });
      });

      it('doesnt mark unconnected vertex', function() {
        assert.deepEqual(dfsInfo[0], {
          visitedOrder: null,
          predecessor: null,
          distance: null,
          isVisited: false
        });
      });

    });

  });
});
