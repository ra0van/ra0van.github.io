#review #brewing #computer_science #parallel_computing #cs149 #cpu

# CPU Cache and Locality

Achieving efficient processing almost always comes down to accessing data efficiently. This note covers the *behavioral* side of caching — hits, misses, and why locality matters — as seen from the processor/programmer's perspective. For the *physical* SRAM/DRAM bit-cell technology underneath, see [[Memory]].

## Memory as an array
A computer's memory is organized as an array of bytes; each byte is identified by its address (its position in that array). A **load** instruction (e.g. `ld R0 ← mem[R2]`) reads a value from a memory address into a register; a **store** does the reverse.

## Latency and stalls
**Memory access latency** is the time it takes the memory system to return data to the processor — typically hundreds of clock cycles (e.g. ~100 cycles / ~100 nsec), vastly slower than the processor's own clock. A processor **stalls** — can't make progress — when it can't run the next instruction because it depends on a previous instruction (often a load) that hasn't completed. Because a dependent instruction can't execute until the memory access it needs finishes, accessing memory is a major source of stalls.

## What a cache is
A **cache** is a hardware implementation detail that does not change a program's output, only its performance. It's small, fast, on-chip storage holding a copy of a subset of the values in memory; if the address a processor needs is already in the cache, the load/store completes much faster than if it had to go all the way to DRAM.

Caches operate at the granularity of **cache lines** — a cache with N bytes of capacity is organized as some number of fixed-size lines (e.g. 4-byte lines), and loading any address within a line pulls the whole line into the cache at once.

## Deciding what to keep: replacement policy
A cache is much smaller than memory, so it must decide what to evict when it's full and new data needs to be loaded. A simple, common policy is **LRU (least recently used)**: to make room, throw out whichever cached line was accessed the longest time ago. (Real caches also have structural variants — direct-mapped, set-associative — worth knowing the names of but not detailed here.)

## Why caches work at all: locality
Working through cache hit/miss traces over a sequence of accesses reveals two patterns that make caching effective:
- **Spatial locality** — loading one address "preloads" the rest of its cache line, so subsequent accesses to *different but nearby* addresses become hits.
- **Temporal locality** — repeated accesses to the *same* address become hits after the first one loads it.

Real programs exhibit both kinds of locality far more than random access patterns would predict, which is why a cache much smaller than main memory can still absorb the large majority of memory accesses.

---
From Stanford [[CS 149 - Parallel Computing|CS149]] (Fall 2025), Lecture 1 — "Why Parallelism? Why Efficiency?"
Related: [[Memory]], [[Caching]], [[CacheAccessPatterns]], [[CPU]]
