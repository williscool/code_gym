Algorithm for understanding how any heap works

1. how do you insert into the heap?
2. how does insert preserve the heap property?
3. how do you remove a thing from the tree
4. how does that maintain or restore the heap property? 


Algorithm for fomulating a dynamic programming solution to a problem

1. much like with recusive algorithm there will be base cases. fomulate them and how to return in those cases
2. for the largess of the values and final desired value there is an equation that builds the values that relies on subproblems that overlap. And algoritm's that calculate the ultimate solution with these overlapping subproblem either
- start with asking for the desired end value of the function for the inputs (top down) and calculate the values of the subproblems that build to until until reaching the base cases. Onces those unravel in the stack you arrive at the solution
- start with the base cases of subproblems and build up (bottom up) to the values from the desired inputs