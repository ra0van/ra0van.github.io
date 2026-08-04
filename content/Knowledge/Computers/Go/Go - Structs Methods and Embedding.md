---
tags: [programming/go, reference, brewed]
part-of: "[[Go MOC]]"
---

# Go — Structs, Methods & Embedding

> Part of **[[Go MOC]]**. [[Go - Locking and Sync|← Locking & Sync]]  ·  [[Go - Garbage Collector|Garbage Collector →]]

## Structs & Methods
- User-defined or custom types in form of alias types or structs is supported. 
- Structs are composite types.
- Structs are value types & constructed with *`new`* function. 
- Struct properties are called *`fields`*. A field has a type and a name. These names must be unique.
- The concept was called ADT (abstract data types) in older texts on software engg. 
- Fields can be any type, even structs themselves, functions or interfaces. 
- Fields of struct can be accessed using dot notation like in OOP. This is called selector. 

Struct Declaration  Can be done in the following ways : 
- Struct as value type
```go
var pers1 Person
pers1.firstName = "Rajasekhar"
DoSomething(&pers1)

pers2 := new(Person)
pers2.firstName = "Rajasekhar"

```

## Recursive Structs
Linked List
```go
type Node struct {
  data float64
  next *Node
}
```

Binary Tree
```go
type Node struct {
  left *Node
  data float64
  right *Node
  }
```

### Structs with Tags
- A field in struct can have tag optionally, apart from name & type.
- Tag is a raw string attached to the field.
- It could be documentation or some other important label. 
- Tag content cannot be accessed/used normally. Only the package *`reflect`* can access it. 
- This package can investigate types, their properties and methods in runtime. 

```go
package main 
import (
  "fmt",
  "reflect
)

type TagType struct {
  field1 bool "An bool type"
  field2 string "A string Type"
  field3 int "An int type"
  }

func main() {
  tt := TagType(true, "test tag string", 1)
  for i := 0; i<3;i++ {
    refTag(tt, i)
  }

func refTag(tt TagType, ix int) {
  ttType := reflect.TypeOf(tt)
  ixField := ttType.Field(ix)
  fmt.Prinft("%v\n", ixField.Tag)
  }
```

### Tags: Key "value" convention
Go allows the definition of multiple tags through the use of *`key: "value"`* format. 

```go
package main
import (
  "fmt",
  "reflect"
)

type Tag struct {
  a int "string tag"
  b int `key1:"value1" key2:"value2`
}

func main() {
  t := Tag{}
  fmt.Println(reflect.TypeOf(t).Field(0).Tag)

  if field,ok := reflect.TypeOf(t).FieldByName("a"); ok {
    fmt.Println(field.Tag)
  }

  if field,ok := reflect.TypeOf(t).Field("b"); ok {
    fmt.Println(field.Tag)
  }

  if field,ok := reflect.TypeOf(t).Field("b"); ok {
    fmt.Println(field.Tag)
  } else {
    fmt.Println("Field not found")
  }
}
```

### Anonymous Fields
Go supports anonymous fields in a struct. Means a field which has no name. Only type of such field is supported ex : Only one anon int, one anon float. 
```go
type anonStruct struct {
  a int
  b float32

  int // anonymous field
}

func main() {
  anon := new(anonStruct)
  anon.a = 10
  anon.b = 10.5
  anon.int = 20

}
```
Go also supports nested structs


## Go Methods
A Go **method** is a function that acts on a _variable of a certain type_, called the _receiver_. Therefore, a method is a special kind of function.
>  ***Note*** : A method acting on a variable in Go is similar to the object of a class calling its function in other OO languages, using a `.` selector, e.g., `object.function()`.

The receiver type can be (almost) _anything_, not only a struct type. Any type can have methods, even a function type or alias types for int, bool, string, or array. However, the receiver cannot be an interface type since an interface is an abstract definition and a method is the implementation.

Lastly, a method cannot be a pointer type, but it can be a pointer to any of the allowed types.
The combination of a (struct) type and its methods is the Go equivalent of a class in OO. One important difference is that the code for the type and the methods binding to it are not grouped together. They can exist in different source files; the only requirement is that they have to be in the same package.

The collection of all the methods on a given type `T` (or `*T`) is called the _method set_ of `T` (or `*T`).

Methods are functions, so again, there is no _method overloading_, which means for a given type, there is only one method with a given name. However, based on the receiver type, there is overloading. A method with the same name can exist on two or more different receiver types, e.g., this is allowed in the same package:
```go
func (a *denseMatrix) Add(b Matrix) Matrixfunc(a *sparseMatrix) Add(b Matrix) Matrix
```

For example, if you want to define the following method on `time.Time`:

```go
func (t time.Time) first3Chars() string {return time.LocalTime().String()[0:3]}
```

You get the same error for a type defined in another, thus also non-local package. However, there is a way around this: you can define an alias for that type (int, float, …), and then define a method for that alias. Or, embed the type as an unknown type in a new struct, like in the following example. Of course, this method is only valid for the alias type.

A function has the variable as a parameter:

```go
Function1(recv)
```

A method is called on the variable:

```go
recv.Method1()
```

A method can change the values (or the state) of the receiver variable provided this is a pointer, just as is the case with functions (a function can also change the state of its parameter when this is passed as a pointer: call by reference).

> **Note**: Don’t forget the ( ) after `Method1`, or you get the compiler error: `method recv.Method1 is not an expression, must be called`.

_Methods are not mixed with the data definition (the structs). They are orthogonal to types; representation (data) and behavior (methods) are independent_.

`func (t T) print(message string)`. The part `(t T)` means that this method can only be called by an object of type `T`. This method is printing `message` sent as a parameter, and the internal field `a` of `t`.

```go
package main
import "fmt"

type T struct {
	a int
}

func (t T) print(message string) {
	fmt.Println(message, t.a)
}

func (T) hello(message string) {
	fmt.Println("Hello!", message)
}

func callMethod(t T, method func(T, string)) {
	method(t, "A message")
}

func main() {
	t1 := T{10}
	t2 := T{20}
	var f func(T, string) = T.print
	callMethod(t1, f)
	callMethod(t2, f)
	callMethod(t1, T.hello)
}
```

### Embedded Types
When an anonymous type is embededd in a struct, the visible methods of that type are embedded as well. 

```go
type Engine interface {
    Start()
    Stop()
}

type Car struct {
    Engine // anonymous type which is nested in a struct
}
```

The above code can be accessed like this
```go
func (c *Car) GoToWork {
    c.Start();

    c.Stop();
}
```

### Multiple Inheritance
**Multiple Inheritance** is the ability for a type to obtain the behaviors of more than one partent class. 
In classical OO languages, it is usally not implemented, because in class based heirachies, it introduces additional complexities for the compiler.
But in Go, multiple inheritance can be implemented by embedding all the necessary 'parent' types in the typer under construction. 


In OO Languages, when a method is invoked on an ovject, the run time sees whether its class or if any of its superclasses have a definition for that method. 
In Go, such an inheritance heirarchy is not needed at all. If the method is defined for that type, it can be invoked, independent of whether or not the method exists for other types. 

Go doesn't require an explicit class definition. Instead class is defined by providing a set of methods that operate on a common type. This type may be a struct or any other user defined type

Code reuse in Go is achieved through composition and delegation, and polymorphism is achieved through use of interfaces.
Go implements something called component programming. 
