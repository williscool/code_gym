var assert = require('assert');
var PrimMST = require('../../../algorithms/graph/prim.js');
var Graph = require('../../../data_structures/graph.js');
var dsalgo = require('../../../utilities.js').dsalgo;

// http://algs4.cs.princeton.edu/43mst/images/mst.png
var EWG = dsalgo.utils.requireText(__dirname, '../../../data/graph/tinyEWG.txt');

Object.keys(PrimMST).forEach(function(key){

  describe(key + ' PrimMST', function(){

    var graph = new Graph({
        ewg : EWG
    });

    describe('one vertex', function(){

      var one_vertex_traversal = new PrimMST[key](graph,0);
      var mstQueue = one_vertex_traversal.mst;
      var mstInfo = [];
      var treeWeight = 0;
        
      mstQueue.forEach(function(edge_key){
        var current_edge_weight = graph.get_edge_weight_by_key(edge_key);
        treeWeight = treeWeight + current_edge_weight;

        mstInfo.push({edge: edge_key, weight: current_edge_weight.toFixed(2)}) 
      });

      // http://algs4.cs.princeton.edu/43mst/images/prim-lazy.png
      // http://algs4.cs.princeton.edu/43mst/LazyPrimMST.java.html
      
      it('prim builds a correct minimum spanning tree', function () {
        assert.deepEqual(mstInfo[0], {edge: "0,7", weight: "0.16"});
        assert.deepEqual(mstInfo[1], {edge: "1,7", weight: "0.19"});
        assert.deepEqual(mstInfo[2], {edge: "0,2", weight: "0.26"});
        assert.deepEqual(mstInfo[3], { edge: '2,3', weight: '0.17' });
        assert.deepEqual(mstInfo[4], { edge: '5,7', weight: '0.28' });
        assert.deepEqual(mstInfo[5], { edge: '4,5', weight: '0.35' });
        assert.deepEqual(mstInfo[6], { edge: '2,6', weight: '0.40' } );
      });

      it('weight is correct', function () {
        assert.equal(one_vertex_traversal.weight.toFixed(2), treeWeight.toFixed(2));
      });
      
    });

    describe('all vertex', function(){

      var all_vertex_traversal = new PrimMST[key](graph);
      var msfQueue = all_vertex_traversal.mst;
      var msfInfo = [];
      var forestWeight = 0;
        
      msfQueue.forEach(function(edge_key){
        var current_edge_weight = graph.get_edge_weight_by_key(edge_key);
        forestWeight = forestWeight + current_edge_weight;

        msfInfo.push({edge: edge_key, weight: current_edge_weight.toFixed(2)}) 
      });

      // http://algs4.cs.princeton.edu/43msf/images/prim-lazy.png
      // http://algs4.cs.princeton.edu/43msf/LazyPrimmsf.java.html
      it('prim builds a correct minimum spanning forest', function () {
        assert.deepEqual(msfInfo[0], {edge: "0,7", weight: "0.16"});
        assert.deepEqual(msfInfo[1], {edge: "1,7", weight: "0.19"});
        assert.deepEqual(msfInfo[2], {edge: "0,2", weight: "0.26"});
        assert.deepEqual(msfInfo[3], { edge: '2,3', weight: '0.17' });
        assert.deepEqual(msfInfo[4], { edge: '5,7', weight: '0.28' });
        assert.deepEqual(msfInfo[5], { edge: '4,5', weight: '0.35' });
        assert.deepEqual(msfInfo[6], { edge: '2,6', weight: '0.40' } );
      });

      it('weight is correct', function () {
        assert.equal(all_vertex_traversal.weight.toFixed(2), forestWeight.toFixed(2));
      });
      
    });


  });

});
