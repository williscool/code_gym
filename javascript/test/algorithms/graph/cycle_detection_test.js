var assert = require('assert');
var CycleDetectors = require('../../../algorithms/graph/cycle_detection.js');
var Graph = require('../../../data_structures/graph.js');
var dsalgo = require('../../../utilities.js').dsalgo;

Object.keys(CycleDetectors).forEach(function(key) {

  if(key == "utils") return;

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

      describe('in directed graphs ', function() {
        it("with a given start_vertex", function() {
          assert.equal(isCyclic(graphWithCycle, 1).length > 0, true);
        });

        it("with no given start_vertex", function() {
          assert.equal(isCyclic(graphWithCycle).length > 0, true);
        });

        describe("from a file", function() {

          var gd = dsalgo.utils.requireText(__dirname, '../../../data/graph/tinyDG.txt');
          var dg = new Graph({
            graphData: gd, 
            directed: true
          });

          describe("with a given start_vertex", function() {
            var cycle = isCyclic(dg , 4);
            assert.equal(cycle.length > 0, true);
          });

          it("with no given start_vertex", function() {
            assert.equal(isCyclic(dg).length > 0, true);
          });
        });
      });

      describe('in undirected graphs ', function() {
        var undirectedGraphWithCycle = new Graph({
          adjList: adjListwithCycle
        });

        it("with a given start_vertex", function() {
          assert.equal(isCyclic(undirectedGraphWithCycle , 1).length > 0, true);
        });

        it("with no given start_vertex", function() {
          assert.equal(isCyclic(undirectedGraphWithCycle).length > 0, true);
        });

        describe("from a file", function() {

          var gd = dsalgo.utils.requireText(__dirname, '../../../data/graph/tinyG.txt');
          var undirectedGraphFromFile = new Graph({
            graphData: gd
          });

          describe("with a given start_vertex", function() {
            var cycle = isCyclic(undirectedGraphFromFile , 0);
            assert.equal(cycle.length > 0, true);
            it("and returns the correct cycle", function() {
              assert.deepEqual(cycle[0].sort(), [3,4,5,3].sort());
            });
          });

          it("with no given start_vertex", function() {
            assert.equal(isCyclic(undirectedGraphFromFile).length > 0, true);
          });
        });

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

      describe('in directed graphs ', function() {
        it("with a given start_vertex", function() {
          var graphWithNoCycle = new Graph({
            adjList: adjListNoCycle,
            directed: true
          });

          assert.equal(isCyclic(graphWithNoCycle, 1), false);
        });

        it("with no start_vertex", function() {
          var graphWithNoCycle = new Graph({
            adjList: adjListNoCycle,
            directed: true
          });

          assert.equal(isCyclic(graphWithNoCycle), false);
        });

        describe("from a file", function() {

          var gd = dsalgo.utils.requireText(__dirname, '../../../data/graph/tinyDAG.txt');
          var dg = new Graph({
            graphData: gd, 
            directed: true
          });

          it("with no given start_vertex", function() {
            assert.equal(isCyclic(dg).length === 0, true);
          });
        });
      });

      describe('in undirected graphs ', function() {
        var undirectedGraphWithNoCycle = new Graph({
          adjList: adjListNoCycle
        });

        it("with a given start_vertex", function() {
          assert.equal(isCyclic(undirectedGraphWithNoCycle , 1), false);
        });

        it("with no given start_vertex", function() {
          assert.equal(isCyclic(undirectedGraphWithNoCycle), false);
        });
      });

    });

  });
});

describe('Cycle Dectector utils', function() {

  describe('Parellel Edge Detection', function() {
    var gd = dsalgo.utils.requireText(__dirname, '../../../data/graph/tinyG.txt');
    var parallelEdges = CycleDetectors.utils.parallelEdges;

    it('detects abscence of parallel edges', function() {
      var graph = new Graph({
        graphData: gd
      });

      assert.deepEqual(parallelEdges(graph), []);
      assert.equal(CycleDetectors.utils.hasParallelEdges(graph), false);
    });
    // http://algs4.cs.princeton.edu/41graph/images/graph-input.png
    // add dupes
    it('detects parallel edges', function() {

      var dupGraph = new Graph({
        graphData: gd
      });

      dupGraph.adjacency_list[0].push(1);
      dupGraph.adjacency_list[1].push(0);
      assert.deepEqual(parallelEdges(dupGraph), [1,0,1]);
      assert.equal(CycleDetectors.utils.hasParallelEdges(dupGraph), true);
    });
  });

  describe('Self Loop Detection', function() {
    var gd = dsalgo.utils.requireText(__dirname, '../../../data/graph/tinyG.txt');
    var selfLoop = CycleDetectors.utils.selfLoop;

    it('detects abscence of self loops', function() {
      var graph = new Graph({
        graphData: gd
      });

      assert.deepEqual(selfLoop(graph), []);
      assert.equal(CycleDetectors.utils.hasSelfLoop(graph), false);
    });
    // http://algs4.cs.princeton.edu/41graph/images/graph-input.png
    // add dupes
    it('detects self loops', function() {

      var dupGraph = new Graph({
        graphData: gd
      });

      dupGraph.adjacency_list[0].push(0);
      assert.deepEqual(selfLoop(dupGraph), [0,0]);
      assert.equal(CycleDetectors.utils.hasSelfLoop(dupGraph), true);
    });
  });

});
