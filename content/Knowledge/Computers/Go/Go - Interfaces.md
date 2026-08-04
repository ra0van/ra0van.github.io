---
tags: [programming/go, reference, brewed]
part-of: "[[Go MOC]]"
---

# Go — Interfaces

> Part of **[[Go MOC]]**. [[Go - Garbage Collector|← Garbage Collector]]  ·  [[Go - Reflection|Reflection →]]

## Interfaces
An interface defines a set of methods, but these methods do not contain code. They are abstract.
An interface cannot contain variables. 

```go
type Namer interface {
    Method1(param_list) return_type
    Method2(param_list) return_type
}
```

> Name of an interface is formed by the method name plus the [er] suffix. such as printer, writer, Reader, etc. Thereby giving an active noun as a name. 
> A less used alternative(when ..er is not appropriate.) is to end with able, ex: Recoverable or start with I like in java or .NET.

- Interfaces in Go are short, they usually have few methods, except for empyt interfaces which has 0 methods.
- Unlike in most OO languages in Go, interfaces can have values that are a variable for the interface type of value

`var ai Namer`

Types (like structs) can have method set of the interface implemented. The implementation contains real code for each method and how to act on a variable of that type : they implement the interface.
The method set forms the interface ofthat type.
A variable of a type that implements the interface can be assigned to ai and the method table then has pointers to the implemented interface methods.
Of course, both of these change when a variable of another type is assigned to ai.

> A type doesn't have to state explicityly that it implements an interface; interfaces are satisfied implicitly.
> Multiple types can implement the same interface.
> A type that impleents an interface can also have other functions
> A type can implement many interfaces.
> An interface type can contain a reference to an instance of any of the types that implement the interface.

Even if the interface was defined later than tye type, in a different package or compiled spearately : if the object implements the methods name in the interface, then it implements the interface. All these properties allwo for a lot of flexibility.

```go
package main
import "fmt"

type Shaper interface {
    Area() float32
}

type Square struct {
    side float32
}

func (sq *Square) Area() float32 {
    return sq.side * sq.side
}

func main() {
    sq1 := new(Square)
    sq1.side = 5
    var areaIntf Shaper
    areaIntf = sq1

    fmt.Println("The square has an area of %f\n", areaIntf.Area())
}
```

## Embedded interfaces and type assertions
```go
type ReadWrite interface {
    Read(b Buffer) bool
    Write(b Buffer) bool 
}

type Lock interface {
    Lock()
    Unlock()
}

type File interface {
    ReadWrite
    Lock
    Close()
}

```

### Detecting and converting the type of an interface variable
- An interface type variable can contain a value of any type; we must have a means to detect this dynamic type, which is the actual type of the value stored in the variable at run time. 
- They dynamic type may vary during execution but is always assignable to the type of the interface variable itself.
- We can test if an interface variable contains at a certain moment a variable of type T with type assertion

``` v := varI.(T) // unchecked type assertion```

VarI must ben an interface variable. If not, the compiler signals ther error : Invalid type assertion: varI.(T) 

A type assertion may not be valid. The compiler does its utmost best to see if the conversion is valid. but it cannot foresee all possible cases. 
Hence type assertion is safe

```go
if v,ok := varI.(T); ok {
    Process(v)
    return
}
```

> Note : Always use the comma,ok form for type assertions

### The Type Switch
The type of an interface variable can also be tested with a special kind of switch: type-switch. 

```go
switch t := areaIntf.(type) { 
    case *Square:
        fmt.Printf("type t")

    case *Circle:
        fmt.Printf("type circle")

    default :
        fmt.Print("Unexpected type")
}
```

```go
func classifer(items ...interface{}) {
    for i,x := range items {
        switch x.(type) {
            case bool: fmt.Printf("bool")
            case float64: fmt.Printf("float64")
            case int, int64 : fmt.Printf("integer")
            case nil: fmt.Printf("param is nil")
            default: fmt.Printf("type unkown")
        }
    }
}
```

## Sorting with sorter interface
- Sorter interface requires the following three methods to be implemented
```go
type Interface interface {
    Len() int
    Less(i,j int) bool
    Swap(i,j int)
}
```

```go
type IntSlice []int
func (p IntSlice) Len() int { return len(p) }
func (p IntSlice) Less(i, j int) bool { return p[i] < p[j] }
func (p IntSlice) Swap(i, j int) { p[i], p[j] = p[j], p[i] }
```

```go
data := []int{74, 59, 238, -784, 9845, 959, 905, 0, 0, 42, 7586, -5467984, 7586}
a := sort.IntSlice(data) //conversion to type IntSlice from package sort
sort.Sort(a)
```


