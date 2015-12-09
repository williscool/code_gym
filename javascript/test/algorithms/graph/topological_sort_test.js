var assert = require('assert');
var dsalgo = require('../../../utilities.js').dsalgo;
var Graph = require('../../../data_structures/graph.js');
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
      directed: true
    });

    // TODO: figure out why the fuck I had to do this for this
    // guess? toposort orders are not necessarily unique and the one from the princeton course stuff depends on some order that is imergent from the java data structures they use
    graph.adjacency_list.forEach(function(arr){
      arr.reverse();
    });

    console.log(graph.adjacency_list)

    var order = topoSort(graph);

    it('in correct order', function() {
      assert.deepEqual(order, [8,7,2,3,0,6,9,10,11,12,1,5,4]);
    });

    // http://www.geeksforgeeks.org/topological-sorting/
    var test = new Graph({
      directed: true
    });

    test.add_edge(5, 2);
    test.add_edge(5, 0);
    test.add_edge(4, 0);
    test.add_edge(4, 1);
    test.add_edge(2, 3);
    test.add_edge(3, 1);

    var otord = topoSort(test);
    it('in correct order in a graph thats made up', function() {
      assert.deepEqual(otord, [5,4,2,3,1,0]);
    });
  });

});
