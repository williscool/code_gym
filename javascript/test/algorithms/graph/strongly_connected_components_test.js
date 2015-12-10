var assert = require('assert');
var dsalgo = require('../../../utilities.js').dsalgo;
var Graph = require('../../../data_structures/graph.js');
var naiveSCC = require('../../../algorithms/graph/strongly_connected_components.js').naive;

describe('Strongly Connected Components', function() {

  describe('correct detects', function() {

    var gd = dsalgo.utils.requireText(__dirname, '../../../data/graph/tinyDG.txt');

    var graph = new Graph({
      graphData: gd,
      directed: true
    });
    
    var components = naiveSCC(graph);

    // http://algs4.cs.princeton.edu/42digraph/BruteSCC.java.html
    it('whether vertices are strongly_connected_components', function() {
      assert.deepEqual(components.sort(),[
        [0,2,3,4,5],
        [1],
        [6,8],
        [7],
        [9,10,11,12]
      ]);
    });

  });

});
