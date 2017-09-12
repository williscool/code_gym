import assert from 'assert';
import dsalgo from '../../../utilities';
import DFSContainer from '../../../algorithms/graph/dfs';
import Graph from '../../../data_structures/graph';

(['iterative', 'recursive']).forEach((key) => {
  describe(`${key} Depth First Search`, () => {
    // iife
    const fn = (function functionPicker() {
      if (key === 'recursive') {
        return DFSContainer.recursive_info;
      }
      return DFSContainer.iterative;
    }());

    const DFS = fn;
    describe('traverse graph', () => {
      // http://en.wikipedia.org/wiki/Depth-first_search#/media/File:Depth-first-tree.svg
      const adjListToo = [
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
        [8],
      ];

      const graph = new Graph({
        adjList: adjListToo,
      });

      const dfsInfo = new DFS(graph, 1);

      it("marks source vertex's predecessor as null", () => {
        assert.deepEqual(dfsInfo[1], {
          visitedOrder: 1,
          predecessor: null,
          distance: 0,
          isVisited: true,
        });
      });

      it('goes in correct order', () => {
        // dfsInfo.forEach(function(val,i){
        //  console.log("index: "+ i);
        //  console.log(val);
        // })
        assert.deepEqual(dfsInfo[2], {
          visitedOrder: 2,
          predecessor: 1,
          distance: 1,
          isVisited: true,
        });
        assert.deepEqual(dfsInfo[3], {
          visitedOrder: 3,
          predecessor: 2,
          distance: 2,
          isVisited: true,
        });
        assert.deepEqual(dfsInfo[11], {
          visitedOrder: 11,
          predecessor: 9,
          distance: 3,
          isVisited: true,
        });
        assert.deepEqual(dfsInfo[12], {
          visitedOrder: 12,
          predecessor: 8,
          distance: 2,
          isVisited: true,
        });
      });

      it('doesnt mark unconnected vertex', () => {
        assert.deepEqual(dfsInfo[0], {
          visitedOrder: null,
          predecessor: null,
          distance: null,
          isVisited: false,
        });
      });
    });
  });
});


// http://algs4.cs.princeton.edu/42digraph/DepthFirstOrder.java.html
describe('Depth First Search', () => {
  const DFS = DFSContainer.recursive;
  const toArray = DFSContainer.recursive_to_array;

  // http://algs4.cs.princeton.edu/42digraph/images/dag.png
  const gd = dsalgo.utils.requireText(__dirname, '../../../data/graph/tinyDAG.txt');
  const graph = new Graph({
    graphData: gd,
    directed: true,
    reverse_adjacency_lists: true,
  });

  const markedSets = dsalgo.utils.simpleSet();
  const orderSets = dsalgo.utils.simpleSet();

  // fun fact learned from trying to test the in order traversal
  // because the graph we are running this on is directed by definition you may not be be able to reach each vertex from every other vertex
  //
  // so running the algo this way may not ever hit each vertex. but you can definitely use the marked array from it to generate the TransitiveClosure of the graph
  // and check whats reachable from what
  //
  // at least that what I think is right. googling "inorder graph traversal" get you nothing but stuff about binary trees
  // TODO: investigate this further

  (['pre', 'post']).forEach((orderName) => {
    markedSets[orderName] = dsalgo.utils.simpleSet();
    orderSets[orderName] = [];

    graph.vertexList().forEach((vLabel) => {
      const vertexLabel = dsalgo.utils.makeNumberUnlessNaN(vLabel);

      if (markedSets[orderName][vertexLabel]) return;

      DFS(graph, vertexLabel, markedSets[orderName], (v) => {
        orderSets[orderName].push(v);
      }, orderName);
    });
  });

  Object.keys(orderSets).forEach((orderName) => {
    describe(`${orderName}order traversal`, () => {
      it('visits vertices in correct order', () => {
        switch (orderName) {
          // no children, just erase the root
          case 'pre':
            assert.deepEqual(orderSets[orderName], [0, 5, 4, 1, 6, 9, 11, 12, 10, 2, 3, 7, 8]);
            assert.deepEqual(toArray(graph, orderName), [0, 5, 4, 1, 6, 9, 11, 12, 10, 2, 3, 7, 8]);
            break;

            // one child, use one as the root
          case 'in':
            // could test visitation ability but already did in Transitive Closure
            break;

            // two children, little work to do
          case 'post':
            assert.deepEqual(orderSets[orderName], [4, 5, 1, 12, 11, 10, 9, 6, 0, 3, 2, 7, 8]);
            assert.deepEqual(toArray(graph, orderName), [4, 5, 1, 12, 11, 10, 9, 6, 0, 3, 2, 7, 8]);
            break;

          default:
            // do nothing
        }
      });
    });
  });
});
