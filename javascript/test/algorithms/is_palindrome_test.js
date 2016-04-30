var assert = require('assert');
var isPalindromeFns = require('../../algorithms/is_palindrome.js');

Object.keys(isPalindromeFns).forEach(function(key) {

  var isPalindrome = isPalindromeFns[key];

  describe(key + " isPalindrome", function() {
    describe("should check if a string is a palindrome", function() {
      it("a", function() {
        assert.equal(isPalindrome("a"), true);
      });
      it("motor", function() {
        assert.equal(isPalindrome("motor"), false);
      });
      it("rotor", function() {
        assert.equal(isPalindrome("rotor"), true);
      });
      // https://misterpalindrome.files.wordpress.com/2013/04/mr-palindrome-evil-olive.jpg
      it("evilolive", function() {
        assert.equal(isPalindrome("evilolive"), true);
      });
    });
  });
});
