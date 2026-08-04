#review #brewing #computer_science #parallel_computing #cs149 #cpu

# Memory Bandwidth as the Critical Resource

Once a processor has enough parallelism to fully hide memory latency (see [[Hardware Multi-Threading (Latency Hiding)]]), the thing that actually limits performance on modern throughput-oriented hardware is *memory bandwidth*, not arithmetic — and that reshapes what "writing efficient parallel code" means.

## Worked example: element-wise vector multiply
Computing `C[i] = A[i] * B[i]` over huge vectors requires 3 memory operations (load `A[i]`, load `B[i]`, store `C[i]` — 12 bytes) for every 1 multiply.

- An NVIDIA V100 GPU can perform 5,120 fp32 multiplies per clock (at 1.6 GHz) — keeping all of its arithmetic units continuously fed on this computation would require roughly **98 TB/sec** of memory bandwidth.
- V100's actual memory system (HBM2, rated at 900 GB/sec) delivers far less than that, so this computation runs at **under 1% of the GPU's peak arithmetic efficiency** — yet it still outruns an eight-core CPU on the same task (a 3.2 GHz Xeon E5v4 with a 76 GB/sec memory bus reaches only ~3% efficiency here, despite having far less peak arithmetic throughput to waste in the first place).

## The takeaway
This computation is **bandwidth-limited**: if a processor requests data faster than the memory system's rated bandwidth, the memory system cannot keep up — no matter how many outstanding requests exist or how much latency-hiding parallelism the processor has. Overcoming bandwidth limits is often the single most important challenge facing software developers targeting modern throughput-optimized systems.

## What this means for how you write code
Performant parallel programs must reduce how *often* they touch memory, not just how much math they do per touch:
- **Reuse data already loaded by the same thread** (temporal locality) instead of reloading it from memory.
- **Share data loaded by one thread across other threads** that need the same values (inter-thread cooperation), instead of every thread separately loading its own copy.
- **Favor doing extra arithmetic over storing/reloading intermediate values** — on a bandwidth-bound system, recomputing something can be cheaper than saving and reloading its result, because the math itself is effectively "free" relative to memory traffic.

The central principle: on modern hardware, a program must access memory *infrequently* to actually utilize the processor's arithmetic throughput.

---
From Stanford [[CS 149 - Parallel Computing|CS149]] (Fall 2025), Lecture 3 — "Modern Multi-Core Architecture (Part II) + ISPC Programming Abstractions"
Related: [[Hardware Multi-Threading (Latency Hiding)]], [[Latency vs. Bandwidth]], [[CPU Cache and Locality]], [[Memory]], [[Multi-core and Specialized Processors]]
