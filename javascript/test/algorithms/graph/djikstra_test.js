var assert = require('assert');
var DjikstraSP = require('../../../algorithms/graph/djikstra.js');
var Graph = require('../../../data_structures/graph.js');
var dsalgo = require('../../../utilities.js').dsalgo;

// http://algs4.cs.princeton.edu/44sp/images/shortest-path.png
var EWD = dsalgo.utils.requireText(__dirname, '../../../data/graph/tinyEWD.txt');

describe('Djikstra', function(){

  describe('traverse graph', function () {

    var graph = new Graph({
        directed : true,
        ewd : EWD
    });
    
    var info = new DjikstraSP(graph,0);

    // round off float vals
    info.forEach(function(infoObj){
      infoObj.distance =  infoObj.distance.toFixed(2);
    })

    it("marks source vertex's predecessor as null", function () {
      assert.deepEqual(info[0], {distance: 0, predecessor: null});
    });

    it('correctly assigns path weights', function () {
      // remember toFixed in JS returns strings
      assert.deepEqual(info[2], {distance: "0.26", predecessor: 0});
      assert.deepEqual(info[7], {distance: "0.60", predecessor: 2});
      assert.deepEqual(info[3], {distance: "0.99", predecessor: 7});
      assert.deepEqual(info[6], {distance: "1.51", predecessor: 3});
    });

  });

});
