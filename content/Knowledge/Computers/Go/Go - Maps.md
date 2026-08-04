---
tags: [programming/go, reference, brewed]
part-of: "[[Go MOC]]"
---

# Go — Maps

> Part of **[[Go MOC]]**. [[Go - Arrays and Slices|← Arrays & Slices]]  ·  [[Go - Standard Library and Tooling|Standard Library & Tooling →]]

## Maps
Maps are an unordered collection of pairs of items, where one element of the pair is the key, and the other element is the value. Hence they are also called associative arrayrs or dictionaries. 
Declaration - `var map1 map[string]int`
- Length of map doesn't have to be know at declaration. They can be dynamic.
- Value of uninitialized map is nil. 
- Maps are cheap to pass to a functin becuase only a reference is passed. (so 4 bytes on 32 bit machine and 8 bytes on 64bit machine.).

Initialization - `map1 := make(map[string]int)`

> Do not use `new` with map, Always use `make`
```go
mapCreated := new(map[string]int)

mapCreated["4.5"] = 5.4
```
The above line assigning key<>value to map throws compiler error : *`invalid operation: mapCreated["key1"] (index of type *map[string] float).`*

- Maps accept optional capacity parameter during initialization
- `delete(mapName, Key)`
- When key doesn't exist, map doesn't produce an error. 
- `value, isPresent` = map1["Key"]
- By default maps do not support sorting. To sort a map, we have to copy all keys to array/slice and sort the keys & fetch values as per this order. 
