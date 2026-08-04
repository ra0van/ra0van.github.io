#review #brewing #computer_science #parallel_computing #cs149 #cpu

# Multi-core and Specialized Processors

Once [[The Power Wall|frequency scaling and instruction-level parallelism both stopped paying off]], chip designers shifted to making faster *systems* by adding more processing units that work in parallel, rather than making a single instruction stream faster.

## Multi-core: more general-purpose cores
The straightforward move: put multiple full CPU cores on one chip, each capable of executing its own independent instruction stream. Scale varies enormously by target:
- A modern desktop CPU has around 10 cores (e.g. a 2020-era 10-core Intel chip).
- A high-end workstation chip can have dozens of cores built from multiple smaller "chiplets" wired together (e.g. a 64-core design built from four 8-core chiplets).
- A GPU takes this further: thousands of simpler arithmetic units (tens of thousands of floating-point multipliers) organized into many parallel processing blocks, aimed at throughput over single-thread speed.
- The world's largest supercomputers combine hundreds of thousands of CPU cores with tens of thousands of GPUs, drawing megawatts of power.

## Specialized (domain-specific) hardware
Achieving high efficiency is a recurring theme, not just adding more general-purpose cores: modern systems also add **specialized processing units** built for one job, because a specialized circuit can do that job with far less power per unit of work than a general-purpose core running the equivalent code.

- **Mobile chips** pack a heterogeneous mix in one package: a handful of general-purpose CPU cores (often split into "big" high-performance cores and "small" power-efficient cores), a multi-core GPU, a neural engine (NPU) for accelerating neural-network inference, an image/video encode-decode processor, and a motion/sensor processor.
- **Datacenter-scale ML** uses purpose-built accelerators — e.g. Tensor Processing Units (TPUs) — deployed in large pods, distinct from general-purpose CPUs/GPUs.
- A wider family of specialized DNN inference/training hardware exists across vendors (custom tensor cores added to GPUs, wafer-scale accelerators, dedicated AI chips), all trading general-purpose flexibility for power efficiency on one workload.

## Why this matters for a programmer
Power constraints (see [[The Power Wall]]) apply everywhere, not just mobile: **fast ≠ efficient**, and choosing the right capability for a task — a general-purpose core vs. a specialized unit — is itself a design decision with real performance/power/cost trade-offs, from both the programmer's side (use the capabilities you're given) and the hardware designer's side (choose the right capabilities to put in the system).

## Exposing parallelism to multi-core hardware
Adding cores doesn't automatically parallelize an existing program — a compiled single-threaded binary still expresses no parallelism for a multi-core chip to exploit. Software must explicitly expose the independent work available, either by creating threads directly (e.g. via a threading API) or by using a data-parallel language construct that declares loop iterations independent (e.g. a `forall` loop). The latter form is powerful because a single high-level declaration of independence can drive automatic generation of both multi-core parallel code *and* [[SIMD (Single Instruction, Multiple Data)|SIMD vector instructions]] within each core — see [[SIMD (Single Instruction, Multiple Data)]] for that mechanism.

## References
- 10-core Intel "Comet Lake" CPU die photo (2020) and AMD Ryzen Threadripper 3990X chiplet diagram (64 cores, four 8-core chiplets): no explicit credit line given on-slide.
- NVIDIA AD102 GPU die photo (GeForce RTX 4090, 2022, 76 billion transistors, 18,432 fp32 multipliers in 144 SMs): no explicit credit line given on-slide.
- Frontier supercomputer photo (Oak Ridge National Laboratory; world's #1 in Fall 2022; 9,472× 64-core AMD CPUs, 37,888 Radeon GPUs, 21 megawatts): vendor imagery (Cray/HPE/AMD), no separate credit line.
- Apple A15 Bionic die photo (iPhone 13/14; 15 billion transistors; 6-core CPU with 2 "big" + 4 "small" cores; multi-core GPU) and Google TPU pods photo: image credit TechInsights Inc.
- Raspberry Pi 3 board photo (quad-core ARM A53 CPU): no explicit credit line given on-slide.
- Specialized DNN accelerator photos (Google TPU3, GraphCore IPU, Apple Neural Engine/A16, AWS Trainium, NVIDIA Ampere GPU with Tensor Cores, Cerebras Wafer Scale Engine, SambaNova Cardinal SN10): no explicit credit line given on-slide.

---
From Stanford [[CS 149 - Parallel Computing|CS149]] (Fall 2025), Lecture 1 — "Why Parallelism? Why Efficiency?" and Lecture 2 — "A Modern Multi-Core Processor (Part I)"
Related: [[The Power Wall]], [[Instruction-Level Parallelism]], [[SIMD (Single Instruction, Multiple Data)]], [[CPU]], [[Electrons to CPU]]
