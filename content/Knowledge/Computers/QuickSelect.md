---
sr-due: 2024-12-20
sr-interval: 3
sr-ease: 250
public: true
---

#review #algorithms #computer_science #brewed
 What is Quick Select? 
- Quick select is a selection algorithm to select k-th smallest element in the unsorted array.
- Like quick sort, has good average case performance, but poor worstcase performance
- 

Explaination : 
- Quick select partitions the list on pivot k such that any element less than k is on the left side of the array, any element greater than pivot k, is on the right side of k.

Selection PsuedoCode : 
```
QuickSelect(left, right, list, k) : 
    loop
        if left == right : 
            return list[left]
    
        // Select a pivot index between left & right
        // Initially randomly select a pivotindex
        pivotIndex := partition(list, left, right, pivotIndex)
    
        if k == pivotIndex : 
            return list[k]
        else if k < pivotIndex 
            right = pivotIndex - 1
        else 
            left = pivotIndex + 1

```

Partition : 
- Partition is to find the pivot. It can achieved using two algorithms
    - Lomuto Partition
    - Hoare Partition

Lomuto Partition : 
- This partition chooses last element as the pivot. 
- This degrades to O(n^2) when array is already in order.

```
algorithm Lomuto(A, lo, hi) : 
    pivot = A[hi]
    i := lo

    for j := lo to hi-1 do 
        if A[j] <  pivot then 
            if i != j 
                swap(i,j, A)
            i++
    swap(i, hi, A)
    return i
```

Hoare Partition
- This algorithm uses two indices at the start and end of the array and swaps elements while comparing with pivot

```
algorithm Hoare(A, lo, hi):
    pivot = i+j/2

    i = lo-1
    j = hi+1

    loop forever
        do i = i+1 while A[i] < A[pivot]
        do j = j-1 while A[j] > A[pivot]

        if i>=j return j

        Swap(i,j,A)
```

References 
- https://www.freecodecamp.org/news/quickselect-algorithm-explained-with-examples/
