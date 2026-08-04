#review #brewing #digital #fundamentals #computer_science #cpu

# Clock Signal

The **heartbeat** that keeps millions of circuits in step. A square wave that flips 0→1→0 at a fixed rate; every [[Sequential Logic|flip-flop]] updates on its edge.

![[clock-waveform.svg]]

## Why it's needed
[[Combinational Logic|Gates]] take a little time to settle, and signals arrive slightly out of sync. If circuits updated whenever they felt like it, they'd read half-finished values. The clock says: *"don't capture the answer until the tick — by then everything has settled."* One tick = one step of orderly progress.

## Speed
- **Clock frequency** = ticks per second. 3 GHz = 3 billion ticks/second.
- This is the "cycle" in [[CPU]] — one cycle is one clock period. Faster clock = more steps per second (up to physical limits of heat and settling time).

Connects the abstract 1s and 0s back to *time*: it's what turns a static [[Combinational Logic|logic circuit]] into a machine that *does one thing after another*.

---
Part of [[Electrons to CPU]].
