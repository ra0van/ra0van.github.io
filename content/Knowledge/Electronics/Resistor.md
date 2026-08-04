#review #brewing #electronics #fundamentals

# Resistor

A component that deliberately limits current. It has a fixed **resistance** R, and it obeys [[Circuit Physics|Ohm's law]] directly: `V = I × R`.

## What it's for
- **Limit current** — protect a component from too much flow (e.g. in series with an LED).
- **Set a voltage** — two resistors in series split a voltage in proportion to their sizes (a *voltage divider*). This is how you create a specific voltage level to feed elsewhere.
- **Pull-up / pull-down** — in digital circuits, a resistor gently ties a wire to a known level (high or low) so it's never "floating".

## Series vs parallel
- **Series** — resistances add: `R = R₁ + R₂`.
- **Parallel** — the inverse adds: `1/R = 1/R₁ + 1/R₂` (total resistance goes *down*).

Passive and boring on its own, but resistors are everywhere around the active parts ([[Transistor]], [[Logic Gates]]) setting up the right voltages.

---
Part of [[Electrons to CPU]].
