# 🗺️ Systems & Distributed — MOC

Entry point for backend, distributed-systems and infra notes.

## Caching
- [[Caching]] — why/where to cache, types
- [[CacheAccessPatterns]] — read/write strategies, when to update
- [[CDN]] — edge caching close to users

## Traffic & availability
- [[LoadBalancer]] — L4/L7, routing, SSL termination, session persistence

## Messaging & consistency
- [[OutboxPattern]] — avoiding dual writes
- [[Log-based Change Data Capture]] — tail the DB log instead of polling

## Orchestration (Kubernetes cluster)
- [[Kubernetes]] — what/why, what it is not, nomenclature *(hub)*
- [[Control plane]] — apiserver, etcd, scheduler, controller-managers + master-node diagram
- [[Kubernetes Deployments]] — rolling updates, resource requests/limits, PDBs, HPA, Kustomize base/overlay
- [[Kubernetes Probes]] — liveness/readiness/startup, and the shared-endpoint restart anti-pattern
- [[Kubernetes - .NET Workloads]] — ASP.NET Core health checks, graceful shutdown, container-aware GC

## Networking
- [[How does the internet work]]
