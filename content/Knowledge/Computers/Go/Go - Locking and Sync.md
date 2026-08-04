---
tags: [programming/go, reference, brewed]
part-of: "[[Go MOC]]"
---

# Go — Locking & Sync

> Part of **[[Go MOC]]**. [[Go - Standard Library and Tooling|← Standard Library & Tooling]]  ·  [[Go - Structs Methods and Embedding|Structs, Methods & Embedding →]]

## Locking & Sync Package
- Map type is not thread safe. So concurrent access to shared map type can lead to issues. 
- In go, this kind of locking is realized with Mutex Variable of the sync package. 
- A sync.Mutex is a mutual exclusion lock. 
```go
import "sync
type Info sync {
  mu sync.Mutex
  Str string
}

func Update(info *Info) {
  info.mu.Lock()
  info.Str = "askdasld"
  info.mu.Unlock()
}
```
