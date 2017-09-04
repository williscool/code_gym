import assert from 'assert';
import HashTable from '../../data_structures/hash_table';

describe('Hash Table', () => {
  describe('#set()', () => {
    const ht = new HashTable();

    it('inserts value (also tests #hashFunc())', () => {
      const hashKey = 'money';
      const hashIndex = ht.hashFunc(hashKey);
      ht.set(hashKey, 'stacks');
      assert.equal(ht.limit, 8);
      assert.equal(ht.length, 1);
      assert.deepEqual(ht.items[hashIndex], [{
        money: 'stacks',
      }]);
    });

    it('handles collisions', () => {
      const hashIndex = ht.hashFunc('Boo Radley');
      const hashIndexCol = ht.hashFunc('Tom Bradey');
      assert.equal(hashIndex, hashIndexCol);

      ht.set('Boo Radley', '520-589-1970').set('Tom Bradey', '520-589-1970');
    });
  });

  describe('#get()', () => {
    const ht = new HashTable();
    const hashKey = 'money';

    it('returns correct value', () => {
      ht.set(hashKey, 'stacks');
      assert.equal(ht.get(hashKey), 'stacks');
    });

    it('returns correct value after collision', () => {
      const hashIndex = ht.hashFunc('Boo Radley');
      const hashIndexCol = ht.hashFunc('Tom Bradey');
      assert.equal(hashIndex, hashIndexCol);

      ht.set('Boo Radley', '520-589-1970').set('Tom Bradey', '520-589-1970');

      assert.equal(ht.get('Tom Bradey'), '520-589-1970');
    });
  });

  describe('#has()', () => {
    const ht = new HashTable();
    const hashKey = 'money';
    it('detect a key is present', () => {
      ht.set(hashKey, 'stacks');
      assert(ht.has(hashKey));
    });
    it('detect a key is not present', () => {
      assert.equal(ht.has('random'), false);
    });
  // no need to test collision case because has depends on get and testing that works for this too
  });

  describe('#delete()', () => {
    const ht = new HashTable();
    const hashKey = 'money';
    it('returns top item value', () => {
      ht.set(hashKey, 'stacks');
      ht.delete(hashKey);
      assert.equal(ht.has(hashKey), false);
    });

    it('deletes correct value after collision', () => {
      const hashIndex = ht.hashFunc('Boo Radley');
      const hashIndexCol = ht.hashFunc('Tom Bradey');
      assert.equal(hashIndex, hashIndexCol);

      ht.set('Boo Radley', '520-589-1970').set('Tom Bradey', '520-589-1970');

      ht.delete('Tom Bradey');
      assert.equal(ht.has('Tom Bradey'), false);
    });
  });

  describe('#resize()', () => {
    const ht = new HashTable();
    it('resizes after size execedes 3/4s limit', () => {
      ht.set('Alex Hawkins', '510-599-1930')
        .set('Rick Mires', '650-589-1970')
        .set('Tom Bradey', '818-589-1970')
        .set('Biff Tanin', '987-589-1970')
        .set('Dick Mires', '650-589-1970')
        .set('Lam James', '818-589-1970')
        .set('Ricky Ticky Tavi', '987-589-1970');
      // console.log(ht.items);
      assert.notDeepEqual(ht.items, []);
      assert.equal(ht.limit, 16);
    });
  });
});
