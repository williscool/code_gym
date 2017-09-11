import assert from 'assert';
import dsalgo from '../../utilities';
import Graph from '../../data_structures/graph';

describe('Graph', () => {
  describe('constructor', () => {
    it('instantiates', () => {
      // as long as this doesn't blow up im happy
      // its for a test
      // eslint-disable-next-line no-new
      new Graph();
    });

    it('throws an error if you ask for matrices without supplying a size', () => {
      assert.throws(() => {
        // its for a test
        // eslint-disable-next-line no-new
        new Graph({
          enable_matrices: true,
        });
      }, /maximum size/);
    });

    describe('can build from an adjacency_list', () => {
      it('correctly', () => {
        const adjList = [
          [1, 2, 3],
          [0],
          [0, 3],
          [0, 2],
        ];

        const graph = new Graph({
          adjList,
        });

        assert.deepEqual(graph.adjacency_list, adjList);
      });

      it('with an unconnected vertex correctly', () => {
        const adjListToo = [
          [1],
          [0, 4, 5],
          [3, 4, 5],
          [2, 6],
          [1, 2],
          [1, 2, 6],
          [3, 5],
          [],
        ];

        const graph = new Graph({
          adjList: adjListToo,
        });

        assert.deepEqual(graph.adjacency_list, adjListToo);
      });
    });

    describe('can build from an edge weighted digraph', () => {
      const adjList = [[4, 2],
        [3],
        [7],
        [6],
        [5, 7],
        [4, 7, 1],
        [2, 0, 4],
        [5, 3]];

      const edgeSet = {
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
        '7,5': 0.28,
      };


      it('string correctly', () => {
        // http://algs4.cs.princeton.edu/44sp/images/edge-weighted-digraph-representation.png
        // i.e. http://algs4.cs.princeton.edu/44sp/tinyEWD.txt
        // http://algs4.cs.princeton.edu/44sp/images/shortest-path.png
        const EWD = `
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
`;
        const graph = new Graph({
          ewg: EWD,
          directed: true,
        });

        assert.deepEqual(graph.adjacency_list, adjList);
        assert.deepEqual(graph.edges, edgeSet);
      });

      it('file correctly', () => {
        const EWD = dsalgo.utils.requireText(__dirname, '../../data/graph/tinyEWD.txt');
        const graph = new Graph({
          ewg: EWD,
          directed: true,
        });

        assert.deepEqual(graph.adjacency_list, adjList);
        assert.deepEqual(graph.edges, edgeSet);
      });
    });

    // http://algs4.cs.princeton.edu/41graph/
    describe('can build from an unweighted graph data type', () => {
      // http://algs4.cs.princeton.edu/41graph/images/adjacency-lists.png
      const adjList = [[6, 2, 1, 5],
        [0],
        [0],
        [5, 4],
        [5, 6, 3],
        [3, 4, 0],
        [0, 4],
        [8],
        [7],
        [11, 10, 12],
        [9],
        [9, 12],
        [11, 9]];

      it('string correctly', () => {
        // http://algs4.cs.princeton.edu/41graph/images/graph-input.png
        // i.e. http://algs4.cs.princeton.edu/41graph/tinyG.txt
        // http://algs4.cs.princeton.edu/44sp/images/shortest-path.png
        const graphText = `
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
`;
        const graph = new Graph({
          graphData: graphText,
        });

        graph.adjacency_list.forEach((arr, i) => {
          assert.deepEqual(graph.adjacency_list[i].sort(), adjList[i].sort());
        });
      });

      it('file correctly', () => {
        const gd = dsalgo.utils.requireText(__dirname, '../../data/graph/tinyG.txt');
        const graph = new Graph({
          graphData: gd,
        });

        graph.adjacency_list.forEach((arr, i) => {
          assert.deepEqual(graph.adjacency_list[i].sort(), adjList[i].sort());
        });
      });
    });

    // http://algs4.cs.princeton.edu/42digraph/
    describe('can build from an unweighted digraph data type', () => {
      // http://algs4.cs.princeton.edu/42digraph/images/digraph-input.png
      const adjList = [
        [1, 5],
        [],
        [0, 3],
        [2, 5],
        [3, 2],
        [4],
        [0, 8, 4, 9],
        [9, 6],
        [6],
        [10, 11],
        [12],
        [12, 4],
        [9],
      ];

      it('string correctly', () => {
        const graphText = `
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
`;
        const gt = new Graph({
          graphData: graphText,
          directed: true,
        });

        gt.adjacency_list.forEach((arr, i) => {
          assert.deepEqual(gt.adjacency_list[i].sort(), adjList[i].sort());
        });
      });

      it('file correctly', () => {
        const gd = dsalgo.utils.requireText(__dirname, '../../data/graph/tinyDG.txt');

        const fileGraph = new Graph({
          graphData: gd,
          directed: true,
          reverse_adjacency_lists: true,
        });

        fileGraph.adjacency_list.forEach((arr, i) => {
          assert.deepEqual(fileGraph.adjacency_list[i].sort(), adjList[i].sort());
        });
      });
    });
  });

  describe('Vertex Functions', () => {
    describe('#addVertex() and #vertexList()', () => {
      const graph = new Graph();
      graph.addVertex(0);

      it('adds a vertex to the vertexList', () => {
        assert(0 in graph.vertexList());
      });
    });

    describe('#order()', () => {
      const graph = new Graph();
      graph.addVertex(0);

      it('gives correct number of vertices', () => {
        assert.equal(graph.order(), 1);
      });
    });

    describe('degree', () => {
      const graph = new Graph();
      graph.addEdge(0, 1).addEdge(0, 2).addEdge(0, 3).addEdge(2, 3);

      describe('#vertexOutDegree()', () => {
        it('correctly reports values', () => {
          assert.equal(graph.vertexOutDegree(0), 3);
          assert.equal(graph.vertexOutDegree(1), 1);
          assert.equal(graph.vertexOutDegree(2), 2);
          assert.equal(graph.vertexOutDegree(3), 2);
        });

        it('returns false for invalid vertex', () => {
          assert.equal(graph.vertexOutDegree(23), false);
        });

        it('returns 0 for valid vertex but unconnected vertex', () => {
          graph.addVertex(17);
          assert.equal(graph.vertexOutDegree(17), 0);
        });
      });

      describe('#vertexInDegree()', () => {
        it('correctly reports values', () => {
          assert.equal(graph.vertexInDegree(0), 3);
          assert.equal(graph.vertexInDegree(1), 1);
          assert.equal(graph.vertexInDegree(2), 2);
          assert.equal(graph.vertexInDegree(3), 2);
        });

        it('returns false for invalid vertex', () => {
          assert.equal(graph.vertexInDegree(23), false);
        });

        it('returns 0 for valid vertex but unconnected vertex', () => {
          graph.addVertex(17);
          assert.equal(graph.vertexInDegree(17), 0);
        });
      });
    });
  });

  describe('Edge Functions', () => {
    describe('#addEdge()', () => {
      const graph = new Graph({
        enable_matrices: true,
        max_size: 4,
      });
      graph.addEdge(0, 1).addEdge(0, 2).addEdge(0, 3).addEdge(2, 3);

      it('adds vertices to the vertexList', () => {
        assert.deepEqual(graph.vertexList(), ['0', '1', '2', '3']);
      });


      it('#size() is correct', () => {
        assert.equal(graph.size(), 4);
      });

      it('produces a correct adjacency_list', () => {
        const adjList = [
          [1, 2, 3],
          [0],
          [0, 3],
          [0, 2],
        ];

        assert.deepEqual(graph.adjacency_list, adjList);
      });

      it('produces a correct adjacency_matrix', () => {
        const adjMatrix = [
          [0, 1, 1, 1],
          [1, 0, 0, 0],
          [1, 0, 0, 1],
          [1, 0, 1, 0],
        ];

        assert.deepEqual(graph.adjacency_matrix, adjMatrix);
      });

      it('produces a correct edge_list', () => {
        const edgeList = [[0, 1], [0, 2], [0, 3], [2, 3]];

        assert.deepEqual(graph.edge_list, edgeList);
      });

      it('produces a correct incidence list', () => {
        const edgeMatrix = [
          [1, 1, 1, 0],
          [1, 0, 0, 0],
          [0, 1, 0, 1],
          [0, 0, 1, 1],
        ];
        assert.deepEqual(graph.edge_matrix, edgeMatrix);
      });

      it('produces a correct edge set', () => {
        const edgeSet = {
          '0,1': true,
          '0,2': true,
          '0,3': true,
          '2,3': true,
        };
        assert.deepEqual(graph.edges, edgeSet);
      });

      it('supports edges with weights', () => {
        const anotherGraph = new Graph();
        anotherGraph.addEdge(30, 20, 112);
        assert.equal(112, anotherGraph.getEdgeWeight(20, 30));
      });
    });

    describe('default_weight config', () => {
      const graph = new Graph({
        default_weight: 1,
      });
      graph.addEdge(0, 1);

      it('sets an edge weight to a default value', () => {
        assert.equal(1, graph.getEdgeWeight(0, 1));
      });
    });

    describe('#setEdgeWeight()', () => {
      const graph = new Graph();
      graph.addEdge(0, 1);

      it('updates the weight of a previously created edge', () => {
        graph.setEdgeWeight(0, 1, 112);
        assert.equal(112, graph.getEdgeWeight(0, 1));
      });
    });

    describe('#size()', () => {
      const graph = new Graph();
      graph.addEdge(0, 1);

      it('gives correct number of edges', () => {
        assert.equal(graph.size(), 1);
      });
    });

    describe('#edgeSetList() and #edgeKey_vertex_*()', () => {
      const graph = new Graph();
      graph.addEdge(0, 1);
      const firstEdgeKey = graph.edgeSetList()[0];

      it('#edgeKeyVertexFrom', () => {
        assert.equal(Graph.edgeKeyVertexFrom(firstEdgeKey), 0);
      });

      it('#edgeKeyVertexTo', () => {
        assert.equal(Graph.edgeKeyVertexTo(firstEdgeKey), 1);
      });
    });

    describe('#getEdgeWeightByKey()', () => {
      const graph = new Graph();
      graph.addEdge(0, 1);
      const firstEdgeKey = graph.edgeSetList()[0];
      graph.setEdgeWeight(0, 1, 112);

      it('updates the weight of a previously created edge', () => {
        assert.equal(112, graph.getEdgeWeightByKey(firstEdgeKey));
      });
    });

    describe('#edgeKeyOtherVertex()', () => {
      const graph = new Graph();
      graph.addEdge(0, 1);
      const firstEdgeKey = graph.edgeSetList()[0];

      it('gives the other vertex when given vertex from the edge', () => {
        assert.equal(Graph.edgeKeyOtherVertex(firstEdgeKey, 0), 1);
        assert.equal(Graph.edgeKeyOtherVertex(firstEdgeKey, 1), 0);
      });

      it('returns false when given an invalid vertex', () => {
        assert.equal(Graph.edgeKeyOtherVertex(firstEdgeKey, 300), false);
      });
    });
  });

  describe('util functions', () => {
    describe('#hasCycle', () => {
      it('can tell if its cyclic', () => {
        const gd = dsalgo.utils.requireText(__dirname, '../../data/graph/tinyDG.txt');
        const fileGraph = new Graph({
          graphData: gd,
          directed: true,
        });

        assert.equal(fileGraph.hasCycle(), true);
      });

      it('can tell if its not cyclic', () => {
        const gd = dsalgo.utils.requireText(__dirname, '../../data/graph/tinyDAG.txt');
        const fileGraph = new Graph({
          graphData: gd,
          directed: true,
        });

        assert.equal(fileGraph.hasCycle(), false);
      });
    });

    describe('#components', () => {
      it('gives graph components', () => {
        const gd = dsalgo.utils.requireText(__dirname, '../../data/graph/tinyG.txt');
        const fileGraph = new Graph({
          graphData: gd,
        });

        assert.equal(fileGraph.components().length > 0, true);
        assert.equal(fileGraph.components().length === 3, true);
      });
    });
  });
});
