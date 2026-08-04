---
tags: [programming/go, reference, brewing]
part-of: "[[Go MOC]]"
---

# Go — Reflection

> Part of **[[Go MOC]]**. [[Go - Interfaces|← Interfaces]]

## The reflect package
- Reflection in computing is the ability of a program to examine it's structure through the types. It's a form of meta-programming. 
- The reflect can be used to investiaget types & variables at runtime ex : their sizes & methods, it can also call these methods dynamically.
- It can also be useful to work with types from packages of which you do not have the source. It's a powerful tool that should be used with care.

Basic information of a variable is its type & its value : these are represented in the reflection package by the types *Type*, which represents a general go Type & value. 

```
var x float64 = 3.2
```

Then, `reflect.TypeOf(x)` and `reflect.ValueOf(x)` gives the type and value 
