---
tags: [programming/go, reference, brewed]
part-of: "[[Go MOC]]"
---

# Go — Data Types & Constants

> Part of **[[Go MOC]]**. [[Go - Language Overview|← Language Overview]]  ·  [[Go - Strings|Strings →]]

## Data Types
Naming things in Go : 
- Short, Concise, evocative. 
- Long names with mixed caps & underscores hinder readability. 
- Names should not contain any indication of the package. 
- A method or function which returns an object is named as noun, no GetXYZ is needed.
- To change an object use SetName. Go uses MixedCaps or mixedCaps rather than underscores to write multiword names. 

| Types                   | Examples                              |
| ----------------------- | ------------------------------------- |
| elementary(primitive)   | *int, float, bool, string*              |
| structured or composite | *struct, array, slice, map, channel*    |
| interfaces              | They describe the behaviour of a type |

- Structured types default value is *nil*, They are declared using var keyword
- Type of the function is the variable type returned by it.
- Function can have more than one return type. Separated by commas ex : return var1, var2
- Type casting is supported. It doesn't allow implicit conversion. ex : valueOfTypeB = typeB(valueOfTypeA)

Constants
- Const keyword is used to define constants. Ex : Const PI = 3.1419; Const B string = "hello"
- Constants are defined with uppercases. This improves readability.
- Constants must be evaluated at compile-time. Can be defined as a calculation, given the values are available at compile time. 
- Numeric constants have no size or sign. They can be of arbitrarily high precision. They do not overflow. 
 ```go
const Ln2= 0.693147180559945309417232121458\176568075500134360255254120680009const Log2E= 1/Ln2 // this is a precise reciprocal
const BILLION = 1e9 // float constant
const HARD_EIGHT = (1 << 100) >> 97
```

Multiple Assignments 
```go
const BEEF, TWO, C = "meat", 2, "veg"
```

```go
const MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY int= 1, 2, 3, 4, 5, 6
```

### Enumerations 
- Listing of all elements of a set is called enumeration. Constants can be used for enums.
```go
const (
	UNKNOWN = 0
	FEMALE = 1
	MALE = 2
)
```

```go
type Gender int
const (  UNKNOWN = iota  FEMALE  MALE)
```

First use of iota gives 0 & increments subsequently

### Variables
- Value that can be changed by a program during execution is called *variable*. 
- ``` var identifier type ```
- *Identifier* is name of the variable, *type* is type of variable. 
- When a variable is declared, memory in Go is initialised, which means it contains the *default zero or null or empty string or nil for pointer, zero-ed struct,* etc.

- Value is assigned with = 
```go
var identifier type = value
```

- Go compiler can derive the type dynamically, also called as automatic typer inference at runtime.
```go
var number = 5
```

- var keyword can be omitted by using := operator.  This can be used for only new variables
```go
number:= 20
```

### Scope of variables
- Global Scope - at package level
- Local scope - at function level

### Value types 
- All primitive types are value types - which means they point directly to their value in memory
- When i = j is done, the value of j is copied to i
- All value types are stored in stack memory

### Reference types 
- Complex DS are treated as reference types
- Reference type variable contains address of the memory location where the value of the variable is stored at. 
- The address is called a pointer which is contained in a *word*
- The different words of a reference type can be contiguous or spread across
- To assign a ref type, only address is coped
- when r1=r2 is done, both point to same variable. Only address is copied. 
- Ref types are stored in heap which is garbage collected. 
- Larger in space than stack.

### Elementary Types
- Bool, Numeric, char
- Numerical type - Integers & floating point numbers 
	- has int, uint, uintptr.
	- int is a default signed type - 32 bit/64 bit based on machine. uint is unsigned
	- uintptr is an unsigned integer large enough to store a bit pattern of any pointer
	- float type doesn't exist. You have to specify float32 or float64

### Format Speicifiers
- In format strings, 
	- %d - int
	- %x or %X - hexadecimal
	- %g float (**%f** gives a floating-point, and **%e** gives a scientific notation).
	- %0nd shows an integer with n digits
	- %n.mg represents the number with a precision of m digits & width of n digits.
	- %v for complex numbers

### Complex Numbers
- Written in form of a + bi
- Has complex64 & complex128 data types
```
var c1 complex64 = 5 + 10i
```
- Complex can be created using
```
var c1 complex64 = complex(5,10)
```

### Random Numbers
- Available via math/rand package
- rand.Int() generates a random integer
- rand.IntN(k) generates a random integer from 0 to k-1

### Character type
- Strictly speaking this is not a type in Go. The characters are a special case of integers. The byte type is an alias for uint8, and this is okay for the traditional ASCII encoding for chars(1 byte). 
```go
var ch byte = 'A'
```
or 
```go
var ch byte = '\x41'
```
\x is always followed by exactly two hexadecimal digits. 
But there is also support for Unicode(utf-8). Characters are also called unicode points, and a unicode character is represented by an int in memory. 


### Operators
- Arithmetic operators +,-,*,/,%
  - Division by 0.0 gives infinite result - *+Inf*
  - --,++ are supported
  - -=,*=,/=,%=
- Logical operators
  - ==,!+, <,>,<=,>=
  - &&, ||, !
- Bitwise operators
  - &, |, ^
  - &^ is the BIT clear operator
  - ^ Complement operator
  - <<,>> are left shift operator & right shift operator

Operator Precendence - ||, &&, <-, (==,!=,<,<=,>=,>), (*,/,%,<<,>>,&,&^), ^!
