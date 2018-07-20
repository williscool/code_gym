![Gif Walkthrough](../code_gym_build.gif)

# Overview

I have written, tested, documented, and linted several hundred data structures, algorithms, and coding problems in javascript.

As of today roughly 30 directories, ~200 files, and ~550 tests.

# About this (from a computer sciency point of view)

(This readme is still a work in progress here. bare with me)

Say some more stuff hear to show how coole this is

I started this repository of data structures and algorithms (hereforth dsalgo) as a way to learn to get better at the stuff for interviews.

I found out along the way I enjoyed working with the stuff and have learned alot.

I got started by working through coding the stuff here http://bigocheatsheet.com/

but I found out quickly I was trying to write paragraphs in a language I didn't understand.

So I started with the simplest thing I could think of... I figured out how to make an array in c

Then stacks, queues, linked lists, and so on and so forth until I learned first my abcs of different dsalgo and then started writing sentences (composing different dsalgo into interesting structures).

Until I could finally do coding problems pretty well.

# About this (from a javascript coder point of view)

I initally wrote this code base in es5 spaggetti lol.

I then kinda made my own adhoc style guide and some basic jshint to spruce things up

Details of which used to appear in this readme.

Now that I am in the process of porting it to es6, I'm using airbnb's javascript style guide and plugins

