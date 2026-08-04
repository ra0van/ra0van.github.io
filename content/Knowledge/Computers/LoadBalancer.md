---
sr-due: 2024-12-20
sr-interval: 3
sr-ease: 250
public: true
---

#review #computer_science #brewed
A load balancer sits in front of a pool of backend servers (app servers, sometimes databases) and decides which one answers each incoming request, then hands the response back to the client as if it came from a single machine. The traffic-spreading part is the obvious job; the more valuable part is what it does *around* that:
- keeps requests away from a backend that's already unhealthy
- stops one overloaded instance from being hammered further
- removes "this one server going down takes the whole service with it" as a failure mode

Can be a dedicated hardware appliance or software running on commodity boxes — HAProxy is the usual software example.

### Extra jobs a load balancer often picks up
- **TLS termination** — decrypt/re-encrypt at the load balancer instead of on every backend, so backends skip that CPU cost and certificates only need to live in one place instead of on every server.
- **Session stickiness** — if the app itself doesn't track session state, the load balancer can issue a cookie and keep routing a given client to the same backend instance.

Since the load balancer itself becomes a single choke point, it's normal to run more than one, in active-passive or active-active setup, so its own failure doesn't take everything down.

### How it picks a backend
Common strategies: random, least-loaded, sticky by session/cookie, round-robin (plain or weighted), or by inspecting traffic at layer 4 or layer 7.

**Layer 4** — decides using transport-layer info only: source/destination IP and port. It never looks at the payload, so it mostly just forwards packets and rewrites addresses (NAT) — cheap and fast, but blind to what the request actually is.

**Layer 7** — decides using application-layer content: headers, cookies, the request itself. This means it can terminate the connection, actually read the request, and *then* pick a backend — e.g. sending video traffic to servers built for it while routing billing traffic to a more locked-down pool. More flexible, costlier per request, though the gap matters less on modern hardware.

### Load balancers and horizontal scaling
Spreading load across more instances only works cleanly if those instances are interchangeable — which means backend servers need to be stateless (no session data or user-specific state living only on one box; push that into a shared store like a database or cache instead). The tradeoff: cloning servers adds operational complexity, and whatever sits downstream (databases, caches) now has to absorb connections from a larger fleet, not a smaller one.

### Where it can bite you
- It's new infrastructure in the request path — under-provision or misconfigure it and it becomes the bottleneck it was supposed to prevent.
- It's also a new single point of failure unless you run more than one, and running more than one is its own added complexity.

### Further reading
- [NGINX architecture](https://www.nginx.com/blog/inside-nginx-how-we-designed-for-performance-scale/)
- [HAProxy architecture guide](http://www.haproxy.org/download/1.2/doc/architecture.txt)
- [Wikipedia — load balancing](https://en.wikipedia.org/wiki/Load_balancing_(computing))
- [NGINX — layer 4 load balancing](https://www.nginx.com/resources/glossary/layer-4-load-balancing/)
- [NGINX — layer 7 load balancing](https://www.nginx.com/resources/glossary/layer-7-load-balancing/)
