---
tags: [programming/go, reference, brewed]
part-of: "[[Go MOC]]"
---

# Go — Arrays & Slices

> Part of **[[Go MOC]]**. [[Go - Closures and Factory Functions|← Closures & Factory Functions]]  ·  [[Go - Maps|Maps →]]

## Arrays & Slices

- Go Arrays are of fixed-length sequence of same type (homogeneous data structure). This type can be anything. 
- Arrays are mutable. 
- Arrays in Go are value type

```go
var arr2 = new([5]int)

var arr1 [5] int
```

In the above code, `arr1` is of type `[5]int`, where as arr2 is of type `*[5]int`. This is because new(T) allocate zeroed storage for a new item of type T and returns its address.

When an array is passed as an argument to a function like in func1(arr1), a copy of the array is made, and func1 cannot change the original array arr1.

Ways to Intialize arrays
`var arrAge = [5]int{18,20,15,22,16}'
`var arr = [10]int{1,2,3}`

The [...] notion
`var arrLazy [...]int = [...]int{5,6,7,8,22}`
... indicates the compiler has to count the number of items to obtain the length of the array. 

if ... is omitted then a slice is created.

`var arrKeyValue = [5]string{3 : "value", 5 : "value2"}`

### Slice
Slice is a reference to a contiguous segment of an array(which will call the underlying array, which is usually anonymous). So a slice is a reference type. 

A slice in memory is a structure with 3 fields : 
- a pointer to the underlying array
- the length of the slice
- the capacity of the slice

Unlike an array the length of the slice can change during execution of the code. Minimally 0, maximally the length of the underlying array.

```go
var identifier []type // no length specified

var slice1 []type = arr1[start:end]
```
we are growing the slice1 as:slice1 = slice1[0:4]

if s2 is a slice, then you can move the slice forward by one with 
`s2 = s2[1:]`

Creating a slice with make()
```go
var slice1 []int = make([]int, len)
or
slice1 := make([]int, len)
```
Difference between new() and make()
- Both allocate memory on heap, but they do different things
- new(T) allocates zeroed storage for a new item of type T and returns its address as a value of type *T. It applies to value types like arrays and structs & it is equivalent to &T{}
- make(T) returns an intialized value of type T. It applies only to the 3 built-in reference types : Slices, Maps and channesl.

In other words, new allocates & make initalizes, 

![[GoLangInitializers.png]]

### MultiDimensional Arrays
- Go's arrays are always rectangular
- Inner arrays always have same length
- `[width][height]`
- Like arrays, slices are one-dimensional but maybe composed to construct higher-dimensional objects with slice of slices or array of slices. Here lenghts may vary dynamically, so Go's multi-dimensional slices can be jaggered.
- In MD slices, the inner slices must be allocated individually with make(T)

```go
func main() {
  values := [][]int{}
  
  row1 := []int{1,2,3}
  row2 := []int{4,5,6}

  values = append(values,row1)
  values = append(values,row2)
}
```

For `range` with multidimensional arrays
```go
package main
import "fmt"

func main() {
  value := 0
  screen := [2][2]int{}

  for row:= range screen{
    for column := range scree[row] {
      screen[row][column] = value
      value++
    }
  }
}
```

### Re-slicing
- Changing the length of the slice is called re-slicing
- It is done like : `slice1 = slice1[0:end]` where end is another end-index (length) than before
- Resizing can be done to smaller size as well.
- `copy` and `append` are functions for copying & appending to a slice

### Bytes Package
- Slices of bytes are very common in go. Go has a `bytes` package
- It comes with a very handy type `Buffer`
- Buffer is a variable-sized buffer of bytes with Read & Write methods, because reading and writing of unknown number of bytes is best done buffered. 
```go
var buffer bytes.Buffer

var r *bytes.Buffer = new(bytes.Buffer)

func NewBuffer(buf []byte) *Buffer
```

- Buffer can be used to concatinate strings. Make buffer append a string s to it with `buffer.WriteString(S)` method.
- Buffer can be converted back to string using `buffer.String()` method.
- This method is much more memory & CPU efficient than +=, especially if the number of string to concatenate is large.

## Simulating operations with append

Append a slice b to an existing slice a:
```go
a = append(a, b...)
```

Delete item at index i:
```go
a = append(a[:i], a[i+1:]...)
```

Cut from index i till j out of slice a:
```go
a = append(a[:i], a[j:]...)
```

Extend slice a with a new slice of length j:
```go
a = append(a, make([]T, j)...)
```

Insert item x at index i:
```go
a = append(a[:i], append([]T{x}, a[i:]...)...)
```

Insert a new slice of length j at index i:
```go
a = append(a[:i], append(make([]T, j), a[i:]...)...)
```

Insert an existing slice b at index i:
```go
a = append(a[:i], append(b, a[i:]...)...)
```

Pop highest element from stack:
```go
x, a = a[len(a)-1], a[:len(a)-1]
```

Push an element x on a stack:
```go
a = append(a, x)
```