- [Airbnb Style Guide](https://github.com/airbnb/javascript)
- [Airbnb Babel Plugin](https://github.com/airbnb/babel-preset-airbnb)
- [Airbnb Eslint Plugin](https://www.npmjs.com/package/eslint-config-airbnb-base)

Fun fact: I'm the reason there is a [note at the top of the style guide](https://github.com/airbnb/javascript#airbnb-javascript-style-guide-) that says using the airbnb guide [requires using babel](https://github.com/airbnb/javascript/issues/1544) at least as of 2017. :)

## some other inspriation for later

[https://github.com/kdn251/interviews](https://github.com/kdn251/interviews)

## Testing

individual tests

```bash
 yarn mocha test/data_structures/bst_test.js
```

test suite

```bash
 yarn test
```

note: once I finish es6/ es6 next migration I'll enforce lint and test on commit

## Order I wrote things in (top is most recent bottom is least recent)

in case you are interested in following my curriculum of sorts

### interview cake

#### already coded

- permutation palindrome
- stolen breakfast drone
- which-appears-twice
- simulate 7 sided die
- simulate 5 sided die
- in place shuffle
- recursive-string-permutations
- reverse words
- braket validator
- paren matching
- does this linked list have a cycle
- delete node linked list
- reverse linked list
- queue with two stacks
- find-duplicate-files
- merge sort and everything else
- cake theif = unbounded knapsack
- trie

#### Bit manipulation

- and or xor not
- floating point (https://www.youtube.com/watch?v=PZRI1IfStY0)

#### dp

- knapsack
- egg drop problem
- tower of hanoi (my hang up with this problem at first is that unlike many of the other dp solutions for problems the optimal known solution toh is exponential in time complexity as opposed to linear such as memoized nth fibbonaci)
- nth Fibonacci

#### Primality checking

- http://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
- checking if a number is prime (some naive way aka trial division)

#### basic combo

- Cartesian product (technically doing the count for this is just multiplying the size of the sets. not interesting enough for the portfolio. now generating all of the subsets in the actual product is and may come later down the line )
- combinations_with_replacement
- permutations
- combinations

## graph

### algos

- union find
- kruskal http://stackoverflow.com/questions/1195872/kruskal-vs-prim
- prim
- djikstra
- dfs
- bfs

#### representations

- adjacency list
- adjacency matrx
- Incidence list
- Incidence matrix

#### heaps

- priority queue (naive, binary heap, binom, and fib)
- fibonacci heap
- binomial heap
- heap sort
- min heap
- max heap
- binary heap

#### searching algos

- binary search
- sequential search

#### sorts

- radix sort
- bucket sort
- counting sort
- merge sort
- quicksort
- selection sort
- insertion sort
- bubble sort

#### ds

- hash table
- bst
- quene
- stack with linked list
- linked list
- stack with array
- array in c

## Listing of Stuff

```
├── algorithms
│   ├── bit_manipulation
│   │   ├── flippin_bits.js
│   │   ├── floating_point.js
│   │   └── interger_to_binary.js
│   ├── dynamic_programming
│   │   ├── edit_distance.js
│   │   ├── egg_drop.js
│   │   ├── knapsack.js
│   │   ├── longest_alternating_subsequence.js
│   │   ├── longest_common_subsequence.js
│   │   ├── longest_common_substring.js
│   │   ├── longest_increasing_subsequence.js
│   │   ├── minimum_sum.js
│   │   ├── nth_fibbonacci.js
│   │   ├── plentiful_paths.js
│   │   ├── rod_cutting.js
│   │   └── tower_of_hanoi.js
│   ├── graph
│   │   ├── bellman_ford.js
│   │   ├── bfs.js
│   │   ├── cycle_detection.js
│   │   ├── dfs.js
│   │   ├── djikstra.js
│   │   ├── kruskal.js
│   │   ├── prim.js
│   │   ├── shortest_path_walker.js
│   │   ├── strongly_connected_components.js
│   │   ├── topological_sort.js
│   │   ├── transitive_clousure.js
│   │   └── uf.js
│   ├── is_palindrome.js
│   ├── searching
│   │   ├── binarysearch.js
│   │   └── sequentialsearch.js
│   ├── sorting
│   │   ├── bubblesort.js
│   │   ├── countingsort.js
│   │   ├── heapsort.js
│   │   ├── insertionsort.js
│   │   ├── mergesort.js
│   │   ├── patiencesort.js
│   │   ├── quicksort.js
│   │   ├── radixsort.js
│   │   └── selectionsort.js
│   └── string_search
│       ├── boyer_moore.js
│       ├── kmp.js
│       ├── naive_string_search.js
│       └── rabin_karp.js
├── data
│   └── graph
│       ├── tinyDAG.txt
│       ├── tinyDG.txt
│       ├── tinyEWD.txt
│       ├── tinyEWDn.txt
│       ├── tinyEWDnc.txt
│       ├── tinyEWG.txt
│       ├── tinyG.txt
│       └── tinyUF.txt
├── data_structures
│   ├── bst
│   │   ├── binary_search_tree.js
│   │   ├── bst_useful_commands.md
│   │   └── node.js
│   ├── graph.js
│   ├── hash_table.js
│   ├── heap
│   │   ├── binary_heap.js
│   │   ├── binomial_heap.js
│   │   └── fibonacci_heap.js
│   ├── linked_list
│   │   ├── circularly_linked_list.js
│   │   ├── doubly_linked_list.js
│   │   └── singly_linked_list.js
│   ├── priority_queue.js
│   ├── queue.js
│   ├── square_grid.js
│   ├── stack.js
│   └── trie.js
├── interview_questions
│   ├── all_time_math.js
│   ├── bracket_validator.js
│   ├── cake_theif.js
│   ├── delete_node_linked_list_node_with_side_effects.js
│   ├── find_smallest_num.js
│   ├── fisher_yates_shuffle.js
│   ├── generating_all_combinations_of_a_given_string.js
│   ├── generating_all_permutations_of_a_given_string.js
│   ├── generating_all_substrings_of_a_string.js
│   ├── highest_product_of_3.js
│   ├── is_super_balanced.js
│   ├── linked_list_contains_cycle.js
│   ├── making_change.js
│   ├── matching_parenthesis.js
│   ├── merging_meetings.js
│   ├── movie_flight_times.js
│   ├── permutation_palindrome.js
│   ├── product_of_ints_except_at_index.js
│   ├── rand_to_rand.js
│   ├── rectangular_love.js
│   ├── remove_duplicates.js
│   ├── reverse_linked_list.js
│   ├── reverse_string_words_in_place.js
│   ├── search_word_in_2d_grid.js
│   ├── stock_price.js
│   ├── which_appears_once.js
│   └── which_appears_twice.js
├── math
│   ├── cartesian_product.js
│   ├── combinatorics
│   │   ├── combinations.js
│   │   └── permutations.js
│   ├── factorial.js
│   ├── gcd.js
│   ├── power_set.js
│   └── primality
│       ├── is_prime.js
│       └── sieve_of_erotosthenes.js
├── test
│   ├── algorithms
│   │   ├── bit_manipulation
│   │   │   ├── flippin_bits_test.js
│   │   │   ├── floating_point_test.js
│   │   │   └── interger_to_binary_test.js
│   │   ├── dynamic_programming
│   │   │   ├── edit_distance_test.js
│   │   │   ├── egg_drop_test.js
│   │   │   ├── knapsack_test.js
│   │   │   ├── longest_alternating_subsequence_test.js
│   │   │   ├── longest_common_subsequence_test.js
│   │   │   ├── longest_common_substring_test.js
│   │   │   ├── longest_increasing_subsequence_test.js
│   │   │   ├── minimum_sum_test.js
│   │   │   ├── nth_fibbonacci_test.js
│   │   │   ├── plentiful_paths_test.js
│   │   │   ├── rod_cutting_test.js
│   │   │   └── tower_of_hanoi_test.js
│   │   ├── graph
│   │   │   ├── bellman_ford_test.js
│   │   │   ├── bfs_test.js
│   │   │   ├── cycle_detection_test.js
│   │   │   ├── dfs_test.js
│   │   │   ├── djikstra_test.js
│   │   │   ├── kruskal_test.js
│   │   │   ├── prim_test.js
│   │   │   ├── strongly_connected_components_test.js
│   │   │   ├── topological_sort_test.js
│   │   │   ├── transitive_closure_test.js
│   │   │   └── uf_test.js
│   │   ├── is_palindrome_test.js
│   │   ├── searching
│   │   │   ├── binarysearch_test.js
│   │   │   └── sequentialsearch_test.js
│   │   ├── sorting
│   │   │   ├── bubblesort_test.js
│   │   │   ├── countingsort_test.js
│   │   │   ├── heapsort_test.js
│   │   │   ├── insertionsort_test.js
│   │   │   ├── mergesort_test.js
│   │   │   ├── patiencesort_test.js
│   │   │   ├── quicksort_test.js
│   │   │   ├── radixsort_test.js
│   │   │   └── selectionsort_test.js
│   │   └── string_search
│   │       ├── boyer_moore_test.js
│   │       ├── kmp_test.js
│   │       ├── naive_string_search_test.js
│   │       └── rabin_karp_test.js
│   ├── data_structures
│   │   ├── binary_heap_test.js
│   │   ├── binomial_heap_test.js
│   │   ├── bst_test.js
│   │   ├── circularly_linked_list_test.js
│   │   ├── doubly_linked_list_test.js
│   │   ├── fibonacci_heap_test.js
│   │   ├── graph_test.js
│   │   ├── hash_table_test.js
│   │   ├── priority_queue_test.js
│   │   ├── queue_test.js
│   │   ├── singly_linked_list_test.js
│   │   ├── square_grid_test.js
│   │   ├── stack_test.js
│   │   └── trie_test.js
│   ├── interview_questions
│   │   ├── all_time_math_test.js
│   │   ├── cake_theif_test.js
│   │   ├── find_smallest_num_test.js
│   │   ├── generating_all_combinations_of_a_given_string_test.js
│   │   ├── generating_all_permutations_of_a_given_string_test.js
│   │   ├── generating_all_substrings_of_a_string_test.js
│   │   ├── highest_product_of_3_test.js
│   │   ├── is_super_balanced_test.js
│   │   ├── making_change_test.js
│   │   ├── merging_meetings_test.js
│   │   ├── movie_flight_times_test.js
│   │   ├── permutation_palindrome_test.js
│   │   ├── product_of_ints_except_at_index_test.js
│   │   ├── rectangular_love_test.js
│   │   ├── remove_duplicates_test.js
│   │   ├── reverse_string_words_in_place_test.js
│   │   ├── search_word_in_2d_grid_test.js
│   │   ├── stock_price_test.js
│   │   ├── which_appears_once_test.js
│   │   └── which_appears_twice_test.js
│   └── math
│       ├── cartesian_product_test.js
│       ├── combinatorics
│       │   ├── combinations_test.js
│       │   └── permutations_test.js
│       ├── factorial_test.js
│       ├── gcd_test.js
│       ├── power_set_test.js
│       └── primality
│           ├── is_prime_test.js
│           └── sieve_of_erotosthenes_test.js
```
