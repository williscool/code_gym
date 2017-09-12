import assert from 'assert';
import BFS from '../../../algorithms/graph/bfs';
import Graph from '../../../data_structures/graph';

describe('Breadth First Search', () => {
  describe('traverse graph', () => {
    // https://www.khanacademy.org/computing/computer-science/algorithms/breadth-first-search/a/the-breadth-first-search-algorithm
    // https://s3.amazonaws.com/ka-cs-algorithms/bfs_result.png
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

    const traversal = new BFS(graph, 3);
    const bfsInfo = traversal.info;

    it("marks source vertex's predecessor as null", () => {
      assert.deepEqual(bfsInfo[3], {
        distance: 0,
        predecessor: null,
      });
    });

    it('goes in correct order', () => {
      assert.deepEqual(bfsInfo[0], {
        distance: 4,
        predecessor: 1,
      });
      assert.deepEqual(bfsInfo[1], {
        distance: 3,
        predecessor: 4,
      });
      assert.deepEqual(bfsInfo[2], {
        distance: 1,
        predecessor: 3,
      });
      assert.deepEqual(bfsInfo[4], {
        distance: 2,
        predecessor: 2,
      });
      assert.deepEqual(bfsInfo[5], {
        distance: 2,
        predecessor: 2,
      });
      assert.deepEqual(bfsInfo[6], {
        distance: 1,
        predecessor: 3,
      });
    });

    it('doesnt mark unconnected vertex', () => {
      assert.deepEqual(bfsInfo[7], {
        distance: null,
        predecessor: null,
      });
    });

    it('traces a traversal path correctly', () => {
      assert.deepEqual(traversal.reconstructPath(0), [3, 2, 4, 1, 0]);
    });
  });
});
