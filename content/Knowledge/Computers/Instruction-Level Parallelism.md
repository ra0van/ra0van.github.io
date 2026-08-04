#review #brewing #computer_science #parallel_computing #cs149 #cpu

# Instruction-Level Parallelism (ILP)

**ILP** is parallelism found *within a single instruction stream* — independent instructions that don't depend on each other's results and can therefore run at the same time, even though the program was written as one sequential list of steps.

## Why it exists
A single-instruction-stream program is just a list of instructions for a processor to execute. Some of those instructions are independent of each other (e.g. computing `x*x`, `y*y`, and `z*z` in `a = x*x + y*y + z*z` — none depends on another's result), while others form a dependency chain (the two `+` operations must happen in order, after their inputs are ready). The independent ones can run concurrently; the dependent ones can't.

## Superscalar execution
**Superscalar execution**: a processor automatically finds independent instructions in a sequence and executes them in parallel on multiple execution units — *or* the compiler finds the independent instructions at compile time and explicitly encodes the dependencies in the compiled binary, and the hardware executes accordingly.

A superscalar processor capable of issuing N instructions per clock has N parallel fetch/decode and execution ("Exec") units feeding a shared execution context (registers), plus out-of-order control logic that schedules instructions onto units while respecting dependencies.

## Diminishing returns
Real programs don't have unlimited independent instructions sitting around — most available ILP is exploited by a processor able to issue about **4** instructions per clock; building a processor that issues more (8, 16) yields little further speedup. This is one of two reasons single-core performance scaling slowed (see [[The Power Wall]] for the other, and for what architects did instead — see [[Multi-core and Specialized Processors]]).

## References
- Single-threaded CPU performance history chart (1985–2003, log-scale, showing ~18-month doubling): image credit Olukotun and Hammond, *ACM Queue*, 2005.
- Diminishing-returns-of-superscalar-execution chart (speedup vs. instruction issue width, plateauing around issue-width 4): source Culler & Singh, data from Johnson, 1991.
- Old Intel Pentium 4 CPU pipeline diagram (fetch/decode, reorder buffer, execution units): image credit http://ixbtlabs.com/articles/pentium4/index.html

---
From Stanford [[CS 149 - Parallel Computing|CS149]] (Fall 2025), Lecture 1 — "Why Parallelism? Why Efficiency?"
Related: [[Speedup and Parallel Efficiency]], [[The Power Wall]], [[CPU]], [[Instruction Cycle]]
