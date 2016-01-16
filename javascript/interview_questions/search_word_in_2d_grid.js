// http://www.geeksforgeeks.org/search-a-word-in-a-2d-grid-of-characters/
function search2D( grid, row, col, word ) {

  // early exit if first character fails
  if(grid[row][col] !== word[0] ) return false;

  // clockwise 8 cardinal directions;
  var DIRS = [[-1,-1], [-1,0], [-1,1], [0,1], [1,1], [1,0], [1,-1], [0,-1]];

  var word_len = word.length;

  for(var d = 0; d < 8; d++) {
    
    var rd = row + DIRS[d][0], cd = col + DIRS[d][1];

    // start at second char because we already checked first
    for(var k = 1; k <  word_len; k++) {
     
      // out of bounds check
      if(rd > grid.length || rd < 0 || cd > grid[0].length || cd < 0 ){
        // we went out of bounds word check for loop
        break;
      } 

      if(grid[rd][cd] !== word[k]){
        // we didnt match the word letter quit for loop
        break;
      } 
       
      rd += DIRS[d][0]; cd += DIRS[d][1];
    }
    
    if(k === word_len) return true;
  }

  return false;
}

function patternSearch(grid, word){
  var result = [];

  for(var row = 0; row < grid.length; row++){
    for(var col = 0; col < grid[0].length; col++){

      if( search2D(grid, row, col, word) ) result.push([row,col]);

    }
  }

  return result;
}

module.exports = patternSearch;
