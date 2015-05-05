var assert = require('assert');
var Graph = require('../../data_structures/graph.js');

// test each representation deep equals correctly then add the other stuff and we are done
// with the data structure and can write the algorithms

describe('Graph', function(){
  describe('constructor', function(){
    it("instantiates", function(){
      // as long as this doesn't blow up im happy
      var graph = new Graph();
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
    var graph = new Graph();

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

      it.skip("produces a correct adjacency_matrix", function(){
        var adjMatrix = [
            [0,1,1,1],
            [1,0,0,1],
            [1,0,0,1],
            [1,0,1,0]
            ];

        assert.deepEqual(graph.adjacency_matrix, adjMatrix);
      });

      it("produces a correct edge_list", function(){
        var edgeList = [ [0, 1], [0, 2], [0, 3], [2, 3]];

        assert.deepEqual(graph.edge_list, edgeList);
      });

      it.skip("produces a correct incidence list", function(){
        var edgeMatrix = [
            [1,1,1,0],
            [1,0,0,1],
            [0,1,0,1],
            [0,0,1,1],
            ];
        assert.deepEqual(graph.edge_matrix, edgeMatrix);
      });

    });

    describe('#size()', function(){
      var graph = new Graph();
      graph.add_edge(0,1);

      it("gives correct number of vertices", function(){
        assert.equal(graph.size(),1);
      });
    });

  });

});

