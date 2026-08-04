#review #brewing #computer_science #parallel_computing #cs149 #simd #cpu

# SIMD (Single Instruction, Multiple Data)

**SIMD** is a form of parallelism where many ALUs execute the *same* instruction on *different* data at the same time, amortizing the cost of managing one instruction stream (fetch/decode) across many execution units.

## Why it exists
Fetch/decode logic is complex and expensive relative to an ALU. Rather than giving every ALU its own fetch/decode unit, a SIMD design has one fetch/decode unit driving many ALUs (e.g. 8): each clock, the same instruction is broadcast to all of them, and that one operation executes in parallel across all the ALUs on different data elements held in a wide execution context (a vector register). This is a different axis of parallelism from [[Instruction-Level Parallelism|superscalar execution]], which finds *different* independent instructions from the *same* instruction stream to run in parallel — SIMD instead runs *one* instruction across many ALUs.

## Explicit vs. implicit SIMD
- **Explicit SIMD**: the compiler generates actual vector instructions at compile time (e.g. Intel AVX intrinsics like `_mm256_mul_ps`, compiling down to `vmulps`/`vloadps` operating on 256-bit registers holding 8 packed 32-bit floats). Parallelism can be requested explicitly via intrinsics, conveyed through parallel language semantics (e.g. a `forall` construct that declares loop iterations independent), or inferred by an auto-vectorizing compiler analyzing loop dependencies. Because the vectorization happened at compile time, the vector instructions are visible by inspecting the compiled binary.
- **Implicit SIMD** (used by many GPUs): the compiler generates an ordinary scalar binary, but N instances of that program are always run together on the processor. The *hardware*, not the compiler, is responsible for detecting that multiple program instances are executing the same instruction and simultaneously running them together on SIMD ALUs.
- Typical vector widths: Intel AVX2 = 256 bits (8×32-bit or 4×64-bit), Intel AVX-512 = 512 bits (16×32-bit), ARM NEON = 128 bits (4×32-bit); SIMD width on most modern GPUs ranges from 8 to 32.

## Coherent execution is what SIMD needs
**Instruction stream coherence** ("coherent execution") is the property that the same instruction sequence applies across many data elements. Coherent execution IS necessary for SIMD processing resources to be used efficiently — but it is NOT necessary for efficient parallelization across separate cores, since each core has its own fetch/decode and can run a completely different instruction stream for its thread. A lack of instruction stream coherence in a program is called **divergent execution**.

## Divergent execution: masking conditional code
When a data-parallel program hits an `if/else` and different data elements packed into the same SIMD instruction disagree on which branch to take, the hardware can't skip work per-element — instead it runs *both* branches on all ALUs and **masks (discards) the output** of whichever ALUs didn't take the branch currently executing, so those ALUs do no useful work for that branch. In the worst case (every element wants a different path), an 8-wide SIMD unit drops to as little as 1/8 of peak throughput; on a GPU with 32-wide SIMD, badly divergent code can fall to 1/32 of peak capability.

## Compounding with other forms of parallelism
Real chips stack SIMD width, multiple ALUs per core, and multiple cores together. Example: an Intel Core i7-7700K ("Kaby Lake"): 4 cores, each with three 8-wide AVX2 SIMD ALUs, at 4.2 GHz ⇒ 4 cores × 8-wide × 3 × 4.2 GHz ≈ 400 GFLOPs of peak throughput — multi-core and SIMD width both multiply the same clock rate into much larger aggregate compute capability.

---
From Stanford [[CS 149 - Parallel Computing|CS149]] (Fall 2025), Lecture 2 — "A Modern Multi-Core Processor (Part I)"
Related: [[Instruction-Level Parallelism]], [[Hardware Multi-Threading (Latency Hiding)]], [[GPU SIMT (Single Instruction, Multiple Threads)]], [[Multi-core and Specialized Processors]], [[ALU]], [[CPU]]
