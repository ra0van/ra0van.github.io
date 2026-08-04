---
sr-due: 2024-12-20
sr-interval: 3
sr-ease: 250
---

#review #computer_science #systems #cpu #brewing
## Cycle, Processors & Threads
In the realm of multiprocessors, the heartbeat is the cycle - a unit of time dictating the fetching and execution of a single instructions. (That heartbeat is the [[Clock Signal]]; a "cycle" is one tick. The fetch/execute loop itself is the [[Instruction Cycle]].)
Over years, technology has advanced these cycles forward, from around 10 million cycles per second in 1980 to a staggering 3 billion by 2005.  Yet, the relative cost of instructions, particularly memory access has not improved along with the cpu speed, as this is mostly influenced by context.

Threads are like workers

The "relative cost of memory access" point above is why [[Caching]] and the [[Memory|SRAM/DRAM]] hierarchy matter.

---
The endpoint of [[Electrons to CPU]] — how this chip is built up from [[MOSFET|transistors]] via [[Logic Gates]], [[ALU]], and the [[Datapath and Control Unit]].

