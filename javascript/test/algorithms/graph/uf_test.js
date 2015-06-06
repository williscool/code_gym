var assert = require('assert');
var UF = require('../../../algorithms/graph/uf.js').quick_find;
var dsalgo = require('../../../utilities.js').dsalgo;

// http://algs4.cs.princeton.edu/15uf/images/dynamic-connectivity-tiny.png
var connections = dsalgo.utils.requireText(__dirname, '../../../data/graph/tinyUF.txt');

describe('Union Find', function(){

  var simpleUf;

  it("initalizes", function () {
    simpleUf = new UF(2);
  });

  it("count", function () {
    assert.equal(simpleUf.count, 2);
  });

  it('find', function () {
    assert.equal(simpleUf.find(1), 1);
    assert.throws(function(){
      simpleUf.find(20);
    }, /not a valid site/);
  });

  it('connected', function () {
    assert.equal(simpleUf.connected(1,1), true);
    assert.equal(simpleUf.connected(1,2), false);
  });

  it('union', function () {
    simpleUf.union(1,2);
    assert.equal(simpleUf.connected(1,2), true);
    assert.equal(simpleUf.count, 1);
  });

  it('imports connection file correctly', function () {
    var importedUF = new UF(connections);
    assert.equal(importedUF.connected(4,3), true);
    assert.equal(importedUF.connected(3,8), true);
    assert.equal(importedUF.connected(6,5), true);
    assert.equal(importedUF.connected(9,4), true);
    assert.equal(importedUF.connected(2,1), true);
    assert.equal(importedUF.connected(8,9), true);
    assert.equal(importedUF.connected(5,0), true);
    assert.equal(importedUF.connected(7,2), true);
    assert.equal(importedUF.connected(6,1), true);
    assert.equal(importedUF.connected(1,0), true);
    assert.equal(importedUF.connected(6,7), true);
    assert.equal(importedUF.count, 2);
  });

});
