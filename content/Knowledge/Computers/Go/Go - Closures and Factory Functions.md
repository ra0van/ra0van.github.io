---
tags: [programming/go, reference, brewed]
part-of: "[[Go MOC]]"
---

# Go — Closures & Factory Functions

> Part of **[[Go MOC]]**. [[Go - Functions|← Functions]]  ·  [[Go - Arrays and Slices|Arrays & Slices →]]

## Closures

Sometimes, we do not want to give a function name. Instead we can make an anonymous function known as lambda function

```go
func(x, y int) int { return x+y }
```

Such function can stand on it's own. But it can be assigned to a variable which is a reference to that function:
```go
fplus := func(x,y int) int { return x+y }

// can be invoked directly like this
func(x, y int) int { return x + y } (3, 4)
```

## Factory Functions

Functions that return other functions can be used as a factory function. This can be useful when you have to create a number of similar functions : Write 1 factory function instead of writing them all individually. 

```go
func MakeAddSuffix(suffix string) func(string) string {
  return func(name string) string {
    if !strings.HasSuffix(name, suffix) {
      return name + suffix 
      }
  }
}
```

`MakeAddSuffix` is returning functions that add suffix to the filename when this is not yet present. Now we can make functions like : 

```go
addBmp := MakeAddSuffix(".bmp")
addJpeg := MakeAddSuffix(".jpeg")
```

Another example of factory function that takes a function and create another one of a completely different type

```go
package main
import "fmt"

type flt func(int) bool
type slice_split func([] int)([] int, [] int)

func isOdd(interger int) bool {
  if integer % 2 ==0 {
    return false
  }
}

func isBiggerThan4(integer int) bool {
  if integer > 4 {
    return true
  }
} 

func filter_factory(f flt) slice_split {
  return func(s[] int) (yes, no[] int) {
    for _,val := range s {
      if f(val) {
        yes = append(yes,val)
      } else {
        no = append(no,val)
      }

      return
    }
}

func main() {
  s := [] int {1,2,3,4,5,6,7,8}
  
  odd_even_func := filter_factory(isOdd)
  odd,even := odd_even_func(s)

  bigger,smaller := filter_factory(isBiggerThan4)(s)
}

```

### Debugging using *runtime*

It is often useful to know which file is executing at certain points in the program and line number of it. This can be done by using special functions from the *`runtime`* or *`log`* packages.

```go
package main
import ( 
  "fmt"
  "runtime"
  "log" )

func main() {
  where := func() {
    _, file, line, _ := runtime.Caller(1)
    log.Printf("%s:%d", file, line)
  }

  where()

  `a := 2*5`
  where()
}
```

### Debugging using *log*

```go
package main
import ( 
  "fmt"
  "log" )

func main() {
  log.SetFlags(log.Llongfile)
  var where = log.Print

  where()

  `a := 2*5`
  where()
}
