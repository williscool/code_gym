/**
 * Implements a Hash Table (http://en.wikipedia.org/wiki/Hash_table)
 *
 * A bucket per the wikipedia entry is an index in the main items array
 *
 * this uses chaining with an array for collisions and its technically this strategy http://en.wikipedia.org/wiki/Hash_table#Separate_chaining_with_other_structures
 *
 * this is basically we replace the key value with a nested arrays key value pairs once we get a collision)
 * another way to handle that is using a linked list for the same thing
 *
 * example of that here : https://github.com/Bishop92/JavaScript-Data-Structures/blob/master/lib/HashTable/HashTable.js
 *
 * this would have been inspired by that but I wanted to support string keys and have a simpler implementation so its inspired by
 * https://gist.github.com/alexhawkins/f6329420f40e5cafa0a4
 *
 * for my own reference chaining is juxtaposed against the other strategy confusingly (to me at first at least) named "open addressing"
 * all that means is you dont chain. you just have a function that picks another slot when you collide.
 *
 * It can be as simple as just incrementing by 1 to the next bucket or as complex as another hashing function.
 * see here for more details http://en.wikipedia.org/wiki/Hash_table#Open_addressing
 *
 * also decided to make it (mostly) conform to es6 Map api because why not. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
 *
 * @param {number} size
 */
class HashTable {
  constructor(size) {
    let sz = size;
    if (!sz) {
      sz = 8;
    }
    this.items = [];
    this.length = 0;
    this.limit = sz;
  }

  /**
   * Used to pick an index for an item to go into in our hash table
   *
   * My particular implementation is cribed from here
   *
   * but as it does with many concept sedgewick & wanye's
   *
   * algorithms book's companion website does an excellent job of explaining what you want too accomplish with a has function
   *
   * http://algs4.cs.princeton.edu/34hash/
   *
   * to quote them essentially "We seek a hash function that is both easy to compute and uniformly distributes the keys."
   *
   * @param {string} str - the string you are looking to generate a hash of
   * @param {number} max - the maximum number of items in a string
   * @returns index
   * @memberof HashTable
   */
  hashFunc(str, max) {
    let hash = 0;
    let mx = max;

    if (!mx) {
      mx = this.limit;
    }

    for (let i; i < str.length; i += 1) {
      const letter = str[i];
      hash = (hash << 5) + letter.charCodeAt(0); // eslint-disable-line no-bitwise
      hash %= mx;
    }

    const index = hash;
    return index;
  }

  /**
   * Used to set a value for a key in the hash table
   *
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   *
   * @param {string} key
   * @param {any} val
   * @returns this
   * @memberof HashTable
   */
  set(key, val) {
    // compute index with hashing function
    const index = this.hashFunc(key, this.limit);

    // get bucket at index
    let bucket = this.items[index];

    // create it iff it doesnt exist
    if (!bucket) {
      bucket = [];
      this.items[index] = bucket;
    }

    // check bucket to see if we are updating a previously inserted value
    let overwrite = false;
    let obj;

    for (let i = 0; i < bucket.length; i += 1) {
      obj = bucket[i];

      if (obj[key]) {
        obj[key] = val;
        overwrite = true;
      }
    }

    if (!overwrite) {
      // add new key val pair to bucket
      obj = {};
      obj[key] = val;
      bucket.push(obj);
      this.length += 1;
    }

    // if we have filled with 3/4 of value limit increase its size
    if (this.length > this.limit * 0.75) {
      this.resize(this.limit * 2);
    }

    return this;
  }

  /**
   * Get the value of a key from the hash table
   *
   * Amoritized Time Complexity: O(1)
   * Worst Case Time Complexity: O(m)
   *
   * where m = the length of the longest array bucket in the case of a collision
   *
   * @param {string} key
   * @returns
   * @memberof HashTable
   */
  get(key) {
    const index = this.hashFunc(key, this.limit);
    const bucket = this.items[index];
    let result = null;

    if (!bucket) {
      return result;
    }

    for (let i = 0; i < bucket.length; i += 1) {
      const obj = bucket[i];
      if (obj[key]) {
        result = obj[key];
      }
    }

    return result;
  }

  /**
   * Check if a key has a value in the hash table
   *
   * Amoritized Time Complexity: O(1)
   * Worst Case Time Complexity: O(m)
   *
   * where m = the length of the longest array bucket in the case of a collision
   *
   * might have to scan that to see if the key is present
   *
   * @param {any} key
   * @returns
   * @memberof HashTable
   */
  has(key) {
    if (this.get(key)) {
      return true;
    }
    return false;
  }

  /**
   * Delete the key and its value from the hash table
   *
   * Amoritized Time Complexity: O(1)
   * Worst Case Time Complexity: O(m)
   *
   * where m = the length of the longest array bucket in the case of a collision
   *
   * @param {string} key
   * @returns
   * @memberof HashTable
   */
  delete(key) {
    const index = this.hashFunc(key, this.limit);
    const bucket = this.items[index];
    let result = null;

    if (!bucket) {
      return result;
    }

    bucket.forEach((obj, i) => {
      if (obj[key]) {
        result = obj[key];
        bucket.splice(i, 1); // remove the element at this index
        this.length -= 1;
      }
    });

    return result;
  }

  /**
   * Resize the hash table when its gets too full for new keys
   *
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   *
   * where m = the length of the longest array bucket in the case of a collision
   *
   * @param {number} newLimit
   * @memberof HashTable
   */
  resize(newLimit) {
    const oldItems = this.items;

    this.limit = newLimit;

    // reset properties as they will be recalculated as hash table is resized
    this.length = 0;
    this.items = [];

    for (let i = 0; i < oldItems.length; i += 1) {
      const bucket = oldItems[i];
      if (bucket) {
        for (let j = 0; j < bucket.length; j += 1) {
          const obj = bucket[j];
          const key = Object.keys(obj)[0];
          const val = obj[key];

          this.set(key, val);
        }
      }
    }
  }
}

export default HashTable;
