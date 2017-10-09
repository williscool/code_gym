
/**
 * Module that takes a string and checks if its a palindrome.
 *
 * Super simple
 *
 * A palindrome is a word, phrase, number, or other sequence of characters which reads the same backward as forward, such as madam or racecar.
 *
 * https://en.wikipedia.org/wiki/Palindrome
 * https://www.khanacademy.org/computing/computer-science/algorithms/recursive-algorithms/p/challenge-is-a-string-a-palindrome
 *
 * @module isPalindrome
 */

/**
 * Returns the first character of a string str
 *
 * @param {string} str input
 * @returns {string} first char of input
 */
const firstCharacter = str => str.slice(0, 1);

/**
 * Returns the last character of a string str
 *
 * @param {string} str input
 * @returns {string} last char of input
 */
const lastCharacter = str => str.slice(-1);

/**
 * Returns the string that results from removing the first
 * and last characters from str
 *
 * @param {string} str input
 * @returns {string} string that results from removing the first
 */
const middleCharacters = str => str.slice(1, -1);

/**
 * Implements the palindrome check recursively
 *
 * @param {string} str input
 * @returns {boolean} is the input a palindrome or nah?
 */
function isPalindrome(str) {
  // base case #1
  if (str.length <= 1) {
    return true;
  }
  // base case #2
  if (firstCharacter(str) !== lastCharacter(str)) {
    return false;
  }
  // recursive case
  return isPalindrome(middleCharacters(str));
}

/**
 * Implements the palindrome check iteratively
 *
 * @param {string} str input
 * @returns {boolean} is the input a palindrome or nah?
 */
function isPalindromeIterative(str) {
  let i = 0;
  let j = str.length - 1;

  while (i <= j) {
    if (str[i] !== str[j]) return false;
    i += 1;
    j -= 1;
  }

  return true;
}

export default {
  recursive: isPalindrome,
  iterative: isPalindromeIterative,
};
