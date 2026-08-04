#review #brewing #computer_science #parallel_computing #cs149 #software

# Abstraction vs. Implementation (Parallel Programming)

A recurring source of confusion in parallel programming: conflating what a programming model's operations *mean* with the details of *how* they get carried out on real hardware. Keeping the two questions separate is a general habit worth applying to every parallel programming model encountered afterward.

## The two questions
- **Semantics (the abstraction)**: what do the operations provided by a programming model mean? Given a program and the meaning of its operations, what answer will it compute? This question has exactly one correct answer, regardless of the hardware running it.
- **Implementation (aka scheduling)**: how will that answer actually be computed on a parallel machine? In what (potentially parallel) order are a program's operations executed? Which operations run on which thread, which execution unit, or which lane of a vector instruction? Many different valid implementations can realize the very same semantics.

## The skill being tested
Given a program and knowledge of how a parallel programming model is implemented, can you "trace" through what each part of the parallel computer is doing at each step of the program, in your head? That ability — not just trusting the abstraction's promised behavior, but understanding the concrete mechanism underneath it — is the goal. [[ISPC and the SPMD Programming Model]] is a worked example of exercising exactly this skill.

## Why the distinction matters
A single programming model can permit *multiple valid implementations* of its abstraction, each with different performance characteristics but identical guaranteed output (see e.g. the interleaved-vs-blocked scheduling choices described in [[ISPC and the SPMD Programming Model]]). The abstraction guarantees the same answer either way; only understanding the implementation lets you predict, explain, or improve performance.

---
From Stanford [[CS 149 - Parallel Computing|CS149]] (Fall 2025), Lecture 3 — "Modern Multi-Core Architecture (Part II) + ISPC Programming Abstractions"
Related: [[ISPC and the SPMD Programming Model]], [[Instruction-Level Parallelism]], [[Speedup and Parallel Efficiency]]
