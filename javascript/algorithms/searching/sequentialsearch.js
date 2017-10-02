/**
 * Sequential or Linear Search
 *
 * Time Complexity: O(n)
 *
 * Hands down one of the simplest algorithms there is.
 *
 * You scan the array... you find the value or you dont lol.
 *
 * No more complicated than that.
 *
 * http://en.wikipedia.org/wiki/Linear_search
 *
 * Note:
 *
 * One day I want to make a troll challenge using this knowledge
 *
 * https://en.wikipedia.org/wiki/Linear_search#Application
 *
 * All you need is the right size (not too big not) unsorted data
 *
 * @module SequentialSearch
 * @param {number[]} list input array to search for value
 * @param {number} needle value to search for
 * @returns {number|boolean} was value in array?
 */
export default function (list, needle) {
  const len = list.length;

  let i = 0;
  while (i < len) {
    // if we find the value return its index
    if (list[i] === needle) return i;
    i += 1;
  }

  // if not return false
  return false;
}
