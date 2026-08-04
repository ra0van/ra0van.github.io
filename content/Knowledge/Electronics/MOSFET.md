#review #brewing #electronics #fundamentals

# MOSFET

The specific kind of [[Transistor]] modern computers are made of. Name = **M**etal-**O**xide-**S**emiconductor **F**ield-**E**ffect **T**ransistor. Understanding it makes [[Logic Gates]] obvious.

![[MOSFET-cross-section.svg]]

## The picture
Three terminals plus a body:
- **Source** and **Drain** — current wants to flow between these two.
- **Gate** — sits *above* the channel between source and drain, separated by a thin **insulating** oxide layer. The gate never touches the silicon.

## How the gate controls current (the "field effect")
Because the gate is insulated, no current flows into it — it acts purely by its **voltage** creating an [[Electric Charge and Field|electric field]]:
- Put voltage on the gate → the field pulls carriers into the region under it, forming a conductive **channel** → source and drain are connected → **ON**.
- Remove the gate voltage → channel vanishes → **OFF**.

It's a voltage-controlled switch with no moving parts and (ideally) no gate current.

## Two complementary types (this is the key to [[Logic Gates|CMOS]])
- **NMOS** — turns ON when the gate is **high**.
- **PMOS** — turns ON when the gate is **low** (opposite).

Pairing NMOS + PMOS so that exactly one is ON at a time gives a gate that draws almost no power except when switching → that's **CMOS**, the reason billions of transistors can share one chip without melting.

---
Part of [[Electrons to CPU]].
