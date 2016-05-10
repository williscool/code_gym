/* 
  remove duplicates from an array
  
  could have 0 elements
  
  could be any type of value

*/

function removeDuplicates(arr){

    if(arr.length <= 1) return arr;
    
    var table = {};
    var output = [];
    var hash_key;
    
    for(var i = 0; i < arr.length; i++){
        hash_key = JSON.stringify(arr[i]);
        
        if(!table[hash_key]){
            output.push(arr[i]);
        }
        
        table[hash_key] = true;
    }
    
    return output;
}

module.exports = removeDuplicates;
