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
     * @returns {array} reference to input list
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
     * @param {any} thing value to test if truthy
     * @returns {boolean} if value is truthy or not
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
     * @param {any} thing thing to test if falsy
     * @returns {boolean} is thing falsy?
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
     * @param {any} thing thing to test
     * @returns {boolean} false if thing is undefined true otherwise
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
     * @returns {number[]} array with random numbers
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
     * @param {array} thing input
     * @returns {array} copy
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
     * @todo there are probably more functions in here with the same off by one as zero fill had
     *
     * @param {any} value value to fill array with
     * @param {any} len number of times you want value repeated in array
     * @returns {array} array full of repeated input value
     */
    simpleArrayFill(value, len) {
      const A = [];
      let i = 0;
      while (i < len) {
        A[i] = value;
        i += 1;
      }
      return A;
    },

    /**
     * Coerce string into a number... unless its not a number
     *
     * In that case it just returns it unaltered
     *
     * @param {any} val input
     * @returns {any} number version of value if it is a number. value unchanged if not
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
     * @deprecated in favor of using template literals once we get the codebase all es6 https://stackoverflow.com/a/805113/511710
     * @param {Function} f function to extract multiline comment from
     * @returns {string} multiline string
     */
    multilineString(f) {
      // not monkeying with this voodoo regex lol
      // this is deprecated anyway
      // eslint-disable-next-line no-useless-escape
      return f.toString().replace(/^[^\/]+\/\*!?/, '').replace(/\*\/[^\/]+$/, '');
    },

    /**
     * Returns a version the object with the keys in sorted order
     *
     * http://stackoverflow.com/a/12834464/511710
     *
     * @param {Object} obj obj to sort keys
     * @returns {Object} version of object with the keys in sorted order
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
     * Pretty sure it was not ever supposed to work that way lmao. Why it did is fun mystery to solve another day
     *
     *
     * @param {any} dirName base directory from which to start looking for file usually `__dirname`
     * @param {any} pathName path or relative path from which to get text file for requiring
     * @returns {string} text from pathName file
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
      // https://github.com/d3/d3/blob/v3.5.17/src/arrays/set.js#L11
      return Object.create(null);
    },

    /**
     * Turns a decimal number into its binary representation
     *
     * http://stackoverflow.com/questions/9939760/how-do-i-convert-an-integer-to-binary-in-javascript/16155417#16155417
     *
     * @param {number} n number to get binary representation of
     * @returns {string} string of input number in binary form
     */
    dec2bin(n) {
      // litterally the whole point of this function lol
      // eslint-disable-next-line no-bitwise
      return (n >>> 0).toString(2);
    },

    /**
     * bisect like from python
     *
     * Returns the index where to insert item x in list a, assuming a is sorted.
     *
     * https://github.com/python/cpython/blob/master/Lib/bisect.py
     * https://github.com/python/cpython/blob/master/Lib/test/test_bisect.py
     *
     * https://github.com/mbostock/d3/wiki/Arrays#d3_bisect
     * https://github.com/mbostock/d3/blob/master/src/arrays/bisect.js
     * https://github.com/mbostock/d3/blob/master/test/arrays/bisect-test.js
     *
     * @param {array} arr array to bisect in
     * @param {number} number number to bisect into place
     * @param {number} [lo=0] the lowest postion in arr to consider for the bisect
     * @param {number} [hi=arr.length] the highest position in arr to consider for bisect
     * @returns {number} position to insert value into
     */
    /* eslint-disable no-param-reassign */
    bisectRight(arr, number, lo = 0, hi) {
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
     * Useful for dynamic programming programming problem solving
     *
     * @param {number} rows number of rows to have in 2d array
     * @param {number} cols num of cols to have in 2d array
     * @returns {[][]} 2d array
     */
    create2Darray(rows, cols) {
      if (!this.isDefined(cols)) cols = rows;
      const arr = [];
      const row = [];

      while (rows > 0) {
        arr.push(row.slice());
        rows -= 1;
      }
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
     * @param {number} a number to be modulo'd
     * @param {number} b number doing the modulo'ing
     * @returns {number} modulus
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
     * @param {any} thing to tell if empty or not
     * @returns {boolean} if thing is empty or not
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
     * @param {Object} obj input
     * @returns {Object} copy of object
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
     * @param {string} string string to repeat
     * @param {number} number # of time to repeat string
     * @returns {string} input string repeated # of times
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
     * @param {number} row row to access
     * @param {number} col column to access
     * @param {number} rowLength lenght of rows
     * @returns {number} index in 1d version of 2d array
     */
    oneDindex(row, col, rowLength) {
      return (row * rowLength) + col;
    },

  },
};
