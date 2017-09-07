
import Heap from '../../data_structures/heap/binary_heap';

const MaxHeap = Heap.max;

/**
 * Uses a max heap to sort an array
 *
 * Though I bet you could use a min heap and reverse it to get the same effect
 *
 * inspirtations:
 *
 * http://en.wikipedia.org/wiki/Heapsort
 * http://rosettacode.org/wiki/Sorting_algorithms/Heapsort
 * and the CLRS intro to algorithms version
 *
 * @module HeapSort
 * @param {any} list
 * @returns
 */
export default function (list) {
  // build a heap does a similar thing to heapify in the wikipiedia version of this algorithm
  // all you care about is that you have a valid heap when you begin the algorithm
  const heap = new MaxHeap({ array: list });
  return heap.heapsort();
}
