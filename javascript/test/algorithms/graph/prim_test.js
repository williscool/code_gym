import assert from 'assert';
import dsalgo from '../../../utilities';
import Graph from '../../../data_structures/graph';
import PrimMST from '../../../algorithms/graph/prim';

// http://algs4.cs.princeton.edu/43mst/images/mst.png
const EWG = dsalgo.utils.requireText(__dirname, '../../../data/graph/tinyEWG.txt');

Object.keys(PrimMST).forEach((key) => {
  describe(`${key} PrimMST`, () => {
    const graph = new Graph({
      ewg: EWG,
    });

    describe('one vertex', () => {
      const oneVertexTraversal = new PrimMST[key](graph, 0);
      const mstQueue = oneVertexTraversal.mst;
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

      // http://algs4.cs.princeton.edu/43mst/images/prim-lazy.png
      // http://algs4.cs.princeton.edu/43mst/LazyPrimMST.java.html

      it('prim builds a correct minimum spanning tree', () => {
        assert.deepEqual(mstInfo[0], {
          edge: '0,7',
          weight: '0.16',
        });
        assert.deepEqual(mstInfo[1], {
          edge: '1,7',
          weight: '0.19',
        });
        assert.deepEqual(mstInfo[2], {
          edge: '0,2',
          weight: '0.26',
        });
        assert.deepEqual(mstInfo[3], {
          edge: '2,3',
          weight: '0.17',
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
        assert.equal(oneVertexTraversal.weight.toFixed(2), treeWeight.toFixed(2));
      });
    });

    describe('all vertex', () => {
      const allVertexTraversal = new PrimMST[key](graph);
      const msfQueue = allVertexTraversal.mst;
      const msfInfo = [];
      let forestWeight = 0;

      msfQueue.forEach((edgeKey) => {
        const currentEdgeWeight = graph.getEdgeWeightByKey(edgeKey);
        forestWeight += currentEdgeWeight;

        msfInfo.push({
          edge: edgeKey,
          weight: currentEdgeWeight.toFixed(2),
        });
      });

      // TODO: this test doesn't test what I thought it did when I wrote it
      // I need to run this on an unconnected graph to test this
      it('prim builds a correct minimum spanning forest', () => {
        assert.deepEqual(msfInfo[0], {
          edge: '0,7',
          weight: '0.16',
        });
        assert.deepEqual(msfInfo[1], {
          edge: '1,7',
          weight: '0.19',
        });
        assert.deepEqual(msfInfo[2], {
          edge: '0,2',
          weight: '0.26',
        });
        assert.deepEqual(msfInfo[3], {
          edge: '2,3',
          weight: '0.17',
        });
        assert.deepEqual(msfInfo[4], {
          edge: '5,7',
          weight: '0.28',
        });
        assert.deepEqual(msfInfo[5], {
          edge: '4,5',
          weight: '0.35',
        });
        assert.deepEqual(msfInfo[6], {
          edge: '2,6',
          weight: '0.40',
        });
      });

      it('weight is correct', () => {
        assert.equal(allVertexTraversal.weight.toFixed(2), forestWeight.toFixed(2));
      });
    });
  });
});
