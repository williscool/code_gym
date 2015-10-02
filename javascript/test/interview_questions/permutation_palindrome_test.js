var assert = require('assert');
var hasPalindromePermutation = require('../../interview_questions/permutation_palindrome.js');

describe("hasPalindromePermutation", function() {
  describe("should check if any permuation of string is a palindrome", function() {
    it("a", function() {
      assert.equal(hasPalindromePermutation("a"), true);
    });
    it("motor", function() {
      assert.equal(hasPalindromePermutation("motor"), false);
    });
    it("rotor", function() {
      assert.equal(hasPalindromePermutation("rotor"), true);
    });
    // https://misterpalindrome.files.wordpress.com/2013/04/mr-palindrome-evil-olive.jpg
    it("evilolive", function() {
      assert.equal(hasPalindromePermutation("evilolive"), true);
    });
    it("ivicc", function() {
      assert.equal(hasPalindromePermutation("ivicc"), true);
    });
  });
});
