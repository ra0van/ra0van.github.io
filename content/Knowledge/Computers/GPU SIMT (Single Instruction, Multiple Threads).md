#review #brewing #computer_science #parallel_computing #cs149 #simd #gpu

# GPU SIMT (Single Instruction, Multiple Threads)

**SIMT** is how many GPU cores combine [[Hardware Multi-Threading (Latency Hiding)|hardware multi-threading]] with [[SIMD (Single Instruction, Multiple Data)|SIMD]]: many independent hardware threads each run ordinary scalar instruction streams, and the core detects when several of them happen to be executing the same instruction and runs those threads together on shared SIMD ALUs.

## The mechanism
Each hardware thread on a SIMT core has its own execution context (registers, program counter) and its own instruction stream made of only scalar instructions — there is no vector instruction anywhere in the compiled code. The core's fetch/decode logic looks across its resident hardware threads, finds a group that are all at the same instruction, and issues that one instruction to a bank of SIMD ALUs simultaneously — one ALU lane per hardware thread in the group. This is "implicit SIMD" (see [[SIMD (Single Instruction, Multiple Data)]]) applied not to a compiler-generated vector instruction, but to a group of otherwise-independent hardware threads that happen to be instruction-synchronized at that moment.

## Divergent execution across threads
If the hardware threads sharing a SIMD ALU bank take different branches (e.g. one thread's `if` condition is true while another's is false), the core cannot execute both threads' next instructions in the same cycle using the same instruction — the group has diverged. The core handles this exactly like [[SIMD (Single Instruction, Multiple Data)|SIMD masking]]: it runs each divergent path in turn and masks off the ALU lanes belonging to threads not currently on that path, so those lanes do no useful work while their thread waits its turn.

## Who assigns threads to hardware execution contexts?
Software creates threads (e.g. a C program spawning some number of threads), but the **operating system** is responsible for mapping those application-level threads onto the processor's actual hardware execution contexts. If an application spawns more threads than there are hardware contexts to run them (e.g. five threads on a core with four execution contexts), the OS must decide how to schedule/rotate them onto the available hardware, since not every application thread can be simultaneously resident.

---
From Stanford [[CS 149 - Parallel Computing|CS149]] (Fall 2025), Lecture 2 — "A Modern Multi-Core Processor (Part I)"
Related: [[SIMD (Single Instruction, Multiple Data)]], [[Hardware Multi-Threading (Latency Hiding)]], [[Multi-core and Specialized Processors]], [[CPU]]
