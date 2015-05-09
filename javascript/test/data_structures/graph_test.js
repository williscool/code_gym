var assert = require('assert');
var Graph = require('../../data_structures/graph.js');

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


      it("#order() is correct", function(){
        assert.equal(graph.order(), 4);
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

