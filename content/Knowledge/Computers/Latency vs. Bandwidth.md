#review #brewing #computer_science #parallel_computing #cs149 #cpu

# Latency vs. Bandwidth

Two distinct performance measures for any system that produces a stream of results — and they don't have to move together. You can raise one without touching the other, and confusing them is a common source of bad intuition about performance.

## Definitions
- **Latency**: the time for one unit of work to go from start to finish (a single request, instruction, or item).
- **Bandwidth (throughput)**: the *rate* at which the system completes units of work over time (e.g. items/sec, GB/sec, instructions/clock) — how many units finish per unit time, once things are flowing.

## Two ways to raise throughput without necessarily improving latency
Take a highway between two cities, 50 km apart, with one car traveling at 100 km/h: latency to cross is 0.5 hours, throughput is 2 cars/hour (a new car can only enter once the previous one arrives).
- **Drive faster** (200 km/h): halves latency *and* doubles throughput together.
- **Add more lanes** (4 lanes, same 100 km/h): throughput scales to 8 cars/hour while each car's own latency is unchanged.
- **Pack cars more densely** (cars spaced 1 km apart instead of one at a time, same speed): throughput jumps to 100 cars/hour on one lane (400 cars/hour on four lanes) with *no change* in any single car's latency — the key move is increasing how many units of work are in flight simultaneously, independent of how fast any one of them completes.

## Pipelining: extra throughput without extra resources
Doing one load of laundry (wash 45 min → dry 60 min → fold 15 min) has a latency of 2 hours. Buying a second washer, dryer, and helper doubles resources and throughput together (2 loads in 2 hours). But with only *one* washer and *one* dryer, starting the next load's wash cycle as soon as the previous load moves to the dryer keeps each individual load's latency at 2 hours while raising throughput to 1 load/hour — because the washer and dryer are independent resources that can each stay busy on different loads at the same time, at no extra hardware cost.

The same idea shows up in instruction execution: a 4-stage instruction pipeline (fetch → decode → execute → write-back) still takes 4 cycles for any *one* instruction to complete (its latency), but once the pipeline is full it retires one instruction per cycle (its throughput). Saying a core "does one operation per clock" describes instruction *throughput*, not latency — real CPU pipelines can be far deeper than 4 stages (as deep as ~20 in modern CPUs), and correctness must be preserved (e.g. via hazard handling) when back-to-back pipelined instructions depend on each other.

## Bandwidth is capped by the narrowest link
Two connected pipes, one rated for a maximum flow of 100 liters/sec and the other for 50 liters/sec: once joined, the combined system can push at most 50 liters/sec — the throughput of a pipeline is set by its slowest stage, not its fastest or its average.

## Applied to memory
- **Memory bandwidth**: the rate at which the memory system can deliver data to a processor (e.g. a system might be rated at 20 GB/sec).
- **Memory latency**: the time for any single memory transfer to complete — a property largely independent of bandwidth. Even a memory system with plentiful bandwidth still takes however long a given round trip takes for any *one* request.

Both numbers matter for different reasons: latency limits how fast a single dependent chain of memory accesses can progress; bandwidth limits how much total data can move per second once many accesses are in flight together. See [[Hardware Multi-Threading (Latency Hiding)]] for how processors exploit that independence.

---
From Stanford [[CS 149 - Parallel Computing|CS149]] (Fall 2025), Lecture 3 — "Modern Multi-Core Architecture (Part II) + ISPC Programming Abstractions"
Related: [[Hardware Multi-Threading (Latency Hiding)]], [[Memory Bandwidth as the Critical Resource]], [[Instruction Cycle]], [[CPU]], [[Instruction-Level Parallelism]]
