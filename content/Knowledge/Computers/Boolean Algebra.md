#review #brewing #digital #fundamentals #computer_science #math

# Boolean Algebra

The **math of 1s and 0s** — the layer that lets us *design* [[Logic Gates|logic]] instead of guessing at transistors. Invented by George Boole (1850s), decades before any computer, then connected to switching circuits by Claude Shannon (1937).

## Variables and operators
Variables are true/false (1/0). Three basic operators map exactly onto gates:
- **AND** (·) — `A · B`
- **OR** (+) — `A + B`
- **NOT** (¯) — `Ā`

## Why an engineer cares
- **Truth tables** describe *what* you want (for each input combination, what output?). Boolean algebra + tools like Karnaugh maps then **minimise** that into the fewest gates.
- **Universality** — every truth table can be written with AND/OR/NOT, and each of those is buildable from [[Logic Gates|NAND]] alone. So *any* logical function you can specify can be built in hardware.

This is the hinge of the whole story: physics decides a transistor can switch; Boolean algebra decides what's *worth* wiring those switches into. Next: assemble gates into [[Combinational Logic]].

---
Part of [[Electrons to CPU]].
