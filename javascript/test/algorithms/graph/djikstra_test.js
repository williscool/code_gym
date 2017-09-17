const assert = require('assert');
const Djikstra = require('../../../algorithms/graph/djikstra.js').default;
const Graph = require('../../../data_structures/graph.js').default;
const dsalgo = require('../../../utilities.js').default;

// http://algs4.cs.princeton.edu/44sp/images/shortest-path.png
const EWD = dsalgo.utils.requireText(__dirname, '../../../data/graph/tinyEWD.txt');

Object.keys(Djikstra).forEach((key) => {
  describe(`${key} Djikstra`, () => {
    const graph = new Graph({
      ewg: EWD,
      directed: true,
    });

    const traversal = new Djikstra[key](graph, 0);
    const info = traversal.info;

    describe('traverse graph', () => {
      // round off float vals
      info.forEach((infoObj) => {
        // needs to alter input parameter to round the floats
        // eslint-disable-next-line no-param-reassign
        infoObj.distance = infoObj.distance.toFixed(2);
      });

      it("marks source vertex's predecessor as null", () => {
        assert.deepEqual(info[0], {
          distance: 0,
          predecessor: null,
        });
      });

      it('correctly assigns path weights', () => {
        // remember toFixed in JS returns strings
        assert.deepEqual(info[2], {
          distance: '0.26',
          predecessor: 0,
        });
        assert.deepEqual(info[7], {
          distance: '0.60',
          predecessor: 2,
        });
        assert.deepEqual(info[3], {
          distance: '0.99',
          predecessor: 7,
        });
        assert.deepEqual(info[6], {
          distance: '1.51',
          predecessor: 3,
        });
      });
    });

    describe('shortest path', () => {
      const shortestPathInfo = traversal.shortestPath(6);

      /*
       * So not needing to do this here takes a bit of explaining and I'm leaving it here because of that
       *
       * long story short in this instance info and shortestPathInfo are pointing the same instance of the string objects
       * that represent the distances so we dont have to turn them into strings again
       *
       * Object.keys(shortestPathInfo).forEach(function(key){
       *  // remember toFixed in JS returns strings
       *  shortestPathInfo[key].distance = shortestPathInfo[key].distance.toFixed(2);
       * });
       *
       * another fun fact "0.00" == 0 in js
       * */

      it('returns verticies in correct order for a valid path', () => {
        assert.deepEqual(shortestPathInfo[0], {
          distance: '0.00',
          predecessor: null,
        });
        assert.deepEqual(shortestPathInfo[2], {
          distance: '0.26',
          predecessor: 0,
        });
        assert.deepEqual(shortestPathInfo[7], {
          distance: '0.60',
          predecessor: 2,
        });
        assert.deepEqual(shortestPathInfo[3], {
          distance: '0.99',
          predecessor: 7,
        });
        assert.deepEqual(shortestPathInfo[6], {
          distance: '1.51',
          predecessor: 3,
        });
        assert.deepEqual(shortestPathInfo.order, [0, 2, 7, 3, 6]);
      });

      it('returns false for vertex not in graph with no path', () => {
        assert.equal(traversal.shortestPath(17), false);
      });
    });
  });
});
