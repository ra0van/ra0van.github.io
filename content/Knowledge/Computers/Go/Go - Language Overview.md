---
tags: [programming/go, reference, brewed]
part-of: "[[Go MOC]]"
---

# Go — Language Overview

> Part of **[[Go MOC]]**. [[Go - Data Types and Constants|Data Types & Constants →]]

## Intro
- Origin at google in 2007
- Public launch in 2009.
- Heavily influenced by multiple languages. C syntax, Inheritance via interface like Java, Package definitions like C#, Java. Polymorphism independent of inheritance, Adoption of communication via Sequential process like Unix.

Why New language?
- Evolving landscape - c/c++ didn't evolve
- Need for faster development - Bloated apps. 
- Need for efficiency & ease of programming. - Before go, one had to choose b/w fast execution and slow & inefficient building (c/c++) or efficient compilation but not so fast execution (c#/java) or ease of programming but slower execution(Python/Ruby/JS). Go tries to combine them all.

Targets of Go
- Support network communication, concurrency & parallelisation.
- Support for excellent building speed
- Support for memory management.

Features of Go
- Go is imperative (Procedural & structural) language
- Not truly OOP, but has interfaces & polymorphism
- It is a hybrid language
- Some modern features of OOP were intentionally left out, because OO leads to cumbersome development which doesn't align with the speed goal of the language.

Following OOP features are missing : 
- To simplify design, no function or operator overloading is supported
- Implicit conversions were excluded to avoid many bugs and confusion arising from this in languages like c/c++
- No classes and typer inheritance
- No variant types
- Dynamic code loading & dynamic libraries are excluded
- Generics are not included (included in Go 2.0)
- Exceptions are not included (recover/panic goes in that direction)
- Assertions are not included
- Immutable (unable to change) variables are excluded.

Go is functional language (meaning functions are basic building blocks). Go is statically typed, making it a safe language that compiles to native code & has efficient execution. It is strongly typed, which means everything is explicit. It supports some dynamic typing using var keyword. Go supports cross-compilation across platforms. 

Go tries to reduce typing, clutter & complexity through minimal keywords(25). This enhances the compilation speed because the keywords can be parsed without symbol table as it's grammar is LALR

### FileName
- Source code in .go files. Consists of only lowercase-letters. Multipart files separated by _ . Cannot contain spaces or special chars. No limits on length.

### Blank Identifier
- The *```_```* itself is a special identifier, called the blank identifier. Like any-other identifier, *_* can be used in declarations or variable assignments, but it's value is discarded.

### Anonymous
It is possible to have functions without names. Such functions are called anonymous. 

Structure of Go program
Program consists of keywords, constants, variables, operators, types & functions. 
Delimiters in go - **Parentheses (), Braces{}, Brackets[ ]**
Punctuations in go 
- .
- ,
- ;
- :
- ...

Code doesn't need to end with ```;```. Go compiler automatically inserts ;. Multiple statements on same line needs to separated by ;.

Packages
- A library, module or namespace in other lang. are called packages in go. Often abbreviated as pkg.
- Every go file belongs to only one package, whereas one package can comprise many different go files. 
- A standalone executable belongs to main. Each Go app contains one main.

Package dependencies
- To build a program, the packages & files must be compiled in correct order. Package dependencies determine the order in which to build packages. 
- Package imported using "import" keyword.

Visibility
Packages expose their code objects to code outside of package according to rule enforced by compiler : When the identifier starts with an uppercase letter, then it is public. 

Go has a motto known as “No unnecessary code!”. So importing a package which is not used in the rest of the code is a build-error. 
```go
func func_Name(param1 type1, param2 type2, ...) (ret1 type1, ret2 type2, ...) {
...
}
```
Here ret1 is a variable of type1 to be returned. 
