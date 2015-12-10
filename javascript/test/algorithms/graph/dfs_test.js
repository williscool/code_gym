var assert = require('assert');
var DFSContainer = require('../../../algorithms/graph/dfs.js');
var Graph = require('../../../data_structures/graph.js');
var dsalgo = require('../../../utilities.js').dsalgo;

(["iterative", "recursive"]).forEach(function(key) {

  describe(key + ' Depth First Search', function() {

    // iife
    var fn = (function functionPicker(key) {
      if (key == "recursive") {
        return DFSContainer.recursive_info;
      } else {
        return DFSContainer.iterative;
      }
    })();

    var DFS = fn;
    describe('traverse graph', function() {
      // http://en.wikipedia.org/wiki/Depth-first_search#/media/File:Depth-first-tree.svg
      var adjListToo = [
        [], // make zero an un connected vertex so I can number stuff just like picture
        [2, 7, 8],
        [1, 3, 6],
        [2, 4, 5],
        [3],
        [3],
        [2],
        [1],
        [1, 9, 12],
        [8, 10, 11],
        [9],
        [9],
        [8]
      ];

      var graph = new Graph({
        adjList: adjListToo
      });

      var dfsInfo = new DFS(graph, 1);

      it("marks source vertex's predecessor as null", function() {
        assert.deepEqual(dfsInfo[1], {
          visitedOrder: 1,
          predecessor: null,
          distance: 0,
          isVisited: true
        });
      });

      it('goes in correct order', function() {
        //dfsInfo.forEach(function(val,i){
        //  console.log("index: "+ i);
        //  console.log(val);
        //})
        assert.deepEqual(dfsInfo[2], {
          visitedOrder: 2,
          predecessor: 1,
          distance: 1,
          isVisited: true
        });
        assert.deepEqual(dfsInfo[3], {
          visitedOrder: 3,
          predecessor: 2,
          distance: 2,
          isVisited: true
        });
        assert.deepEqual(dfsInfo[11], {
          visitedOrder: 11,
          predecessor: 9,
          distance: 3,
          isVisited: true
        });
        assert.deepEqual(dfsInfo[12], {
          visitedOrder: 12,
          predecessor: 8,
          distance: 2,
          isVisited: true
        });
      });

      it('doesnt mark unconnected vertex', function() {
        assert.deepEqual(dfsInfo[0], {
          visitedOrder: null,
          predecessor: null,
          distance: null,
          isVisited: false
        });
      });

    });

  });

});

// http://algs4.cs.princeton.edu/42digraph/DepthFirstOrder.java.html
describe('Depth First Search', function() {
  var DFS = DFSContainer.recursive;
  var toArray = DFSContainer.recursive_to_array;

  // http://algs4.cs.princeton.edu/42digraph/images/dag.png
  var gd = dsalgo.utils.requireText(__dirname, '../../../data/graph/tinyDAG.txt');
  var graph = new Graph({
    graphData: gd,
    directed: true,
    reverse_adjacency_lists: true
  });

  var markedSets = dsalgo.utils.simpleSet();
  var orderSets = dsalgo.utils.simpleSet();

  // fun fact learned from trying to test the in order traversal
  // because the graph we are running this on is directed by definition you may not be be able to reach each vertex from every other vertex
  //
  // so running the algo this way may not ever hit each vertex. but you can definitely use the marked array from it to generate the TransitiveClosure of the graph
  // and check whats reachable from what
  //
  // at least that what I think is right. googling "inorder graph traversal" get you nothing but stuff about binary trees
  // TODO: investigate this further

  (["pre", "post"]).forEach(function(orderName) {
   
     markedSets[orderName] = dsalgo.utils.simpleSet();
     orderSets[orderName] = [];
  
    graph.vertex_list().forEach(function (vertexLabel){
      vertexLabel = dsalgo.utils.makeNumberUnlessNaN(vertexLabel);
      
      if (markedSets[orderName][vertexLabel]) return;

      DFS(graph, vertexLabel, markedSets[orderName], function(v,w) {
        orderSets[orderName].push(v);
      }, orderName);

    });

  });

  Object.keys(orderSets).forEach(function(orderName) {

    describe(orderName + 'order traversal', function() {

        it("visits vertices in correct order", function(){
          switch (orderName) {

            //no children, just erase the root
            case "pre":
              assert.deepEqual(orderSets[orderName],[0,5,4,1,6,9,11,12,10,2,3,7,8]);
              assert.deepEqual(toArray(graph,orderName),[0,5,4,1,6,9,11,12,10,2,3,7,8]);
              break;

            //one child, use one as the root
            case "in":
              // could test visitation ability but already did in Transitive Closure
              break;

            //two children, little work to do
            case "post":
              assert.deepEqual(orderSets[orderName],[4,5,1,12,11,10,9,6,0,3,2,7,8]);
              assert.deepEqual(toArray(graph,orderName),[4,5,1,12,11,10,9,6,0,3,2,7,8]);
              break;
          }

      });
    });
  });
  

});
