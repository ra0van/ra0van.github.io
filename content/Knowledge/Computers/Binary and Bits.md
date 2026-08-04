#review #brewing #digital #fundamentals #computer_science

# Binary and Bits

Why computers count in 1s and 0s — and it's not arbitrary. It falls straight out of [[Transistor as a Switch]]: a transistor is reliably either OFF or ON, so the natural "alphabet" of hardware has exactly **two symbols**.

## Definitions
- **Bit** — one binary digit, 0 or 1. Physically: one wire that is low or high voltage.
- **Byte** — 8 bits, 256 possible patterns.
- **n bits** → 2ⁿ distinct values. 8 bits = 256, 16 = 65 536, 32 = ~4 billion.

## Binary numbers
Same idea as decimal, but each place is a power of 2 instead of 10:
`1011₂ = 1·8 + 0·4 + 1·2 + 1·1 = 11₁₀`

## Why this is enough
With just 1s and 0s you can encode *everything* — numbers, text (ASCII/Unicode), images, instructions. And crucially, [[Boolean Algebra]] gives us a math for manipulating 1s and 0s, which [[Logic Gates]] implement directly in hardware. Binary is the shared language between the physics and the logic.

---
Part of [[Electrons to CPU]].
