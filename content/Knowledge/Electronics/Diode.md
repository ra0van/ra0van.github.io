#review #brewing #electronics #fundamentals

# Diode

A **one-way valve for current**. Made by joining a piece of N-type and a piece of P-type [[Doping|doped]] [[Semiconductor|silicon]] — see [[Circuit Physics#Semiconductors|semiconductors]] — the boundary is a **PN junction**.

![[PN-junction.svg]]

## Why it only conducts one way
At the junction, free electrons from the N side fill holes on the P side, leaving a thin **depletion region** with no free carriers — a built-in barrier.

- **Forward bias** (push with +voltage on the P side): the external field overpowers the barrier, carriers flood across → conducts.
- **Reverse bias** (+voltage on the N side): the field *widens* the barrier → blocks.

So current flows in one direction only. That asymmetry — created purely by putting two doped regions side by side — is the first "decision" a piece of silicon can make.

## Where it leads
The diode proves that a *junction* has behaviour a plain wire doesn't. Add a third region or a control terminal and the junction becomes controllable → the [[Transistor]]. Special diodes also give us the LED (light-emitting) and the rectifier (AC→DC power).

---
Part of [[Electrons to CPU]].
