var assert = require('assert');
var CycleDetectors = require('../../../algorithms/graph/cycle_detection.js');
var Graph = require('../../../data_structures/graph.js');
var dsalgo = require('../../../utilities.js').dsalgo;

Object.keys(CycleDetectors).forEach(function(key) {

  describe(key + ' Cycle Dectector', function() {

    var isCyclic = CycleDetectors[key];

    describe('detects cycles', function() {
      // https://en.wikipedia.org/wiki/Depth-first_search#Output_of_a_depth-first_search
      // https://en.wikipedia.org/wiki/File:Tree_edges.svg
      var adjListwithCycle = [
        [], // make zero an un connected vertex so I can number stuff just like picture
        [2, 5, 8],
        [3],
        [4],
        [2],
        [6],
        [7,8]
      ];

      var graphWithCycle = new Graph({
        adjList: adjListwithCycle,
        directed: true
      });

      it("in directed graphs with a given start_vertex", function() {
        assert.equal(isCyclic(graphWithCycle, 1), true);
      });

      it("in directed graphs with no given start_vertex", function() {
        assert.equal(isCyclic(graphWithCycle), true);
      });

      var undirectedGraphWithCycle = new Graph({
        adjList: adjListwithCycle
      });

      it("in undirected graphs with a given start_vertex", function() {
        assert.equal(isCyclic(undirectedGraphWithCycle , 1), true);
      });

      it("in undirected graphs with no given start_vertex", function() {
        assert.equal(isCyclic(undirectedGraphWithCycle), true);
      });

    });

    describe('detects no cycles when there are none', function() {

      // http://en.wikipedia.org/wiki/Depth-first_search#/media/File:Depth-first-tree.svg
      //
      // directed version
      var adjListNoCycle = [
        [], // make zero an un connected vertex so I can number stuff just like picture
        [2, 7, 8],
        [3, 6],
        [4, 5],
        [],
        [],
        [],
        [],
        [9, 12],
        [10, 11],
        [],
        [],
        []
      ];

      it("in directed graphs with a given start_vertex", function() {
        var graphWithNoCycle = new Graph({
          adjList: adjListNoCycle,
          directed: true
        });

        assert.equal(isCyclic(graphWithNoCycle, 1), false);
      });

      it("in directed graphs with no start_vertex", function() {
        var graphWithNoCycle = new Graph({
          adjList: adjListNoCycle,
          directed: true
        });

        assert.equal(isCyclic(graphWithNoCycle), false);
      });

      var undirectedGraphWithNoCycle = new Graph({
        adjList: adjListNoCycle
      });

      it("in undirected graphs with a given start_vertex", function() {
        assert.equal(isCyclic(undirectedGraphWithNoCycle , 1), false);
      });

      it("in undirected graphs with no given start_vertex", function() {
        assert.equal(isCyclic(undirectedGraphWithNoCycle), false);
      });

    });

  });
});
