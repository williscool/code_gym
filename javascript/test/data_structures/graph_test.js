var assert = require('assert');
var Graph = require('../../data_structures/graph.js');
var dsalgo = require('../../utilities.js').dsalgo;

describe('Graph', function() {

  describe('constructor', function() {
    it("instantiates", function() {
      // as long as this doesn't blow up im happy
      var graph = new Graph();
    });

    it("throws an error if you ask for matrices without supplying a size", function() {
      assert.throws(function() {
        new Graph({
          enable_matrices: true
        });
      }, /maximum size/);
    });

    describe("can build from an adjacency_list", function() {
      it("correctly", function() {
        var adjList = [
          [1, 2, 3],
          [0],
          [0, 3],
          [0, 2]
        ];

        var graph = new Graph({
          adjList: adjList
        });

        assert.deepEqual(graph.adjacency_list, adjList);
      });

      it("with an unconnected vertex correctly", function() {
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

        assert.deepEqual(graph.adjacency_list, adjListToo);
      });
    });

    describe("can build from an edge weighted digraph", function() {

      var adjList = [[4, 2],
        [3],
        [7],
        [6],
        [5, 7],
        [4, 7, 1],
        [2, 0, 4],
        [5, 3]];

      var edgeSet = {
        '0,2': 0.26,
        '0,4': 0.38,
        '1,3': 0.29,
        '2,7': 0.34,
        '3,6': 0.52,
        '4,5': 0.35,
        '4,7': 0.37,
        '5,1': 0.32,
        '5,4': 0.35,
        '5,7': 0.28,
        '6,0': 0.58,
        '6,2': 0.4,
        '6,4': 0.93,
        '7,3': 0.39,
        '7,5': 0.28
      };


      it("string correctly", function() {

        // http://algs4.cs.princeton.edu/44sp/images/edge-weighted-digraph-representation.png
        // i.e. http://algs4.cs.princeton.edu/44sp/tinyEWD.txt
        // http://algs4.cs.princeton.edu/44sp/images/shortest-path.png
        var EWD = dsalgo.utils.multilineString(function() {
/*!
8
15
4 5 0.35
5 4 0.35
4 7 0.37
5 7 0.28
7 5 0.28
5 1 0.32
0 4 0.38
0 2 0.26
7 3 0.39
1 3 0.29
2 7 0.34
6 2 0.40
3 6 0.52
6 0 0.58
6 4 0.93
*/
});
        var graph = new Graph({
          ewg: EWD,
          directed: true
        });

        assert.deepEqual(graph.adjacency_list, adjList);
        assert.deepEqual(graph.edges, edgeSet);
      });

      it("file correctly", function() {

        var EWD = dsalgo.utils.requireText(__dirname, '../../data/graph/tinyEWD.txt');
        var graph = new Graph({
          ewg: EWD,
          directed: true
        });

        assert.deepEqual(graph.adjacency_list, adjList);
        assert.deepEqual(graph.edges, edgeSet);
      });
    });

    // http://algs4.cs.princeton.edu/41graph/
    describe("can build from an unweighted graph data type", function() {

      // http://algs4.cs.princeton.edu/41graph/images/adjacency-lists.png
      var adjList = [[6, 2, 1, 5],
        [0],
        [0],
        [5,4],
        [5, 6, 3],
        [3, 4, 0],
        [0, 4],
        [8],
        [7],
        [11,10, 12],
        [9],
        [9, 12],
        [11,9]];

      it("string correctly", function() {

        // http://algs4.cs.princeton.edu/41graph/images/graph-input.png
        // i.e. http://algs4.cs.princeton.edu/41graph/tinyG.txt
        // http://algs4.cs.princeton.edu/44sp/images/shortest-path.png
        var graphText = dsalgo.utils.multilineString(function() {
/*!
13
13
0 5
4 3
0 1
9 12
6 4
5 4
0 2
11 12
9 10
0 6
7 8
9 11
5 3
*/
});
        var graph = new Graph({
          graphData: graphText,
        });

        graph.adjacency_list.forEach(function(arr, i){
          assert.deepEqual(graph.adjacency_list[i].sort(), adjList[i].sort());
        });
      });

      it("file correctly", function() {

        var gd = dsalgo.utils.requireText(__dirname, '../../data/graph/tinyG.txt');
        var graph = new Graph({
          graphData: gd,
        });

        graph.adjacency_list.forEach(function(arr, i){
          assert.deepEqual(graph.adjacency_list[i].sort(), adjList[i].sort());
        });
      });
    });

    // http://algs4.cs.princeton.edu/42digraph/
    describe("can build from an unweighted digraph data type", function() {

      // http://algs4.cs.princeton.edu/42digraph/images/digraph-input.png
      var adjList = [
        [1, 5],
        [],
        [0,3],
        [2,5],
        [3,2],
        [4],
        [0,8,4,9],
        [9,6],
        [6],
        [10,11],
        [12],
        [12,4],
        [9]
      ];

      it("string correctly", function() {

        var graphText = dsalgo.utils.multilineString(function() {
/*!
13
22
 4  2
 2  3
 3  2
 6  0
 0  1
 2  0
11 12
12  9
 9 10
 9 11
 7  9
10 12
11  4
 4  3
 3  5
 6  8
 8  6
 5  4
 0  5
 6  4
 6  9
 7  6
*/
});
        var gt = new Graph({
          graphData: graphText,
          directed: true
        });

        gt.adjacency_list.forEach(function(arr, i){
          assert.deepEqual(gt.adjacency_list[i].sort(), adjList[i].sort());
        });
      });

      it("file correctly", function() {

        var gd = dsalgo.utils.requireText(__dirname, '../../data/graph/tinyDG.txt');

        var fileGraph = new Graph({
          graphData: gd,
          directed: true,
          reverse_adjacency_lists: true
        });

        fileGraph.adjacency_list.forEach(function(arr, i){
          assert.deepEqual(fileGraph.adjacency_list[i].sort(), adjList[i].sort());
        });
      });
    });

  });

  describe('Vertex Functions', function() {
    describe('#add_vertex() and #vertex_list()', function() {
      var graph = new Graph();
      graph.add_vertex(0);

      it("adds a vertex to the vertex_list", function() {
        assert(0 in graph.vertex_list());
      });

    });

    describe('#order()', function() {
      var graph = new Graph();
      graph.add_vertex(0);

      it("gives correct number of vertices", function() {
        assert.equal(graph.order(), 1);
      });
    });

    describe('degree', function() {
      var graph = new Graph();
      graph.add_edge(0, 1).add_edge(0, 2).add_edge(0, 3).add_edge(2, 3);

      describe("#vertex_out_degree()", function() {
        it("correctly reports values", function() {
          assert.equal(graph.vertex_out_degree(0), 3);
          assert.equal(graph.vertex_out_degree(1), 1);
          assert.equal(graph.vertex_out_degree(2), 2);
          assert.equal(graph.vertex_out_degree(3), 2);
        });

        it("returns false for invalid vertex", function() {
          assert.equal(graph.vertex_out_degree(23), false);
        });

        it("returns 0 for valid vertex but unconnected vertex", function() {
          graph.add_vertex(17);
          assert.equal(graph.vertex_out_degree(17), 0);
        });
      });

      describe("#vertex_in_degree()", function() {
        it("correctly reports values", function() {
          assert.equal(graph.vertex_in_degree(0), 3);
          assert.equal(graph.vertex_in_degree(1), 1);
          assert.equal(graph.vertex_in_degree(2), 2);
          assert.equal(graph.vertex_in_degree(3), 2);
        });

        it("returns false for invalid vertex", function() {
          assert.equal(graph.vertex_in_degree(23), false);
        });

        it("returns 0 for valid vertex but unconnected vertex", function() {
          graph.add_vertex(17);
          assert.equal(graph.vertex_in_degree(17), 0);
        });
      });

    });
  });

  describe('Edge Functions', function() {
    var graph = new Graph({
      enable_matrices: true,
      max_size: 4
    });

    describe('#add_edge()', function() {

      graph.add_edge(0, 1).add_edge(0, 2).add_edge(0, 3).add_edge(2, 3);

      it("adds vertices to the vertex_list", function() {
        assert.deepEqual(graph.vertex_list(), ["0", "1", "2", "3"]);
      });


      it("#size() is correct", function() {
        assert.equal(graph.size(), 4);
      });

      it("produces a correct adjacency_list", function() {
        var adjList = [
          [1, 2, 3],
          [0],
          [0, 3],
          [0, 2]
        ];

        assert.deepEqual(graph.adjacency_list, adjList);
      });

      it("produces a correct adjacency_matrix", function() {
        var adjMatrix = [
          [0, 1, 1, 1],
          [1, 0, 0, 0],
          [1, 0, 0, 1],
          [1, 0, 1, 0]
        ];

        assert.deepEqual(graph.adjacency_matrix, adjMatrix);
      });

      it("produces a correct edge_list", function() {
        var edgeList = [[0, 1], [0, 2], [0, 3], [2, 3]];

        assert.deepEqual(graph.edge_list, edgeList);
      });

      it("produces a correct incidence list", function() {
        var edgeMatrix = [
          [1, 1, 1, 0],
          [1, 0, 0, 0],
          [0, 1, 0, 1],
          [0, 0, 1, 1],
        ];
        assert.deepEqual(graph.edge_matrix, edgeMatrix);
      });

      it("produces a correct edge set", function() {
        var edgeSet = {
          "0,1": true,
          "0,2": true,
          "0,3": true,
          "2,3": true
        };
        assert.deepEqual(graph.edges, edgeSet);
      });

      it("supports edges with weights", function() {
        var graph = new Graph();
        graph.add_edge(30, 20, 112);
        assert.equal(112, graph.get_edge_weight(20, 30));
      });

    });

    describe('#set_edge_weight()', function() {
      var graph = new Graph();
      graph.add_edge(0, 1);

      it("updates the weight of a previously created edge", function() {
        graph.set_edge_weight(0, 1, 112);
        assert.equal(112, graph.get_edge_weight(0, 1));
      });
    });

    describe('#size()', function() {
      var graph = new Graph();
      graph.add_edge(0, 1);

      it("gives correct number of edges", function() {
        assert.equal(graph.size(), 1);
      });
    });

    describe('#edge_set_list() and #edge_key_vertex_*()', function() {
      var graph = new Graph();
      graph.add_edge(0, 1);
      var first_edge_key = graph.edge_set_list()[0];

      it("#edge_key_vertex_from", function() {
        assert.equal(graph.edge_key_vertex_from(first_edge_key), 0);
      });

      it("#edge_key_vertex_to", function() {
        assert.equal(graph.edge_key_vertex_to(first_edge_key), 1);
      });
    });

    describe('#get_edge_weight_by_key()', function() {
      var graph = new Graph();
      graph.add_edge(0, 1);
      var first_edge_key = graph.edge_set_list()[0];
      graph.set_edge_weight(0, 1, 112);

      it("updates the weight of a previously created edge", function() {
        assert.equal(112, graph.get_edge_weight_by_key(first_edge_key));
      });
    });

    describe('#edge_key_other_vertex()', function() {
      var graph = new Graph();
      graph.add_edge(0, 1);
      var first_edge_key = graph.edge_set_list()[0];

      it("gives the other vertex when given vertex from the edge", function() {
        assert.equal(graph.edge_key_other_vertex(first_edge_key, 0), 1);
        assert.equal(graph.edge_key_other_vertex(first_edge_key, 1), 0);
      });

      it("returns false when given an invalid vertex", function() {
        assert.equal(graph.edge_key_other_vertex(first_edge_key, 300), false);
      });
    });

  });

  describe('util functions', function() {
    describe('#hasCycle', function() {
      it("can tell if its cyclic", function() {

        var gd = dsalgo.utils.requireText(__dirname, '../../data/graph/tinyDG.txt');
        var fileGraph = new Graph({
          graphData: gd,
          directed: true
        });

         assert.equal(fileGraph.hasCycle(), true);
      });

      it("can tell if its not cyclic", function() {

        var gd = dsalgo.utils.requireText(__dirname, '../../data/graph/tinyDAG.txt');
        var fileGraph = new Graph({
          graphData: gd,
          directed: true
        });

         assert.equal(fileGraph.hasCycle(), false);
      });
    });

    describe('#components', function() {
      it("gives graph components", function() {

        var gd = dsalgo.utils.requireText(__dirname, '../../data/graph/tinyG.txt');
        var fileGraph = new Graph({
          graphData: gd,
        });

        assert.equal(fileGraph.components().length > 0,  true);
        assert.equal(fileGraph.components().length === 3,  true);
      });
    });
  });

});

