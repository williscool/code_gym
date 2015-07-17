// https://en.wikipedia.org/wiki/Tower_of_Hanoi
// https://en.wikipedia.org/wiki/Dynamic_programming#Tower_of_Hanoi_puzzle
// https://proofwiki.org/wiki/Tower_of_Hanoi
//
// my own personal hang up with this problem at first is that unlike many of the other dp solutions for problems 
// the classical solution to the tower of  is exponential in time complexity as opposed to linear such as memoized nth fibbonaci) 
//
// however a cleve professor Eastern Washington University has figured out how to trade exponential time for exponential space complexity
// here http://penguin.ewu.edu/~trolfe/DynamicHanoi/
//
// if you implement this let me know. I'd be interesting talking about it
//
//
// inspired by:
// https://www.khanacademy.org/computing/computer-science/algorithms/towers-of-hanoi/p/challenge-solve-hanoi-recursively
// https://github.com/mgechev/javascript-algorithms/blob/master/src/others/hanoi.js
// http://www2.hh.se/staff/vero/itads/2007/lectures/lecture4/printL4.pdf
// http://introcs.cs.princeton.edu/java/23recursion/TowersOfHanoi.java.html

function Hanoi(num_disks, source, destination, spare, result){

  // if(num_disks === 0) // do nothing
  
  var result = result || [];

  if(num_disks > 0) {
    Hanoi(num_disks - 1, source, spare, destination, result);
    result.push([source,destination]);
    Hanoi(num_disks - 1, spare, destination, source, result);
  }

  return result;
}

module.exports = Hanoi;
