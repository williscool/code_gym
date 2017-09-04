/* eslint max-len: ["error", 120, { "ignoreComments": true }] */
import fs from 'fs';
import path from 'path';

/**
 * So things dont get dupped all over the place
 * @module dsalgo.utils
 */
export default {
  utils: {
    /**
     * Just your Classic Swap Function here
     *
     * Given an array and 2 indicies swap there values
     *
     * techincally the return here is unnecessary since we never make a deepCopy of the array
     * so its muting the original. But I just like this interface better
     *
     * @param {array} list
     * @param {number} firstIndex
     * @param {number} secondIndex
     * @returns
     */
    /* eslint-disable no-param-reassign */
    swap(list, firstIndex, secondIndex) {
      const temp = list[firstIndex];
      list[firstIndex] = list[secondIndex];
      list[secondIndex] = temp;
      return list;
    },
    /* eslint-enable no-param-reassign */

    /**
     * Test if a thing is truthy
     *
     * "In JavaScript, a truthy value is a value that is considered true when evaluated in a Boolean context."
     *
     * https://developer.mozilla.org/en-US/docs/Glossary/Truthy
     *
     * Inspired by the jasmine test suite's method of the same name
     *
     * https://github.com/jasmine/jasmine/blob/master/src/core/matchers/toBeTruthy.js
     * http://nfriedly.com/techblog/2009/07/advanced-javascript-operators-and-truthy-falsy/
     *
     * @param {any} thing
     * @returns
     */
    isTruthy(thing) {
      return !!thing;
    },

    /**
     * Checks if a value is falsy
     *
     * "A falsy value is a value that translates to false when evaluated in a Boolean context."
     * https://developer.mozilla.org/en-US/docs/Glossary/Falsy
     *
     * Inspired by:
     *
     * https://github.com/jasmine/jasmine/blob/master/src/core/matchers/toBeFalsy.js
     * @param {any} thing
     * @returns
     */
    isFalsy(thing) {
      return !this.isTruthy(thing);
    },

    /**
     * Uses falsy check to make sure a thiing is defined
     *
     * Inspired by:
     * https://github.com/jasmine/jasmine/blob/master/src/core/matchers/toBeFalsy.js
     *
     * @param {any} thing
     * @returns
     */
    isDefined(thing) {
      return this.isFalsy(typeof thing === 'undefined');
    },

    /**
     * Makes an array filled with random values
     *
     * Very Useful for testing sorting functions
     *
     * @param {any} config - configuration object for random array
     * @param {number} config.precision - configure how precise to make floting point numbers
     * @returns {array}
     */
    makeRandomArray(config) {
      const conf = config || {};
      // need to be able to set to zero
      // http://stackoverflow.com/a/7615236/511710
      const precision = (!this.isDefined(config.precision)) ? 2 : conf.precision;
      const multiplier = 100;
      const size = 100;
      const result = [];

      for (let i = size; i > 0; i -= 1) {
        result.push(parseFloat((Math.random() * multiplier).toFixed(precision)));
      }
      return result;
    },

    /**
     * Clones an array
     *
     * array slice is fine for just numbers. would need to use JSON method if needed objects
     * return JSON.parse(JSON.stringify(thing)) ;
     *
     * http://davidwalsh.name/javascript-clone-array
     *
     * @param {array} thing
     * @returns
     */
    arrayDeepCopy(thing) {
      return thing.slice(0);
    },

    /**
     * Fills an array with values
     *
     * Useful for testing i.e. by making an array filled with 0s
     *
     * cribbed from:
     * http://stackoverflow.com/a/20223361/511710
     *
     * @param {any} value
     * @param {any} len
     * @returns {array}
     */
    simpleArrayFill(value, len) {
      const A = [];
      let i = 0;
      while (i < len) A[i += 1] = value;
      return A;
    },

    /**
     * Coerce string into a number... unless its not a number
     *
     * @param {any} val
     * @returns
     */
    makeNumberUnlessNaN(val) {
      const num = parseInt(val, 10);

      if (!isNaN(num)) return num;
      return val;
    },

    /**
     * Parse a comment in a function into a multiline string
     *
     * This is function and regex voodoo magic lol. But it worked when I needed it
     *
     * Now it is deprecated.
     *
     * http://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript/5571069#5571069
     *
     * @deprecated in favor of using template literals once we get the suite all es6 https://stackoverflow.com/a/805113/511710
     *
     * @param {Function} f
     * @returns {string}
     */
    multilineString(f) {
      // note monkeying with this voodoo regex lol
      // eslint-disable-next-line no-useless-escape
      return f.toString().replace(/^[^\/]+\/\*!?/, '').replace(/\*\/[^\/]+$/, '');
    },

    /**
     * Returns a version the object with the keys in sorted order
     *
     * http://stackoverflow.com/a/12834464/511710
     *
     * @param {Object} obj
     * @returns {Object}
     */
    sortObjectByKey(obj) {
      const keys = Object.keys(obj).sort();
      const sortedObj = {};

      // create new array based on Sorted Keys
      keys.forEach((key) => {
        sortedObj[key] = obj[key];
      });

      return sortedObj;
    },

    /**
     * Used to require long strings of text from files relatively in the project
     *
     * inspired by
     *
     * http://stackoverflow.com/a/6832105/511710
     * http://stackoverflow.com/a/12753026/511710
     *
     * also you have to pass dir because if not you'd have to do all kinds of crazy shit to get resolve to use the right path
     * re: google "node resolve caller"
     *
     *
     * fun fact this used to work but broke in node 5.7
     * ```
     * return fs.readFileSync(path.resolve(`${dirName}../${pathName}`)).toString();
     * ```
     *
     * Note the one parameter to path.resolve it just used to magically figure out.
     *
     * Pretty sure it was not every supposed to work that way lmao. Why it did is fun mystery to solve another day
     *
     *
     * @param {any} dirName
     * @param {any} pathName
     * @returns
     */
    requireText(dirName, pathName) {
      // eslint-disable-next-line max-len
      if (arguments.length < 2) return Error('first give me the directory path or __dirname and then the file path or you are gonna have a bad time');

      return fs.readFileSync(path.resolve(dirName, `./${pathName}`)).toString();
    },

    /**
     * Just creates an empty object I basically use as a hash table
     *
     * May deprecate in favor of
     *
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
     *
     * After es6ify
     *
     * @returns {Object} - empty object to use as a set
     */
    simpleSet() {
      // http://stackoverflow.com/a/18890005/511710
      // https://github.com/mbostock/d3/blob/master/src/arrays/set.js#L10
      return Object.create(null);
    },

    /**
     * Turns a decimal number into its binary representation
     *
     * http://stackoverflow.com/questions/9939760/how-do-i-convert-an-integer-to-binary-in-javascript/16155417#16155417
     *
     * @param {number} n
     * @returns
     */
    dec2bin(n) {
      // litterally the whole point of this function lol
      // eslint-disable-next-line no-bitwise
      return (n >>> 0).toString(2);
    },

    /**
     * bisect like from python
     *
     * https://github.com/python/cpython/blob/master/Lib/bisect.py
     * https://github.com/python/cpython/blob/master/Lib/test/test_bisect.py
     *
     * https://github.com/mbostock/d3/wiki/Arrays#d3_bisect
     * https://github.com/mbostock/d3/blob/master/src/arrays/bisect.js
     * https://github.com/mbostock/d3/blob/master/test/arrays/bisect-test.js
     *
     * @param {array} arr
     * @param {number} number
     * @param {number} lo
     * @param {number} hi
     * @returns
     */
    /* eslint-disable no-param-reassign */
    bisectRight(arr, number, lo, hi) {
      if (!this.isDefined(lo)) lo = 0;
      if (!this.isDefined(hi)) hi = arr.length;

      while (lo < hi) {
        const mid = (lo + hi) >>> 1; // eslint-disable-line no-bitwise

        if (number < arr[mid]) {
          hi = mid;
        } else {
          lo = mid + 1;
        }
      }

      return lo;
    },

    /**
     * Creates a 2d array
     *
     * original here only worked with perfectly square matrices. new version works regardless
     * http://stackoverflow.com/a/23867573/511710
     *
     * http://stackoverflow.com/a/3690005/511710
     *
     * Useful for graph problem solving
     *
     * @param {number} rows
     * @param {number} cols
     * @returns
     */
    create2Darray(rows, cols) {
      if (!this.isDefined(cols)) cols = rows;
      const arr = [];
      const row = [];
      // while (cols--) row.push(); // only need this if adding a fill
      //
      // eslint-disable-next-line no-cond-assign
      while (rows -= 1) arr.push(row.slice());
      return arr;
    },
    /* eslint-enable no-param-reassign */

    /**
     * Correctly calculates a mod b even if a < 0
     *
     * https://www.topcoder.com/community/data-science/data-science-tutorials/introduction-to-string-searching-algorithms/
     * https://github.com/djktno/rabin-karp-js/blob/master/rk.js
     * https://github.com/morenoh149/rabin-karp-search/blob/master/index.js
     *
     * @param {number} a
     * @param {number} b
     * @returns
     */
    mod(a, b) {
      return ((a % b) + b) % b;
    },

    /**
     * Feeble attempt at porting blank? or empty? from ruby to javascript
     *
     * Not as comprehensive or well tested as I would like
     *
     * https://github.com/jashkenas/underscore/blob/master/underscore.js#L1266
     * https://github.com/rails/rails/blob/42b0c942520e59399d70c2170253aa5275a42af1/activesupport/lib/active_support/core_ext/object/blank.rb
     * https://github.com/jprichardson/string.js/blob/master/lib/string.js // if i want to update to be just like blank and check for blank strings
     *
     * @param {any} thing
     * @returns
     */
    isEmpty(thing) {
      // does thingy exisit
      if (!this.isDefined(thing)) return true;
      if (this.isDefined(thing.length) && typeof thing.length === 'number' && isNaN(thing)) return false;
      // this would fail if an object has a length property that somehow gets set to NaN thus the above line
      // see if thingy is array like
      if (this.isDefined(thing.length) && typeof thing.length === 'number') return thing.length === 0; // its an array like thingling
      // otherwise is an object
      return Object.keys(thing).length === 0;
    },

    /**
     * Returns a clone of an object
     *
     * http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-clone-an-object/5344074#5344074
     *
     * @param {Object} obj
     * @returns {Object}
     */
    objDeepCopy(obj) {
      return JSON.parse(JSON.stringify(obj));
    },

    /**
     *  Repeats a string a bunch of times
     *
     *  I'll explain better why when I es6ify the code that uses this lol
     *
     *  http://stackoverflow.com/questions/1877475/repeat-character-n-times
     *
     * @param {string} string
     * @param {number} number
     * @returns
     */
    stringRepeat(string, number) {
      const n = number || 1;
      return Array(n + 1).join(string);
    },

    /**
     * Convert 2d array into a 1d index
     *
    * http://stackoverflow.com/questions/173061/convert-a-2d-array-index-into-a-1d-index
     *
     * @param {number} row
     * @param {number} col
     * @param {number} rowLength
     * @returns
     */
    oneDindex(row, col, rowLength) {
      return (row * rowLength) + col;
    },

  },
};
