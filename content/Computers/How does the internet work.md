---
public: true
---

#internet #brewed
## What is the internet?
A network of networks. It started as an academic/military research project in 1969 and went commercial in the 1990s. Nobody owns it and nobody controls who can join — thousands of independent organizations run their own networks and interconnect voluntarily.

## Where does it physically live?
Three layers:
- **Last mile** — the link from an individual home/business to the network (includes cell towers).
- **Data centers** — buildings full of servers that store data and run applications.
- **Backbone** — the long-haul fiber that moves data between data centers and regions. Backbone operators are commercial competitors who peer with each other at internet exchange points, usually clustered in major cities — the more exchange points a backbone provider connects to, the better its reach.

## Where did it come from?
It began as ARPANET, an academic research network funded by the US military's ARPA (now DARPA), led by Bob Taylor and built by the firm Bolt, Beranek and Newman. It went live in 1969.

In 1973 Vint Cerf and Bob Kahn started designing TCP/IP as the network's next-generation protocol; ARPANET fully switched to it on January 1, 1983 — arguably the point at which "the internet" as we'd recognize it exists.

Through the 1980s, control shifted from the military to the National Science Foundation, which funded the backbone from 1981–1994. In 1994 the US government handed backbone operation to the private sector, and it's stayed privately run and funded since.

## Who runs it now?
No single entity — it's a decentralized mesh of independently operated networks that exchange traffic under voluntary peering agreements. The shared technical standards are stewarded by the IETF, an open body anyone can participate in; nothing forces adoption of an IETF standard, but its consensus process is why most of the internet ends up converging on the same ones anyway.

## What's an IP address?
A number that identifies a device on the network, handed out so that no two organizations collide on the same address — that allocation is managed by IANA (part of ICANN). If you connect through an ISP you're often assigned a temporary address for the session; on a LAN you might get a temporary one from DHCP or a fixed one. Either way, at any given moment it's unique.

IPv4 only has room for about 4 billion addresses, which sounded infinite in the 1970s and is now effectively exhausted — which is why IPv6 exists, with an address space large enough that it's not expected to run out.

## How does wireless access work?
Two flavors. Wi-Fi is the simpler one: it runs on unlicensed spectrum (frequencies anyone can use for free), with power/range limits as the main way to keep networks from stepping on each other. Cellular is more centralized — coverage is divided into cells, each with its own tower, dense city cells might be a block wide while a rural cell can span miles, and a device is handed off from tower to tower as it moves without dropping the connection.

## What's "the cloud," really?
Someone else's computer, rented by the hour.

## What's a packet?
The unit data gets chopped into before crossing the network — breaking a transfer into small pieces lets the network use its capacity more efficiently than moving one giant blob. Each packet has a header (source, destination, length, a checksum for detecting damage in transit) and a payload, capped around 64KB. If a router hits congestion, its escape hatch is simply to drop packets and let the sender retransmit — which sounds harsh, but keeping that logic out of the core network is exactly what keeps the core simple and fast.

## Where did the web fit in?
The web is one application built on top of the internet, not the internet itself — invented by Tim Berners-Lee at CERN in 1991 as a friendlier way to publish and link documents than what existed before. In 1994 he founded the W3C to steward it as an open standard going forward.

### Further reading
- [Vox — how the internet works](https://www.vox.com/2014/6/16/18076282/the-internet)
