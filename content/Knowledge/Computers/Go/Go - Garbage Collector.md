---
tags: [programming/go, reference, brewed]
part-of: "[[Go MOC]]"
---

# Go — Garbage Collector

> Part of **[[Go MOC]]**. [[Go - Structs Methods and Embedding|← Structs, Methods & Embedding]]  ·  [[Go - Interfaces|Interfaces →]]

## Garbage Collector
We don't have to explicitly releases memory for variables & strcutures which are not used anymore. 
A separate go process in the Go runtime, the Grabage collector takes care of that. 

GC functionality can be accessed via `runtime.GC()` function. This frees memory immediately at the point of execution. 

```go
package main
import (
  "runtime"
  "time"
)

func main() {
  ms := runtime.MemStats{}
  runtime.ReadMemStats(&ms)
    
  println("Heap after GC. Used:", ms.HeapInuse, " Free:", ms.HeapIdle, " Meta:", ms.GCSys)

  time.Sleep(5 * time.Second)
}
```

If a special action needs to be taken before an object obj is removed from memory like writing to a log-file, this can be achieved by calling
```go
runtime.SetFinalizer(obj, func(obj *typeObj))
```
This can be used when an obj has to be written to memory file before removed from memory

This function runs when the obj is removed by GC, not when the program exits
