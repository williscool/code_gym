function  highestProductOfThree(ints) {
  var highest_product_of_three, lowest_product_of_two, highest_product_of_two, highest, lowest;

  highest = Math.max(ints[0],ints[1]);
  lowest = Math.min(ints[0],ints[1]);

  highest_product_of_two = ints[0] * ints[1];
  lowest_product_of_two = ints[0] * ints[1];

  highest_product_of_three = highest_product_of_two * ints[2];

  ints.forEach(function(num, i, array){
    if(i > 1){ // skip vars we inited to
      highest_product_of_three = Math.max( highest_product_of_three , highest_product_of_two * num, lowest_product_of_two * num); 

      highest_product_of_two = Math.max( highest_product_of_two, highest * num, lowest * num ); 

      lowest_product_of_two = Math.min( lowest_product_of_two, lowest * num, highest * num ); 

      highest = Math.max(num,highest); 
      lowest = Math.min(num,lowest);
    } 
  });

  return highest_product_of_three;
}


module.exports = highestProductOfThree;
