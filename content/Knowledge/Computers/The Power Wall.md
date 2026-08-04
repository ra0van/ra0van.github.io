#review #brewing #computer_science #parallel_computing #cs149 #cpu

# The Power Wall

Why single-core CPU performance stopped scaling the way it used to, and why every performance roadmap since has been about *parallelism*, not raw clock speed.

## Two reasons single-thread performance used to improve, now exhausted
1. **Exploiting [[Instruction-Level Parallelism]]** (superscalar execution) — tapped out; most available ILP is captured by an issue-width-4 processor, and going wider barely helps.
2. **Increasing clock frequency** — hit the power wall (below). Transistor density (Moore's Law) kept climbing, but clock frequency and single-thread performance flattened out around the mid-2000s.

## Power consumed by a transistor
- **Dynamic power** ∝ capacitive load × voltage² × frequency.
- **Static power** — transistors burn power even when inactive, due to leakage.
- High power = high heat, and hotter systems cost more to cool. Power is a critical design constraint in modern processors, not an afterthought.

Typical thermal design power (TDP): a mobile phone processor draws roughly ½–2W; an Apple M1 laptop chip ~13W; a desktop CPU (Intel i9-10900K) ~95W; a high-end GPU (NVIDIA RTX 4090) ~450W; the world's fastest supercomputers draw megawatts. (For scale: a standard microwave oven draws ~900W.)

## Why you'd want to save power
- **Run at higher performance for a fixed amount of time** — if a chip gets too hot it must be clocked down to cool off (and hotter systems cost more to cool).
- **Run at sufficient performance for a longer amount of time** — long battery life is a desirable feature in mobile devices.

Power draw rises steeply (worse than linearly) with clock frequency, because the maximum allowed frequency is itself determined by the processor's core voltage, and dynamic power scales with voltage².

## The consequence: architects stopped chasing frequency
Once ILP was tapped out and frequency scaling hit the power wall, chip designers started building faster *systems* by adding more execution units that run in parallel — full cores, or units specialized for a specific task (graphics, audio/video, ML) — rather than making one instruction stream faster. This is the origin of the modern multi-core / heterogeneous-hardware era: see [[Multi-core and Specialized Processors]].

**The catch for programmers:** none of that added hardware helps a program that wasn't written to use it. Software must be written to be parallel to see performance gains — there's no more "free lunch" where code just gets faster on the next generation of chips.

## References
- Moore's Law transistor-count chart (transistors on a chip doubling roughly every two years, 1970–2020): data source Wikipedia (wikipedia.org/wiki/Transistor_count), OurWorldInData.org; licensed CC-BY, authors Hannah Ritchie and Max Roser.
- "ILP tapped out + end of frequency scaling" and "Single-core performance scaling" charts (Intel CPU trends: transistor density, clock frequency, power, ILP vs. year, 1970–2010): image credit "The Free Lunch Is Over," Herb Sutter, *Dr. Dobb's*, 2005.
- TDP comparison figures (Apple M1, Intel i9-10900K, NVIDIA RTX 4090, mobile processors, supercomputers): source Intel, NVIDIA, Wikipedia, Top500.org.
- CPU power-consumption-vs-clock-frequency chart (i7-2600K vs. i7-3770K, dynamic/static power breakdown): image credit "Idontcare," posted at forums.anandtech.com/showthread.php?t=2281195.

---
From Stanford [[CS 149 - Parallel Computing|CS149]] (Fall 2025), Lecture 1 — "Why Parallelism? Why Efficiency?"
Related: [[Instruction-Level Parallelism]], [[Multi-core and Specialized Processors]], [[Clock Signal]], [[CPU]]
