#brewing #computer_science #moc

# 🗺️ Computers — MOC

The computing shelf: everything from digital logic up through architecture, systems, algorithms, and languages. The largest domain, so it's organised into sub-areas — several are their own MOCs.

## Digital logic & architecture
The hardware story, bottom-up (the tail of [[Electrons to CPU]]):
- [[Binary and Bits]] — why 1s and 0s
- [[Logic Gates]] — NOT/NAND/NOR from transistors (CMOS)
- [[Boolean Algebra]] — the math of logic *(shared with [[Math]])*
- [[Combinational Logic]] — output = f(inputs); [[Adder]]
- [[Sequential Logic]] — state, latches, flip-flops, registers
- [[Clock Signal]] — the heartbeat
- [[Memory]] — SRAM & DRAM
- [[ALU]] · [[Datapath and Control Unit]] · [[Instruction Cycle]]
- [[CPU]] — cycles, threads, memory-cost

## Systems & distributed
- [[Systems & Distributed]] — caching, load balancing, k8s, messaging *(sub-MOC)*
- Networking: [[How does the internet work]]

## Parallelism
- [[Speedup and Parallel Efficiency]] — the speedup formula; what limits it (communication, load imbalance)
- [[Instruction-Level Parallelism]] — superscalar execution, dependency chains, diminishing returns
- [[The Power Wall]] — why single-core scaling stalled (power, heat, frequency)
- [[Multi-core and Specialized Processors]] — cores, GPUs, TPUs/NPUs — parallel + specialized hardware
- [[CPU Cache and Locality]] — hits/misses, spatial & temporal locality
- [[SIMD (Single Instruction, Multiple Data)]] — one instruction, many ALUs; coherent vs. divergent execution
- [[GPU SIMT (Single Instruction, Multiple Threads)]] — SIMD + multi-threading combined on GPU cores
- [[Latency vs. Bandwidth]] — two independent performance axes; pipelining, bottleneck links
- [[Hardware Multi-Threading (Latency Hiding)]] — hiding memory stalls with resident hardware threads; interleaved vs. SMT
- [[Memory Bandwidth as the Critical Resource]] — bandwidth-bound execution; why programs must access memory infrequently
- [[Abstraction vs. Implementation (Parallel Programming)]] — semantics vs. scheduling
- [[ISPC and the SPMD Programming Model]] — gangs, foreach, uniform, interleaved/blocked scheduling
- [[CS 149 - Parallel Computing]] — course reference *(pointer note)*

## Algorithms & coding
- [[CodingMoC]] — selection/sorting, code quality *(sub-MOC)*

## Languages & tools
- [[Languages & Tools]] — Go, Rust, Git, Vim *(sub-MOC)*

## Cross-domain map that ends here
- [[Electrons to CPU]] — Physics → Electronics → Computers

---
Parent: [[Home]]
