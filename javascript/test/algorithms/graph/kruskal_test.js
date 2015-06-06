var assert = require('assert');
var Kruskal = require('../../../algorithms/graph/kruskal.js');
var Graph = require('../../../data_structures/graph.js');
var dsalgo = require('../../../utilities.js').dsalgo;

// http://algs4.cs.princeton.edu/43mst/images/mst.png
var EWG = dsalgo.utils.requireText(__dirname, '../../../data/graph/tinyEWG.txt');

describe('Kruskal', function(){

  var graph = new Graph({
      ewg : EWG
  });

  var traversal = new Kruskal(graph,0);
  var mstQueue = traversal.mst;
  var mstInfo = [];
  var treeWeight = 0;
    
  mstQueue.forEach(function(edge_key){
    var current_edge_weight = graph.get_edge_weight_by_key(edge_key);
    treeWeight = treeWeight + current_edge_weight;

    mstInfo.push({edge: edge_key, weight: current_edge_weight.toFixed(2)}) 
  });

  // http://algs4.cs.princeton.edu/43mst/images/kruskal-lazy.png
  // http://algs4.cs.princeton.edu/43mst/LazyKruskal.java.html
    
  // kruskal is differs from prim by the order that the edges are added to the minimum spanning tree
  // in kruskal they are added by least weight first as opposed to by order visited from whatever start vertex we pick weighted by the lowest weight value in prim
 
  it('builds a correct minimum spanning tree', function () {
    assert.deepEqual(mstInfo[0], { edge: "0,7", weight: "0.16"});
    assert.deepEqual(mstInfo[1], { edge: '2,3', weight: '0.17' });
    assert.deepEqual(mstInfo[2], { edge: "1,7", weight: "0.19"});
    assert.deepEqual(mstInfo[3], { edge: "0,2", weight: "0.26"});
    assert.deepEqual(mstInfo[4], { edge: '5,7', weight: '0.28' });
    assert.deepEqual(mstInfo[5], { edge: '4,5', weight: '0.35' });
    assert.deepEqual(mstInfo[6], { edge: '2,6', weight: '0.40' } );
  });

  it('weight is correct', function () {
    assert.equal(traversal.weight.toFixed(2), treeWeight.toFixed(2));
  });
    

});
