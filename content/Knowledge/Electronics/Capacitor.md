#review #brewing #electronics #fundamentals

# Capacitor

Two conductive plates separated by an [[Circuit Physics#Insulators|insulator]]. It **stores charge** — think of it as a tiny, very fast rechargeable battery, or a bucket that fills and empties.

## Key behaviours
- **Stores energy** in the electric field between its plates. Capacitance C (farads) = how much charge it holds per volt.
- **Blocks steady (DC) current, passes changing (AC) current.** Once full, no more current flows in; but a *changing* voltage keeps charging/discharging it, so current flows.
- **Voltage can't change instantly** across a capacitor — it takes time to fill. Pair it with a [[Resistor]] and you get a predictable charging delay (an *RC time constant*), the basis of timing circuits.

## Why it matters downstream
- **Smoothing** — flattens out ripples in a power supply.
- **Memory** — a charged capacitor = a stored "1", drained = "0". This is literally how [[Memory|DRAM]] stores each bit.
- **Timing / clocks** — RC delays help generate the steady [[Clock Signal]] that paces a [[CPU]].

---
Part of [[Electrons to CPU]].
