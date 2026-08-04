#review #brewing #computer_science #parallel_computing #cs149 #cpu

# Hardware Multi-Threading (Latency Hiding)

How a processor core keeps its execution units busy despite slow memory: by giving itself more independent work to switch to during a stall, rather than trying to make any single memory access faster.

## The problem: dependent instruction chains stall on memory
Consider a thread that repeats a dependent sequence: load 64 bytes, then `y = x + x`, then `z = x + y`. Even on a core that can issue one math instruction per clock, can co-issue load instructions alongside math, and allows several loads to be outstanding at once (e.g. up to 3 in flight), a single thread following this pattern still spends much of its time unable to proceed — every `add` depends on a `load` that hasn't finished, and the core has nothing else to do while it waits. This is [[Latency vs. Bandwidth|memory latency]] showing up as a stall, not a throughput limit.

## The mechanism: multiple hardware execution contexts
A multi-threaded core keeps several **execution contexts** ("hardware threads") resident at once, each with its own registers/program counter, all sharing one set of fetch/decode and execution units (ALU, load/store). When the instruction stream belonging to one hardware thread stalls on a memory access, the core switches to ready instructions from a *different* resident thread instead of sitting idle — hiding the stall behind other useful work. Enough resident threads means there is always some thread ready to execute while others wait on memory.

## The consequence: bandwidth becomes the limit, not latency
Once there are enough resident threads to keep the memory system continuously fed with requests, the rate at which the core completes math instructions stops depending on memory *latency* or on how many requests happen to be outstanding — the memory system ends up transferring data essentially 100% of the time, and it simply cannot go faster than its rated bandwidth. At that point the core is **memory bandwidth-bound**: any remaining core underutilization is a function purely of instruction throughput vs. memory throughput, not of how long any individual request takes.

This is the general design goal of hardware multi-threading in throughput-oriented cores (e.g. GPU SMs): supply a core with enough independent, ready-to-run instruction streams that some are always available whenever others are stalled on memory. See [[Memory Bandwidth as the Critical Resource]] for what this shift in the bottleneck means for how software should be written.

## Interleaved vs. simultaneous multi-threading
Two distinct hardware mechanisms both fall under "hardware multi-threading":
- **Interleaved (temporal) multi-threading**: each clock, the core picks one resident thread and runs one instruction from it — different clocks may run different threads, but only one thread's instruction issues per clock.
- **Simultaneous multi-threading (SMT)**: each clock, the core can choose instructions from *multiple* resident threads at once and run them together on its ALUs. Intel Hyper-Threading (2 threads per core) is a well-known example.

Either way, the core still has the same fixed number of ALU resources — multi-threading doesn't add execution units, it only improves how efficiently the existing ones are kept busy in the face of high-latency operations like memory access.

## How many threads are needed to fully hide a stall?
Worked example: a thread repeatedly performs some number of arithmetic instructions, then one memory load with 12-cycle latency.
- With only 1 resident thread, core utilization is just (arithmetic instructions) / (arithmetic instructions + stall cycles) — e.g. 3 arithmetic instructions per load leaves the core only ~20% utilized (busy 3 of every 15 cycles).
- A 2nd resident thread interleaves its independent stream into the otherwise-idle cycles, raising utilization to ~40%; in this example, 5 resident threads are enough to drive utilization to 100% — beyond that, additional threads yield no further benefit, since the core is already fully occupied.
- Raising the ratio of arithmetic to memory accesses (arithmetic intensity) shrinks the thread count needed for full utilization: the same core that needed 5 threads at 3 arithmetic instructions per load needs only 3 threads once each thread does 6 arithmetic instructions per load.

Two takeaways follow: (1) a multi-threaded processor avoids stalls by running instructions from other threads while one thread waits on a long-latency operation — the latency of that operation is unchanged, it simply no longer reduces utilization; (2) programs with more arithmetic per memory access need fewer resident threads to fully hide memory stalls.

## Execution contexts are a finite resource
On-chip storage for resident execution contexts (registers, program counter, etc. per hardware thread) competes for the same die area as data cache — there is no free lunch. A core can be built with:
- **Many small contexts** (e.g. 16 hardware threads, small working set per thread) — high latency-hiding ability, but little register/cache space per thread.
- **Few large contexts** (e.g. 4 hardware threads, large working set per thread) — low latency-hiding ability, but each thread gets a large working set.

This is a genuine design trade-off chip architects must make, not a free improvement.

---
From Stanford [[CS 149 - Parallel Computing|CS149]] (Fall 2025), Lecture 2 — "A Modern Multi-Core Processor (Part I)" and Lecture 3 — "Modern Multi-Core Architecture (Part II) + ISPC Programming Abstractions"
Related: [[Latency vs. Bandwidth]], [[Memory Bandwidth as the Critical Resource]], [[SIMD (Single Instruction, Multiple Data)]], [[GPU SIMT (Single Instruction, Multiple Threads)]], [[CPU Cache and Locality]], [[Multi-core and Specialized Processors]], [[CPU]]
