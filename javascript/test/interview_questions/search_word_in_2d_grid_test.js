var assert = require('assert');
var patternSearch = require('../../interview_questions/search_word_in_2d_grid.js');

describe('Search word in a 2d grid Question', function() {

  var grid = [ 
               "GEEKSFORGEEKS",
               "GEEKSQUIZGEEK",
               "IDEQAPRACTICE"
             ];

  it('works', function() {
     assert.deepEqual(patternSearch(grid, "GEEKS"), [[0,0],[0,8],[1,0]]);
  });
});
