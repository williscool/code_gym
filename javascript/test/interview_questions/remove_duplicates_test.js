var assert = require('assert');
var removeDuplicates = require('../../interview_questions/remove_duplicates.js');

describe('Remove Duplicates', function() {

  describe('should work with arrays', function() {

    it('that are empty', function() {
      assert.deepEqual(removeDuplicates([]), []);
    });

    it('with no duplicates', function() {
      assert.deepEqual(removeDuplicates([1,2]), [1,2]);
    });

    it('that have duplicates', function() {
      assert.deepEqual(removeDuplicates([3,3,3]), [3]);
    });

    it('that contain objects', function() {

      var Person = function(name) {
          this.name = name;
      };

      Person.prototype = {
          name: null
      };

      var albert = new Person('Albert');
      var bob = new Person('Bob');
      var bobAgain = new Person('Bob');

      var input = [albert,bob, bobAgain];
      
      assert.deepEqual(removeDuplicates(input), [albert,bob]);
    });

  });

});
