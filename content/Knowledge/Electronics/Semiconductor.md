#review #brewing #electronics #physics #fundamentals

# Semiconductor

Answers the open question in [[Circuit Physics]]: *why do semiconductors behave the way they do?*

## The band-gap idea
Whether a material conducts depends on how easily its electrons can jump into a "free to move" energy level (the **conduction band**). Between the electrons' resting level (the **valence band**) and the conduction band is an energy gap.

- **[[Circuit Physics#Conductors|Conductor]]** — no gap; electrons are already free. Always conducts.
- **[[Circuit Physics#Insulators|Insulator]]** — huge gap; electrons can't cross without extreme force ("breakdown"). Never conducts (normally).
- **Semiconductor** — *small* gap. At rest it behaves like an insulator, but a modest nudge — heat, light, or a small voltage — kicks some electrons across the gap and it starts to conduct.

![[band-gap.svg]]

## Why that middle ground matters
Because the gap is small, we can **control** it. Silicon (atomic number 14) has 4 outer electrons that form neat bonds with neighbours, so pure silicon barely conducts. But we can deliberately tune it:

1. **[[Doping]]** — add trace impurities to create extra free electrons or extra "holes".
2. **Applied voltage** — use an external field to switch conduction on and off.

That controllability is the entire reason silicon, not copper, is the basis of computers. A [[Transistor]] is just a piece of doped silicon whose conduction we flip with a voltage. Stack billions of them and you get a [[CPU]].

---
Part of [[Electrons to CPU]].
