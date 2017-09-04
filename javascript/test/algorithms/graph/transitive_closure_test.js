var assert = require('assert');
var dsalgo = require('../../../utilities.js').default;
var Graph = require('../../../data_structures/graph.js');
var TC = require('../../../algorithms/graph/transitive_clousure.js');

describe('Transitive Closure', function() {

  describe('correct detects', function() {

    var gd = dsalgo.utils.requireText(__dirname, '../../../data/graph/tinyDG.txt');

    var graph = new Graph({
      graphData: gd,
      directed: true
    });

    var tc =  TC(graph);
    // http://algs4.cs.princeton.edu/42digraph/TransitiveClosure.java.html
    it('whether vertices can reach each other ', function() {
      assert(tc[0][0]);
      assert(tc[8][8]);
      assert(!tc[2][9]);
      assert(tc[12][12]);
    });

  });

});
