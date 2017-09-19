import assert from 'assert';
import dsalgo from '../../../utilities';
import Graph from '../../../data_structures/graph';
import Kruskal from '../../../algorithms/graph/kruskal';

// http://algs4.cs.princeton.edu/43mst/images/mst.png
const EWG = dsalgo.utils.requireText(__dirname, '../../../data/graph/tinyEWG.txt');

describe('Kruskal', () => {
  const graph = new Graph({
    ewg: EWG,
  });

  const traversal = new Kruskal(graph, 0);
  const mstQueue = traversal.mst;
  const mstInfo = [];
  let treeWeight = 0;

  mstQueue.forEach((edgeKey) => {
    const currentEdgeWeight = graph.getEdgeWeightByKey(edgeKey);
    treeWeight += currentEdgeWeight;

    mstInfo.push({
      edge: edgeKey,
      weight: currentEdgeWeight.toFixed(2),
    });
  });

  // http://algs4.cs.princeton.edu/43mst/images/kruskal-lazy.png
  // http://algs4.cs.princeton.edu/43mst/LazyKruskal.java.html

  // kruskal is differs from prim by the order that the edges are added to the minimum spanning tree
  // in kruskal they are added by least weight first as opposed to by order visited from whatever start vertex we pick weighted by the lowest weight value in prim

  it('builds a correct minimum spanning tree', () => {
    assert.deepEqual(mstInfo[0], {
      edge: '0,7',
      weight: '0.16',
    });
    assert.deepEqual(mstInfo[1], {
      edge: '2,3',
      weight: '0.17',
    });
    assert.deepEqual(mstInfo[2], {
      edge: '1,7',
      weight: '0.19',
    });
    assert.deepEqual(mstInfo[3], {
      edge: '0,2',
      weight: '0.26',
    });
    assert.deepEqual(mstInfo[4], {
      edge: '5,7',
      weight: '0.28',
    });
    assert.deepEqual(mstInfo[5], {
      edge: '4,5',
      weight: '0.35',
    });
    assert.deepEqual(mstInfo[6], {
      edge: '2,6',
      weight: '0.40',
    });
  });

  it('weight is correct', () => {
    assert.equal(traversal.weight.toFixed(2), treeWeight.toFixed(2));
  });
});
