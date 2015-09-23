var assert = require('assert');
// var assert = require('chai').assert
var Trie = require('../../data_structures/trie.js');

describe('Trie', function() {

  var trie = new Trie();

  it('#set()', function() {
    trie.set("stacks");
    assert.deepEqual(trie.trie, {"s":{"t":{"a":{"c":{"k":{"s": 0}}}}}})
  });

  it('#get()', function() {
    assert.equal( trie.get("stacks"), true);
    assert.equal( trie.get("stackr"), false);
    assert.equal( trie.get("money"), false);
  });

  // TODO: delete
  it.skip('#delete()', function() {
  });

});

