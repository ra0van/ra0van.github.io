#review #brewing #digital #fundamentals #computer_science

# Logic Gates

A logic gate takes one or more [[Binary and Bits|binary]] inputs and produces a binary output by a fixed rule. You already know the *rules*; this note connects them to the *hardware*.

## The gates
| Gate | Output is 1 when… |
|------|-------------------|
| **NOT** (inverter) | input is 0 |
| **AND** | all inputs are 1 |
| **OR** | any input is 1 |
| **NAND** | NOT(AND) |
| **NOR** | NOT(OR) |
| **XOR** | inputs differ |

## How a gate is actually built (CMOS)
Each gate is just a few [[MOSFET|MOSFETs]] wired as [[Transistor as a Switch|switches]]. The trick is **complementary** pairs:
- A **pull-up** network of PMOS transistors connects the output to *high* (1).
- A **pull-down** network of NMOS transistors connects the output to *low* (0).
- They're arranged so exactly one network conducts for any input → the output is always cleanly driven to 1 or 0, never floating, and draws almost no power while idle.

**Example — a NOT gate:** one PMOS on top, one NMOS below, gates tied together as the input.
- Input 0 → PMOS on, NMOS off → output pulled high (1).
- Input 1 → PMOS off, NMOS on → output pulled low (0).
Two transistors = an inverter. A NAND is four transistors, and so on.

![[CMOS-inverter.svg]]

## Why gates are the pivot point
- **Downward**: a gate is nothing but [[MOSFET|transistors]] obeying [[Semiconductor|semiconductor]] physics.
- **Upward**: gates obey [[Boolean Algebra]], and NAND (or NOR) alone is *universal* — you can build every other gate, and therefore every computer, from copies of one gate. Combine them and you get [[Combinational Logic]] (arithmetic) and [[Sequential Logic]] (memory).

---
Part of [[Electrons to CPU]].
