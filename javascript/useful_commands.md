binary heap commandline invoke

```
var maxHeap = require('./data_structures/heap/binary_heap.js').max;
var test = new maxHeap([9, 2, 8, 6, 1, 3]);
test.items;
```

binomial heap commandline invoke
```
var BinomialHeap = require('./data_structures/heap/binomial_heap.js');
var heap = new BinomialHeap();
heap.insert(25).insert(57).insert(42).insert(30);

heap.insert(24).insert(37).insert(42).insert(25).insert(57).insert(39).insert(30);
heap.root;
```
