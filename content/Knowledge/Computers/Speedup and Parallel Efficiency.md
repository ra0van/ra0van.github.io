#review #brewing #computer_science #parallel_computing #cs149

# Speedup and Parallel Efficiency

**Speedup** is the basic yardstick for whether parallelizing a program was worth it:

```
speedup(using P processors) = execution time (1 processor) / execution time (P processors)
```

## Why speedup alone can be misleading
Getting a 2x speedup sounds great — until you learn it came from 10 processors. **Fast ≠ efficient.** Speedup only tells you the program got faster; it says nothing about how well it used the hardware it was given. Two programmer/hardware-designer perspectives on efficiency:
- **Programmer's perspective** — make full use of the machine capabilities provided.
- **Hardware designer's perspective** — choose the right capabilities to put in a system (performance vs. cost, where cost = silicon area, power, etc.).

## What actually limits speedup
Adding processors doesn't guarantee proportional speedup. Two independent failure modes cap it, and they compound:
- **Communication cost.** Processors must exchange partial results to combine into a final answer. If a problem has a lot of communication relative to the amount of computation it does, that communication cost can come to **dominate** the parallel computation — severely limiting speedup no matter how many processors are thrown at it. Reducing the cost of communication (locality, fewer/cheaper synchronization points) directly improves realized speedup.
- **Load imbalance.** If work is split unevenly, some processors finish and sit idle while others are still working — total time is set by the *slowest* processor, not the average. Improving how work is distributed improves speedup even with zero change to communication cost.

## The three jobs of "parallel thinking"
1. **Decomposing** work into pieces that can safely run in parallel.
2. **Assigning** work to processors — i.e., load balance.
3. **Managing communication/synchronization** so it doesn't limit speedup.

Plus: abstractions/mechanisms for doing the above — i.e., writing code in popular parallel programming languages.

---
From Stanford [[CS 149 - Parallel Computing|CS149]] (Fall 2025), Lecture 1 — "Why Parallelism? Why Efficiency?"
Related: [[Instruction-Level Parallelism]], [[The Power Wall]], [[Multi-core and Specialized Processors]]
