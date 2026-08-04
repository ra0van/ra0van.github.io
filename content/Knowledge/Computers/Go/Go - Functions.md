---
tags: [programming/go, reference, brewed]
part-of: "[[Go MOC]]"
---

# Go — Functions

> Part of **[[Go MOC]]**. [[Go - Control Structures|← Control Structures]]  ·  [[Go - Closures and Factory Functions|Closures & Factory Functions →]]

## Functions

_Functions_ are the basic building blocks of the Go code. They are very versatile, so Go can be said to have a lot of characteristics of a _functional language_. Functions are a kind of data because they are themselves values and have types

- A function can have another function as it's argument `f1(f2(20,10))`
- Function overloading is not supported in go. Main reason is function overloading forces go to additional type matching which reduces performance. 
	- No Overloading means, only a simple function dispatch is needed.

Functions can also be used in the form of a declaration, as a function type like :
```go
type binOp func(int, int) int
```

In that case, the body **{ }** is also omitted. Functions are first-class values. They can be assigned to a variable, like in:
```go
add := binOp
```

The variable `add` gets a reference (points) to the function, and it knows the signature of the function it refers to.
It is not possible to assign a function to a variable with a different signature. Like variables, functions have a zero value, which is _nil_. Function values can be compared. They are equal if they refer to the same function or if both are nil. A function cannot be declared inside another function (no nesting), but this can be mimicked by using anonymous functions

 >A function with no parameters is called a **niladic function**, like `main.main()`

- Accepts call by value or call by reference
- Supports named return variables
```go
func getX2AndX3_2(input int)(x2 int, x3 int) {
	x2 = 2 * input
	x3 = 3 * input
	//return x2, x3
	return
}
```

The _blank identifier_ **_** can be used to _discard_ values, effectively assigning the right-hand-side value to nothing.
```go
i1, _, f1 = ThreeValues() // blank identifier
```

Variadic function - Passing a variable number of parameters
If the _last_ parameter of a function is followed by **…type**, this indicates that the function can deal with a variable number of parameters of that type, possibly also 0, a so-called **variadic function**:
```go
func myFunc(a, b, arg ...int) {}


func Greeting(prefix int, who ...string)
```

### Defer keyword
The defer keyword allows us to postpone the execution of a statement or a function until the end of enclosing function. 
The _defer_ resembles the _finally-block_ in OO-languages as Java and C#
This happens after every return, even when an error occurs in the midst of executing the function, not only a return at the end of the function, but before the **}**.

When many defer’s are issued in the code, they are executed at the end of the function in the inverse order (like a stack or LIFO), which means the last defer is first executed, and so on.

The `defer` allows us to guarantee that certain clean-up tasks are performed before we return from a function, for example:

-   Closing a file stream
-   Unlocking a locked resource (a mutex)
-   Printing a footer in a report
-   Closing a database connection

### Tracing with `defer`

A primitive but sometimes effective way of tracing the execution of a program is printing a message when entering and leaving certain functions.
```go
func trace(s string) {
	fmt.Println("entering:", s)
} // entering func.
func untrace(s string) {
	fmt.Println("leaving:", s)
} // leaving func.

func a() {
	trace("a")
	defer untrace("a") // untracing via defer
	fmt.Println("in a")
}

func b() {
	trace("b")
	defer untrace("b") // untracing via defer
	fmt.Println("in b")
	a()
}

func main() {
	b()
}

```

Another usage of defer for debugging
```go
package main
import (
	"log"
	"io"
)

func func1(s string)(n int, err error) {
	defer func() {
		log.Printf("func1(%q) = %d, %v", s, n, err)
	}()
	return 7, io.EOF
}

func main() {
	func1("Go")
}
```

### Built-in Functions

- `Close` - Used in Channel communication
- `len` and `cap` returns length of number types (strings, arrays, slices, maps, channels). Whereas cap is the capacity i.e, maximum storage (only applicable to slices and maps)
- `new` and `make` - used for allocation memory. New is used for value types & user-defined like structs. Whereas, make is used for built-in reference types (slices, maps & channels). They are used like functions with type as its argument
	- `new(type)`
	- `make(type)`
- new(T) allocates zeroed storage for a new item of type T and returns its address. It returns a pointer to type T and it can be used with primitive types as well. 
- make(T) returns an initialised variable of type T, so it does more than new()
- `copy` and `append` - used for copying and concatenating slices
- `panic` and `recover` used for handling errors
- `print` and `println` used for printing
- `complex`, `real` and `imag` are used for making & manipulating complex numbers

### Recursion
- Supported in go
- Stack overflow can happen when large number of recursive calls are needed, and the program runs out of allocated stack memory. 
	- This can be solved using a technique called lazy evaluation, implemented in Go with a channel, and a goroutine.
- Mutually recursive functions can be used in go. 

### Higher Order functions
- Functions can be used as values & can be assigned to variables & passed as arguments
```go
func incl(x int) int { return x+1 }

f1 := inc1

f1(10)
```

A good example of the use of a function as a parameter is the `strings.IndexFunc()` function. It has the signature:
```go
func IndexFunc(s string, f func(c int) bool) int
```
and returns the _index_ into `s` of the first Unicode character for which `f(c)` is _true_, or **-1** if none will do.
For example, `strings.IndexFunc(line, unicode.IsSpace)` will return the index of the 1st whitespace character in line.

Function used as a filter
```go
package main 
import "fmt" 

type flt func(int) bool 

// isOdd takes an int slice and returns a bool set to true if the 
// int parameter is odd, or false if not. 
// isOdd is of type func(int) bool which is what flt is declared to be. 
func isOdd(n int) bool { 
	if n % 2 == 0 { 
	return false 
	} 
	return true 
} 
// Same comment for isEven 
func isEven(n int) bool { 
	if n % 2 == 0 { 
	return true 
	} 
	return false 
} 
func filter(sl[] int, f flt)[] int { 
	var res[] int 
	for _, val := range sl { 
		if f(val) { 
			res = append(res, val) 
		} 
	} 
	return res 
} 

func main() { 
	slice := [] int {1, 2, 3, 4, 5, 7} 
	fmt.Println("slice = ", slice) 
	odd := filter(slice, isOdd) 
	fmt.Println("Odd elements of slice are: ", odd) 
	even := filter(slice, isEven) 
	fmt.Println("Even elements of slice are: ", even) 
}
```
