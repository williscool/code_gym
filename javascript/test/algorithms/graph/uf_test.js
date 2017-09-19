const assert = require('assert');
const UF = require('../../../algorithms/graph/uf.js');
const dsalgo = require('../../../utilities.js').default;

// http://algs4.cs.princeton.edu/15uf/images/dynamic-connectivity-tiny.png
const connections = dsalgo.utils.requireText(__dirname, '../../../data/graph/tinyUF.txt');

Object.keys(UF).forEach((key) => {
  describe(`${key} Union Find`, () => {
    let simpleUf;

    it('initalizes', () => {
      simpleUf = new UF[key]({ N: 2 });
    });

    it('count', () => {
      assert.equal(simpleUf.count, 2);
    });

    it('find', () => {
      assert.equal(simpleUf.find(1), 1);
      assert.throws(() => {
        simpleUf.find(20);
      }, /not a valid site/);
    });

    it('connected', () => {
      assert.equal(simpleUf.connected(1, 1), true);
      assert.equal(simpleUf.connected(0, 1), false);
    });

    it('union', () => {
      simpleUf.union(0, 1);
      assert.equal(simpleUf.count, 1);
      assert.equal(simpleUf.connected(0, 1), true);
    });

    it('imports connection file and processes it correctly', () => {
      const importedUF = new UF[key]({ connections });
      assert.equal(importedUF.connected(4, 3), true);
      assert.equal(importedUF.connected(3, 8), true);
      assert.equal(importedUF.connected(6, 5), true);
      assert.equal(importedUF.connected(9, 4), true);
      assert.equal(importedUF.connected(2, 1), true);
      assert.equal(importedUF.connected(8, 9), true);
      assert.equal(importedUF.connected(5, 0), true);
      assert.equal(importedUF.connected(7, 2), true);
      assert.equal(importedUF.connected(6, 1), true);
      assert.equal(importedUF.connected(1, 0), true);
      assert.equal(importedUF.connected(6, 7), true);
      assert.equal(importedUF.connected(7, 8), false);
      assert.equal(importedUF.count, 2);
    });
  });
});