```go
package main
import (
	"fmt"
	// "sort"      // this uses the Go sort package, then replace mysort. with sort. in the code below
	"./mysort" // this uses our own sort package (a subset of the Go sort package)
)

// sorting of slice of integers
func ints() {
	data := []int{74, 59, 238, -784, 9845, 959, 905, 0, 0, 42, 7586, -5467984, 7586}
	a := mysort.IntSlice(data) //conversion to type IntSlice
	mysort.Sort(a)
	if !mysort.IsSorted(a) {
		panic("fail")
	}
	fmt.Printf("The sorted array is: %v\n", a)
}

// sorting of slice of strings
func strings() {
	data := []string{"Monday", "Friday", "Tuesday", "Wednesday", "Sunday", "Thursday", "", "Saturday"}
	a := mysort.StringSlice(data)
	mysort.Sort(a)
	if !mysort.IsSorted(a) {
		panic("fail")
	}
	fmt.Printf("The sorted array is: %v\n", a)
}

// a type which describes a day of the week
type day struct {
	num       int
	shortName string
	longName  string
}

type dayArray struct {
	data []*day
}

func (p *dayArray) Len() int           { return len(p.data) }
func (p *dayArray) Less(i, j int) bool { return p.data[i].num < p.data[j].num }
func (p *dayArray) Swap(i, j int)      { p.data[i], p.data[j] = p.data[j], p.data[i] }

// sorting of custom type day
func days() {
	Sunday := day{0, "SUN", "Sunday"}
	Monday := day{1, "MON", "Monday"}
	Tuesday := day{2, "TUE", "Tuesday"}
	Wednesday := day{3, "WED", "Wednesday"}
	Thursday := day{4, "THU", "Thursday"}
	Friday := day{5, "FRI", "Friday"}
	Saturday := day{6, "SAT", "Saturday"}
	data := []*day{&Tuesday, &Thursday, &Wednesday, &Sunday, &Monday, &Friday, &Saturday}
	a := dayArray{data}
	mysort.Sort(&a)
	if !mysort.IsSorted(&a) {
		panic("fail")
	}
	for _, d := range data {
		fmt.Printf("%s ", d.longName)
	}
	fmt.Printf("\n")
}

func main() {
	ints()
	strings()
	days()
}

```

### Read & Writing using io Package
Read & Write interfaces

```go
type Reader interface {
  Read(p []byte) (n int, err error)
}

type Writer interface {
  Write(p []byte) (n int, err error)
}
```

The io package contains io.Read() & io.Write() interfaces.

### Empty Interface
``` type Any interface {}```
The empty interface has no methods. So doesn't make any demands at all.

It can be assigned any value or pointer
Example on how it can be used

```go
package main
import "fmt"

type specialString string

var whatIsThis specialString = "hello"

func TypeSwitch() {
	testFunc := func(any interface{}) {	// lambda function in combination with empty interface
		switch v := any.(type) {
		case bool: // if v is bool
			fmt.Printf("any %v is a bool type", v)
		case int: // if v is int
			fmt.Printf("any %v is an int type", v)
		case float32: // if v is float32
			fmt.Printf("any %v is a float32 type", v)
		case string: // if v is string
			fmt.Printf("any %v is a string type", v)
		case specialString: // if v is specialString
			fmt.Printf("any %v is a special String!", v)
		default: // none of types satisfied
			fmt.Println("unknown type!")
		}
	}
	testFunc(whatIsThis)
}

func main() {
	TypeSwitch()
}
```

### Constructing an array of general type of with different variables of different types
```go
type Element interface{}

type Vector struct {
    a []Element
}
```


### Copying data-slice in a slice of interface {}
```go
var dataSlice []myType = FuncReturnSlice()
var interfaceSlice []interface{} = dataSlice
```
 The above code will throw error : cannot use dataslice (type []myType) as type []interface{} in assignment.

 ```go
 var dataSlice []myType = FuncReturnSlice()
var interfaceSlice []interface{} = make([]interface{}, len(dataSlice))
for ix, d := range dataSlice {
  interfaceSlice[ix] = d
}
```

### Generic Node for different types
```go
type Node struct{
    le *Node
    data interface{}
    ri *Node
}

func NewNode(left, right *Node) *Node {
    return &Node(left, nil, right)
}

func (n *Node) SetData(data interface{})
{
    n.data = data
}
```

> an interface can be assigend to another interface as long as the underlying interface implements all the methods

### Type map[string] interface{}

The above can be used to simulate generic Hashtable/Dictionary with any type of value.
