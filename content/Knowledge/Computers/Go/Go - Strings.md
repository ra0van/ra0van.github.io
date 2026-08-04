---
tags: [programming/go, reference, brewed]
part-of: "[[Go MOC]]"
---

# Go — Strings

> Part of **[[Go MOC]]**. [[Go - Data Types and Constants|← Data Types & Constants]]  ·  [[Go - Pointers|Pointers →]]

## Strings
- Go string is a sequence of variable-width characters. Other languages are fixed width. Java always uses 2 bytes, a go string chars have 1-4 bytes.
- Since UTF-8 is the standard, Go doesn't need to enocde & decode strings like other languages
- Strings are value types & immutable
- Types of string literals
  - Interpreted strings "\n"
  - Raw strings '\n'
  In raw string \n is not interpreted as new line but taken literall.

  ```go
  len(str)
  ```
  returns length

  String concatenation can be done using + operator 
  ```go
  s := s1 + s2
  s+ = "test"
  ```


Prefixes & Suffixes
```
strings.HasPrefix(input, prefix) // returns bool
strings.HasSuffix(input, prefix) // returns bool
```


Substrings
```go
strings.Index(bigString, smallString) // returns int index

strings.LastIndex(bigString, smallString) // returns int index

strings.IndexRune(s_string, ch_int) // returns occurance of ch_int in s_string. This is used for non-ASCII characters
```

Replace a substring

```go
strings.Replace(str, old, new, n) // replace old with new in str n times. If n is -1, all occurences are replaced.
```

Count occurrences
```go
strings.Count(s, str) - returns int
```

Changing the case of a string

```go
strings.ToLower(s)

strings.ToUpper(s)
```

Trimming a string
```go
strings.TrimSpace(s)

strings.Trim(s, str) // this will remove all leading & trailing strs in s
```

Splitting a string
```go
strings.Fields(s) - returns [] string // this will split string on whitespace as delimeter
```

```go
strings.Split(s, delim) // same as Fields instead use `delim` for splitting 
```

Joining over a slice 
 - Gives a string constructed with sl, but joined by delimeter sep.
 - Inverse of Split
```go
strings.Join(sl []string, sep string) 
```

Reading from a string
- Read() to read a []byte
- ReadByte() to read the next byte from the string.
- ReadRune() to read the next rune from the string

Conversion to and from a string
- **`strconv.IntSize`** - Calculates & returns the size in bits of the int of the platform where code is running.
- **`strconv.Itoa(i) - string`**  - convert an int to string
- **`strconv.FormatFloat(f float64, fmt byte, prec int, bitSize int) string`** - Converts floating point number f to a string, with precision prec & bitsize being 32 or 64 for float32 and float 64
- **`strconv.Atoi(s string) (i int, err error)`** - Convert string to number
- **`strconv.ParseFloat(s string, bitSize int) (f float64, err error)`** - Convert float to string

### Time package
- The package `time` gives `Time` datatype.
- `time.Now()` gives current time
- t.Day(), t.Month(), t.Year() where t is of type Time. 
