
/**
 * https://en.wikipedia.org/wiki/Tower_of_Hanoi
 *
 * Likely never TODO:
 *
 * reimplement with this solution. So I can see how the disks move back and forth
 *
 * which would probably help me really understand wtf is goin on here
 *
 *  https://en.wikipedia.org/wiki/Tower_of_Hanoi#Recursive_solution
 *
 * also this video is pretty helpful https://www.youtube.com/watch?v=UuIneNBbscc
 *
 * What I do get so far is that there are 2^n (where n is the num of disks)
 * states the game can be in and at the start you are in one... so obviously to get to this other state we will need to (2^n) - 1 movees
 * notes:
 *
 * https://en.wikipedia.org/wiki/Dynamic_programming#Tower_of_Hanoi_puzzle
 * https://proofwiki.org/wiki/Tower_of_Hanoi
 *
 * my own personal hang up with this problem at first is that unlike many of the other dp solutions for problems
 * the classical solution to the tower of is exponential in time complexity as opposed to linear such as memoized nth fibbonaci)
 *
 * however a clever professor Eastern Washington University has figured out how to trade exponential time for exponential space complexity o.o
 * here http://penguin.ewu.edu/~trolfe/DynamicHanoi/
 *
 * if you implement this let me know. It would be interesting to talk about it
 *
 * inspired by:
 * https://www.khanacademy.org/computing/computer-science/algorithms/towers-of-hanoi/p/challenge-solve-hanoi-recursively
 * https://github.com/mgechev/javascript-algorithms/blob/master/src/others/hanoi.js
 * http://www2.hh.se/staff/vero/itads/2007/lectures/lecture4/printL4.pdf
 * http://introcs.cs.princeton.edu/java/23recursion/TowersOfHanoi.java.html
 *
 * @param {number} numDisks
 * @param {number} source
 * @param {number} destination
 * @param {number} spare
 * @param {number[]} [result=[]]
 * @returns {array}
 */
function Hanoi(numDisks, source, destination, spare, result = []) {
  // if(numDisks === 0) // do nothing
  if (numDisks > 0) {
    Hanoi(numDisks - 1, source, spare, destination, result);
    result.push([source, destination]);
    Hanoi(numDisks - 1, spare, destination, source, result);
  }

  return result;
}

export default Hanoi;
