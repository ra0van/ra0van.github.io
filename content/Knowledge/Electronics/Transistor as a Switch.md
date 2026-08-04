#review #brewing #electronics #fundamentals #digital

# Transistor as a Switch

**The bridge from analog physics to digital logic.** This is the conceptual jump most people miss — how do voltages become 1s and 0s?

## The trick: only use the extremes
A [[MOSFET]] can be partly-on (an amplifier), but in a computer we drive it to only two states:
- Gate fully OFF → no channel → like an open switch.
- Gate fully ON → strong channel → like a closed switch.

![[transistor-switch.svg]]

We agree on a convention (see [[Binary and Bits]]):
- A high voltage (say ~1V or ~3.3V) = logical **1**.
- Near-zero voltage = logical **0**.

Now a transistor isn't an analog device anymore — it's a switch whose *input voltage* (a 1 or 0) decides whether it connects or disconnects, producing an *output voltage* that is again a clean 1 or 0.

## Why the extremes, not the middle?
- **Noise immunity** — small voltage wobbles don't flip a clear "0V vs 1V"; they would ruin an analog signal.
- **Regeneration** — each stage outputs a clean full-strength 1 or 0, so signals don't degrade as they pass through millions of gates.

Wire a few of these switches together and the *output* 1/0 becomes a logical function of the *input* 1/0s. That combination is a [[Logic Gates|logic gate]] — the first thing that "computes".

---
Part of [[Electrons to CPU]].
