var assert = require('assert');
var BFS = require('../../../algorithms/graph/bfs.js');
var Graph = require('../../../data_structures/graph.js');
var dsalgo = require('../../../utilities.js').default;

describe('Breadth First Search', function() {

  describe('traverse graph', function() {
    var adjListToo = [
      [1],
      [0, 4, 5],
      [3, 4, 5],
      [2, 6],
      [1, 2],
      [1, 2, 6],
      [3, 5],
      []
    ];

    var graph = new Graph({
      adjList: adjListToo
    });

    var traversal = new BFS(graph, 3);
    var bfsInfo = traversal.info;

    it("marks source vertex's predecessor as null", function() {
      assert.deepEqual(bfsInfo[3], {
        distance: 0,
        predecessor: null
      });
    });

    it('goes in correct order', function() {

      assert.deepEqual(bfsInfo[0], {
        distance: 4,
        predecessor: 1
      });
      assert.deepEqual(bfsInfo[1], {
        distance: 3,
        predecessor: 4
      });
      assert.deepEqual(bfsInfo[2], {
        distance: 1,
        predecessor: 3
      });
      assert.deepEqual(bfsInfo[4], {
        distance: 2,
        predecessor: 2
      });
      assert.deepEqual(bfsInfo[5], {
        distance: 2,
        predecessor: 2
      });
      assert.deepEqual(bfsInfo[6], {
        distance: 1,
        predecessor: 3
      });
    });

    it('doesnt mark unconnected vertex', function() {
      assert.deepEqual(bfsInfo[7], {
        distance: null,
        predecessor: null
      });
    });

    it('traces a traversal path correctly', function() {
      assert.deepEqual(traversal.reconstruct_path(0), [3,2,4,1,0]);
    });

  });

});
