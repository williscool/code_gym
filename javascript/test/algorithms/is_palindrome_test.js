import assert from 'assert';
import isPalindromeFns from '../../algorithms/is_palindrome';

Object.keys(isPalindromeFns).forEach((key) => {
  const isPalindrome = isPalindromeFns[key];

  describe(`${key} isPalindrome`, () => {
    describe('should check if a string is a palindrome', () => {
      it('a', () => {
        assert.equal(isPalindrome('a'), true);
      });
      it('motor', () => {
        assert.equal(isPalindrome('motor'), false);
      });
      it('rotor', () => {
        assert.equal(isPalindrome('rotor'), true);
      });
      // https://misterpalindrome.files.wordpress.com/2013/04/mr-palindrome-evil-olive.jpg
      it('evilolive', () => {
        assert.equal(isPalindrome('evilolive'), true);
      });
    });
  });
});
