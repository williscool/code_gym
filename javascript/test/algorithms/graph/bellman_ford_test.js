var assert = require('assert');
var BellmanFord = require('../../../algorithms/graph/bellman_ford.js');
var Graph = require('../../../data_structures/graph.js').default;
var dsalgo = require('../../../utilities.js').default;

describe('Bellman Ford', function() {

  // http://algs4.cs.princeton.edu/44sp/images/shortest-path.png
  var EWD = dsalgo.utils.requireText(__dirname, '../../../data/graph/tinyEWD.txt');
  var graph = new Graph({
    ewg: EWD,
    directed: true
  });

  var traversal = new BellmanFord(graph, 0);
  var info = traversal.info;

  describe('traverse graph', function() {


    // round off float vals
    info.forEach(function(infoObj) {
      infoObj.distance = infoObj.distance.toFixed(2);
    });

    it("marks source vertex's predecessor as null", function() {
      assert.deepEqual(info[0], {
        distance: 0,
        predecessor: null
      });
    });

    it('correctly assigns path weights', function() {
      // remember toFixed in JS returns strings
      assert.deepEqual(info[2], {
        distance: "0.26",
        predecessor: 0
      });
      assert.deepEqual(info[7], {
        distance: "0.60",
        predecessor: 2
      });
      assert.deepEqual(info[3], {
        distance: "0.99",
        predecessor: 7
      });
      assert.deepEqual(info[6], {
        distance: "1.51",
        predecessor: 3
      });
    });

  });

  describe('shortest path', function() {
    var shortest_path_info = traversal.shortest_path(6);

    /*
     * So not needing to do this here takes a bit of explaining and I'm leaving it here because of that
     * long story short in this instance info and shortest_path_info are pointing the same instance of the string objects
     * that represent the distances so we dont have to turn them into strings again
     *
     * Object.keys(shortest_path_info).forEach(function(key){
     *  // remember toFixed in JS returns strings
     *  shortest_path_info[key].distance = shortest_path_info[key].distance.toFixed(2);
     * });
     *
     * another fun fact "0.00" == 0 in js
     * */

    it("returns verticies in correct order for a valid path", function() {
      assert.deepEqual(shortest_path_info[0], {
        distance: "0.00",
        predecessor: null
      });
      assert.deepEqual(shortest_path_info[2], {
        distance: "0.26",
        predecessor: 0
      });
      assert.deepEqual(shortest_path_info[7], {
        distance: "0.60",
        predecessor: 2
      });
      assert.deepEqual(shortest_path_info[3], {
        distance: "0.99",
        predecessor: 7
      });
      assert.deepEqual(shortest_path_info[6], {
        distance: "1.51",
        predecessor: 3
      });
      assert.deepEqual(shortest_path_info.order, [0, 2, 7, 3, 6]);
    });

    it("returns false for vertex not in graph with no path", function() {
      assert.equal(traversal.shortest_path(17), false);
    });
  });

  describe('handles graphs with negative weight edges', function() {
      // http://algs4.cs.princeton.edu/44sp/images/shortest-path.png
      var EWDneg = dsalgo.utils.requireText(__dirname, '../../../data/graph/tinyEWDn.txt');
      var negWeightgraph = new Graph({
        ewg: EWDneg,
        directed: true
      });

      var negTraversal = new BellmanFord(negWeightgraph , 0);
      var negInfo = negTraversal.info;

    describe('traverse graph', function() {

      // round off float vals
      negInfo.forEach(function(infoObj) {
        infoObj.distance = infoObj.distance.toFixed(2);
      });

      it("marks source vertex's predecessor as null", function() {
        assert.deepEqual(negInfo[0], {
          distance: 0,
          predecessor: null
        });
      });

      it('correctly assigns path weights', function() {
        // remember toFixed in JS returns strings
        assert.deepEqual(negInfo[2], {
          distance: "0.26",
          predecessor: 0
        });
        assert.deepEqual(negInfo[7], {
          distance: "0.60",
          predecessor: 2
        });
        assert.deepEqual(negInfo[3], {
          distance: "0.99",
          predecessor: 7
        });
        assert.deepEqual(negInfo[6], {
          distance: "1.51",
          predecessor: 3
        });
      });

    });

    describe('shortest path', function() {
      var shortest_path_info = negTraversal.shortest_path(6);

      /*
       * So not needing to do this here takes a bit of explaining and I'm leaving it here because of that
       * long story short in this instance info and shortest_path_info are pointing the same instance of the string objects
       * that represent the distances so we dont have to turn them into strings again
       *
       * Object.keys(shortest_path_info).forEach(function(key){
       *  // remember toFixed in JS returns strings
       *  shortest_path_info[key].distance = shortest_path_info[key].distance.toFixed(2);
       * });
       *
       * another fun fact "0.00" == 0 in js
       * */

      it("returns verticies in correct order for a valid path", function() {
        assert.deepEqual(shortest_path_info[0], {
          distance: "0.00",
          predecessor: null
        });
        assert.deepEqual(shortest_path_info[2], {
          distance: "0.26",
          predecessor: 0
        });
        assert.deepEqual(shortest_path_info[7], {
          distance: "0.60",
          predecessor: 2
        });
        assert.deepEqual(shortest_path_info[3], {
          distance: "0.99",
          predecessor: 7
        });
        assert.deepEqual(shortest_path_info[6], {
          distance: "1.51",
          predecessor: 3
        });
        assert.deepEqual(shortest_path_info.order, [0, 2, 7, 3, 6]);
      });

      it("returns false for vertex not in graph with no path", function() {
        assert.equal(traversal.shortest_path(17), false);
      });
    });

  });

  describe('detects negative cycles', function() {

    var gd = dsalgo.utils.requireText(__dirname, '../../../data/graph/tinyEWDnc.txt');
    var ncG = new Graph({
      graphData: gd,
      directed: true
    });

    var traversal = new BellmanFord(ncG, 0);

      it("correctly", function() {
        assert(traversal.hasNegativeCycle);
      });

      it("returns cycle", function() {
        assert.equal(traversal.negative_cycles.length > 0, true);
      });

  });

});
