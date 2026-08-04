#review #brewing #computer_science #parallel_computing #cs149 #ispc

# ISPC and the SPMD Programming Model

**ISPC** (Intel SPMD Program Compiler) is a concrete, worked example of the [[Abstraction vs. Implementation (Parallel Programming)|abstraction-vs-implementation]] split: a small, explicit programming model (SPMD) with simple semantics, whose implementation reveals real hardware mechanics (SIMD instructions) that the programmer still has to reason about.

## SPMD: the abstraction
**SPMD** = "single program, multiple data." Calling an ISPC function spawns a **gang** of concurrently-running **program instances**, each executing the same function body — typically on different data. The calling C/C++ code blocks until every instance in the gang has completed, then resumes as an ordinary single thread of control. Each instance holds its own private copy of local variables.

Two built-in values give each instance its identity within the gang:
- `programCount` — the number of instances in the gang (a `uniform` value: the same for every instance).
- `programIndex` — the calling instance's own index within the gang (a "varying" value: different per instance).

`uniform` is a type modifier meaning "every instance holds the same value for this variable." It is purely a performance hint/optimization for the compiler — never required for correctness.

## foreach: raising the level of abstraction
Rather than manually computing per-instance indices from `programIndex`/`programCount`, ISPC provides `foreach (i = 0 ... N)`: the programmer declares that the *entire gang* (not each instance individually) must collectively perform these N iterations, and leaves it to the ISPC implementation to decide which instance runs which iteration. This lets straightforward, per-element logic be written almost as if it were ordinary sequential code — "independently, for each element in the input array, do this."

## Implementation: SIMD, not real hardware threads
ISPC compiles a gang into a single hardware thread running on one CPU core, where the "parallel" program instances are realized as lanes of SIMD vector instructions (e.g. AVX2, ARM NEON) — the gang size is chosen to match the hardware's SIMD width (or a small multiple of it). The compiler is responsible for mapping conditional control flow (if/else) onto vector lanes via masking, and for choosing how loop iterations get distributed across instances:
- **Interleaved assignment** (consecutive iterations `i, i+1, i+2, ...` go to instances `0, 1, 2, ...` in round-robin blocks of `programCount`): consecutive instances then touch contiguous memory addresses, so a single packed vector load instruction can service the whole gang at once.
- **Blocked assignment** (each instance gets one contiguous chunk of `N/programCount` iterations): the same load now touches non-contiguous addresses across instances, requiring a slower gather instruction instead of a packed load.

Multi-core execution (spreading gangs across several cores) is a separate ISPC mechanism, "tasks," layered on top of this single-core gang/SIMD mechanism.

## Where the abstraction leaks: undefined behavior and cross-instance operations
Because instances genuinely run concurrently under the semantics, a `foreach` body in which different iterations write to the *same* memory location produces undefined output — which iteration's write wins depends on the (otherwise hidden) implementation. Likewise, a plain (non-`uniform`) local variable holds a *different* value per instance and can't simply be `return`ed to the calling scalar C/C++ code (compile-time type error), while a `uniform` variable holds one value shared by every instance, so having every instance separately write to it is also rejected at compile time.

To deliberately communicate across instances within a gang, ISPC's standard library exposes explicit cross-instance operations, e.g.:
- `reduce_add(x)` / `reduce_min(x)` — combine a per-instance value across the whole gang into one `uniform` result. (Correctly summing an array: each instance accumulates a private partial sum with no communication, then a single `reduce_add` combines the partial sums into the final total.)
- `broadcast(value, index)` — send one instance's value to every instance in the gang.
- `shift(value, offset)` / `rotate(value, offset)` — pass each instance's value to the instance `offset` lanes away, enabling tricks like computing the product of all 8 elements of a gang-sized array in only log₂(8) = 3 steps via repeated shift-and-multiply.

## An alternative design point
ISPC deliberately exposes `programIndex`/`programCount` as a low-level capability, which permits both undefined-behavior bugs and advanced fine-grained cross-instance cooperation. A language could instead hide program instances entirely and only allow `foreach`-style anonymous per-element work — or go further and drop indexing altogether, invoking a per-element function via a `map()`-style primitive over a whole collection, a design point close to how vectorized array operations already work in NumPy/PyTorch.

---
From Stanford [[CS 149 - Parallel Computing|CS149]] (Fall 2025), Lecture 3 — "Modern Multi-Core Architecture (Part II) + ISPC Programming Abstractions"
Related: [[Abstraction vs. Implementation (Parallel Programming)]], [[Instruction-Level Parallelism]], [[Multi-core and Specialized Processors]]
