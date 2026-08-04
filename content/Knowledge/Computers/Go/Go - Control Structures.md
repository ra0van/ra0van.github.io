---
tags: [programming/go, reference, brewed]
part-of: "[[Go MOC]]"
---

# Go — Control Structures

> Part of **[[Go MOC]]**. [[Go - Pointers|← Pointers]]  ·  [[Go - Functions|Functions →]]

## Control Structures 
- if can start with initialisation statement as well
```go
val := 10
if val > max {    // do something}
```

you can write:

```go
if val := 10; val > max {// do something // scope of val is only limited to if condition here
}

if val := process(data); val > max {

}
```


Testing for errors on function
go functions can return two results. One is value, other is status of execution. 
```go
v, ok = sample_function(parameter)
```

v contains result, ok contains error. 

```go
 anInt, err = strconv.Atoi(origStr)
```

### Switch Case
- Has switch & case blocks
- case variables needs to be of same type or expression evaluating to that type. 
- case can use ellipses without braces { }, switch needs to have {}
- multiple values can be passed to case statement.
- Each case-branch is exclusive. They are tried first to last. We should place the most probax3ble values first to save time of computation. 
- when case block is empty & condition is met, the case is exited & doesn't execute further.
	- If we want case block to go further, then `fallthrough` should be used

```go
var num1 int = 0

// Adding switch on num1
switch num1 {

	case 0: fallthrough
	case 98, 99: // first case: num1 = 98 or 99
		fmt.Println("It's equal to 98")
	case 100: // second case: num1 = 100
		fmt.Println("It's equal to 100")
	default: // optional/ default case
		fmt.Println("It's not equal to 98 or 100")

}
```

>Output
>1.42s
>It's equal to 98

Without `fallthrough` above code will print nothing.

Initialisation with switch statement
```go
switch a, b := x[i], y[j]; {
case a < b: t = -1
case a == b: t = 0
case a > b: t = 1
}
```

For loop is of two types
```go
for initialization; condition; modification { }
```

```go
for condition { }
```

`for range` is the iterator in go. 
It will return index & value of iterator
```go
// for range
for pos, char := range str {
	fmt.Printf("Character on position %d is: %c \n", pos, char)
}
```

`break` and `continue` are supported

Labels & Goto
- Go supports labels in for, switch or select statements
- goto has to be followed by a label name
