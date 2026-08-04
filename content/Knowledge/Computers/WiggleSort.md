#computer_science #algorithms #brewing
Given an integer array nums, reorder it such that nums[0] < nums[1] > nums[2] < nums[3]

Solution is to split the array into two halves such that one half has all the elements less than the other half. 
This way when you pick one element from each half, then value from left half is always less than the right half. 
Now we can construct the array with both halves
The partition step uses [[QuickSelect]]

Refer - https://leetcode.com/problems/wiggle-sort-ii/solutions/956983/golang-quick-select-median-3-partition-solution/



