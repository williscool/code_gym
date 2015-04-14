var assert = require('assert');
var Quene = require('../../data_structures/quene.js');

describe('Quene with Doubly Linked List', function(){

  describe('#enquene()', function(){
    var quene = new Quene();
    it("quene has one item on it", function(){
      quene.enquene(42);
      assert.deepEqual(quene.items.toArray(), [42]);
      assert.equal(quene.length, 1);
    });
  });

  describe('#peek()', function(){
    var quene = new Quene();
    it("returns top item value", function(){
      quene.enquene(42);
      assert.equal(quene.peek(), 42);
    });
  });

  describe('#dequene()', function(){
    var quene = new Quene();
    quene.enquene(42).enquene(75).enquene(22);

    it("removes items", function(){
      assert.equal(quene.length, 3);
      quene.dequene(42);
      assert.deepEqual(quene.items.toArray(), [75,22]);
      assert.equal(quene.length, 2);
    });

  });
});

