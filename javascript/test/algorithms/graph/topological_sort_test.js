var assert = require('assert');
var dsalgo = require('../../../utilities.js').default;
var Graph = require('../../../data_structures/graph.js').default;
var topoSort = require('../../../algorithms/graph/topological_sort.js');

describe('Topological Sort ', function() {

  describe('traverses graph', function() {

    it('errors for cylic graphs', function() {
      var cycleT = dsalgo.utils.requireText(__dirname, '../../../data/graph/tinyDG.txt');

      var cg = new Graph({
        graphData: cycleT,
        directed: true
      });

      assert.throws(function() {
        topoSort(cg);
      }, /cyclic/);
    });

    // http://algs4.cs.princeton.edu/42digraph/images/topological-sort.png
    var gd = dsalgo.utils.requireText(__dirname, '../../../data/graph/tinyDAG.txt');

    var graph = new Graph({
      graphData: gd,
      directed: true,
      reverse_adjacency_lists: true
    });

    var order = topoSort(graph);

    it('in correct order', function() {
      assert.deepEqual(order, [8,7,2,3,0,6,9,10,11,12,1,5,4]);
    });

    // http://www.geeksforgeeks.org/topological-sorting/
    var test = new Graph({
      directed: true
    });

    test.addEdge(5, 2);
    test.addEdge(5, 0);
    test.addEdge(4, 0);
    test.addEdge(4, 1);
    test.addEdge(2, 3);
    test.addEdge(3, 1);

    var otord = topoSort(test);
    it('in correct order in a graph thats made up', function() {
      assert.deepEqual(otord, [5,4,2,3,1,0]);
    });
  });

});
