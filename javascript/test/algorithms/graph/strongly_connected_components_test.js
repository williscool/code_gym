var assert = require('assert');
var dsalgo = require('../../../utilities.js').default;
var Graph = require('../../../data_structures/graph.js');
var SCC = require('../../../algorithms/graph/strongly_connected_components.js');


Object.keys(SCC).forEach(function(key) {
  var sccFn = SCC[key];

  describe( key + ' Strongly Connected Components algorithm', function() {

    describe('correcty detects', function() {

      var gd = dsalgo.utils.requireText(__dirname, '../../../data/graph/tinyDG.txt');

      var graph = new Graph({
        graphData: gd,
        directed: true,
        reverse_adjacency_lists: true
      });

      var components = sccFn(graph);

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

});
