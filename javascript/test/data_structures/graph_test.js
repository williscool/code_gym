var assert = require('assert');
var Graph = require('../../data_structures/graph.js');
var dsalgo = require('../../utilities.js').dsalgo;

describe('Graph', function(){

  describe('constructor', function(){
    it("instantiates", function(){
      // as long as this doesn't blow up im happy
      var graph = new Graph();
    });

    it("throws an error if you ask for matrices without supplying a size", function(){
      assert.throws(function(){
        new Graph({
          enable_matrices : true
        });
      }, /maximum size/);
    });

    describe("can build from an adjacency_list", function(){
        it("correctly", function(){
         var adjList = [
            [1,2,3], 
            [0], 
            [0,3], 
            [0,2]
            ]; 
          
          var graph = new Graph({
              adjList : adjList
            });
          
          assert.deepEqual(graph.adjacency_list, adjList);
        });

        it("with an unconnected vertex correctly", function(){
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
              adjList : adjListToo
            });
          
          assert.deepEqual(graph.adjacency_list, adjListToo);
        });
    });

    describe("can build from an edge weighted digraph", function(){
          
          var adjList = [ [ 4, 2 ],
                          [ 3 ],
                          [ 7 ],
                          [ 6 ],
                          [ 5, 7 ],
                          [ 4, 7, 1 ],
                          [ 2, 0, 4 ],
                          [ 5, 3 ] ];

          var edgeSet = { 
                      '02': 0.26,
                      '04': 0.38,
                      '13': 0.29,
                      '27': 0.34,
                      '36': 0.52,
                      '45': 0.35,
                      '47': 0.37,
                      '51': 0.32,
                      '54': 0.35,
                      '57': 0.28,
                      '60': 0.58,
                      '62': 0.4,
                      '64': 0.93,
                      '73': 0.39,
                      '75': 0.28
                    };


        it("string correctly", function(){
          
// http://algs4.cs.princeton.edu/44sp/images/edge-weighted-digraph-representation.png
// i.e. http://algs4.cs.princeton.edu/44sp/tinyEWD.txt
// http://algs4.cs.princeton.edu/44sp/images/shortest-path.png
         var EWD = dsalgo.utils.multilineString(function(){/*!
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
*/});
          var graph = new Graph({
              directed : true,
              ewd : EWD
            });
          
          assert.deepEqual(graph.adjacency_list, adjList);
          assert.deepEqual(graph.edges, edgeSet);
        });

        it("file correctly", function(){
          
         var EWD = dsalgo.utils.requireText(__dirname, '../../data/graph/tinyEWD.txt');
          var graph = new Graph({
              directed : true,
              ewd : EWD
            });
          
          assert.deepEqual(graph.adjacency_list, adjList);
          assert.deepEqual(graph.edges, edgeSet);
        });
    });

  });

  describe('Vertex Functions', function(){
    describe('#add_vertex() and #vertex_list()', function(){
      var graph = new Graph();
      graph.add_vertex(0);

      it("adds a vertex to the vertex_list", function(){
        assert(0 in graph.vertex_list());
      });

    });

    describe('#order()', function(){
      var graph = new Graph();
      graph.add_vertex(0);

      it("gives correct number of vertices", function(){
        assert.equal(graph.order(),1);
      });
    });

    describe('degree', function(){
      var graph = new Graph();
      graph.add_edge(0,1).add_edge(0,2).add_edge(0,3).add_edge(2,3);

      describe("#vertex_out_degree()", function(){
        it("correctly reports values", function(){
          assert.equal(graph.vertex_out_degree(0),3);
          assert.equal(graph.vertex_out_degree(1),1);
          assert.equal(graph.vertex_out_degree(2),2);
          assert.equal(graph.vertex_out_degree(3),2);
        });

        it("returns false for invalid vertex", function(){
          assert.equal(graph.vertex_out_degree(23), false);
        });

        it("returns 0 for valid vertex but unconnected vertex", function(){
          graph.add_vertex(17);
          assert.equal(graph.vertex_out_degree(17), 0);
        });
      });

      describe("#vertex_in_degree()", function(){
        it("correctly reports values", function(){
          assert.equal(graph.vertex_in_degree(0),3);
          assert.equal(graph.vertex_in_degree(1),1);
          assert.equal(graph.vertex_in_degree(2),2);
          assert.equal(graph.vertex_in_degree(3),2);
        });

        it("returns false for invalid vertex", function(){
          assert.equal(graph.vertex_in_degree(23), false);
        });

        it("returns 0 for valid vertex but unconnected vertex", function(){
          graph.add_vertex(17);
          assert.equal(graph.vertex_in_degree(17), 0);
        });
      });

    });
  });

  describe('Edge Functions', function(){
    var graph = new Graph({
      enable_matrices: true,
      max_size: 4
    });

    describe('#add_edge()', function(){

      graph.add_edge(0,1).add_edge(0,2).add_edge(0,3).add_edge(2,3);

      it("adds vertices to the vertex_list", function(){
        assert.deepEqual(graph.vertex_list(), ["0","1","2","3"]);
      });


      it("#size() is correct", function(){
        assert.equal(graph.size(), 4);
      });

      it("produces a correct adjacency_list", function(){
       var adjList = [
          [1,2,3], 
          [0], 
          [0,3], 
          [0,2]
          ]; 

        assert.deepEqual(graph.adjacency_list, adjList);
      });

      it("produces a correct adjacency_matrix", function(){
        var adjMatrix = [
            [0,1,1,1],
            [1,0,0,0],
            [1,0,0,1],
            [1,0,1,0]
            ];

        assert.deepEqual(graph.adjacency_matrix, adjMatrix);
      });

      it("produces a correct edge_list", function(){
        var edgeList = [ [0, 1], [0, 2], [0, 3], [2, 3]];

        assert.deepEqual(graph.edge_list, edgeList);
      });

      it("produces a correct incidence list", function(){
        var edgeMatrix = [
            [1,1,1,0],
            [1,0,0,0],
            [0,1,0,1],
            [0,0,1,1],
            ];
        assert.deepEqual(graph.edge_matrix, edgeMatrix);
      });

      it("produces a correct edge set", function(){
        var edgeSet =  {"01":true, "02":true, "03":true, "23":true};
        assert.deepEqual(graph.edges, edgeSet);
      });

      it("supports edges with weights", function(){
        var graph = new Graph();
        graph.add_edge(30,20,112);
        assert.equal(112, graph.get_edge_weight(20,30));
      });

    });

    describe('#set_edge_weight()', function(){
      var graph = new Graph();
      graph.add_edge(0,1);

      it("updates the weight of a previously created edge", function(){
        graph.set_edge_weight(0,1,112);
        assert.equal(112, graph.get_edge_weight(0,1));
      });
    });

    describe('#size()', function(){
      var graph = new Graph();
      graph.add_edge(0,1);

      it("gives correct number of edges", function(){
        assert.equal(graph.size(),1);
      });
    });

  });

});

