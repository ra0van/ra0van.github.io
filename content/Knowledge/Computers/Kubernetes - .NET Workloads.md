---
public: true
---

#review #brewing #computer_science #kubernetes #dotnet

# Kubernetes - .NET Workloads

How [[Kubernetes Deployments]] and [[Kubernetes Probes]] show up specifically for an ASP.NET Core container, and the .NET-flavored ways each generic concept can go wrong.

## Health checks feeding probes
ASP.NET Core's health check middleware is what a probe's `httpGet` path actually hits:
```csharp
services.AddHealthChecks()
    .AddCheck<DatabaseHealthCheck>("primary-db")
    .AddCheck<DownstreamServiceHealthCheck>("downstream-api");
// ...
app.MapHealthChecks("/health");
```
The framework's happy path — register a few `IHealthCheck`s, map one `/health` endpoint — reproduces the shared-endpoint anti-pattern from [[Kubernetes Probes]] almost by default: it's natural to point *both* the liveness and readiness probes at that single path, which means a database check failing restarts every replica instead of just pulling them from rotation.

**Fix**: tag checks by purpose and map two endpoints:
```csharp
services.AddHealthChecks()
    .AddCheck<DatabaseHealthCheck>("primary-db", tags: new[] { "ready" });

app.MapHealthChecks("/health/live", new HealthCheckOptions { Predicate = _ => false });
app.MapHealthChecks("/health/ready", new HealthCheckOptions { Predicate = c => c.Tags.Contains("ready") });
```
Point the liveness probe at `/health/live` (no checks run — it only proves Kestrel is responding) and the readiness probe at `/health/ready` (the real dependency checks).

## Kestrel binding and container ports
A container commonly binds Kestrel to more than one port/scheme via `ASPNETCORE_URLS` (e.g. `https://+:7130;http://+:80`) — an HTTPS app port plus a plain HTTP port for internal-only or metrics traffic — each declared as a separate named `containerPort`. Probes, the Service, and any metrics scraper all need to target the *correct* one; a probe accidentally pointed at a metrics port instead of the app port will "pass" without proving the app itself is healthy.

## Per-environment config without per-environment images
Baking a separate container image per environment defeats the point of promoting one tested artifact through environments. Instead, environment-specific settings (connection strings, feature flags) are supplied as a JSON file mounted from a Secret/ConfigMap volume (e.g. into `/app/configOverrides`), which the .NET configuration system layers on top of the built-in `appsettings.json` at startup — the same image runs everywhere; only the mounted override file changes.

## Graceful shutdown: two independent timers
When a Pod is terminated, Kubernetes sends `SIGTERM` and then waits up to `terminationGracePeriodSeconds` (default 30s) before `SIGKILL`. Separately, ASP.NET Core's own host has a `HostOptions.ShutdownTimeout` (default 5s) bounding how long it waits for in-flight requests to drain before forcing shutdown internally. These are two independent clocks — whichever is shorter effectively wins, and 5 seconds is often not enough to drain real in-flight requests.

Two fixes, usually applied together:
- Extend `ShutdownTimeout` (and `terminationGracePeriodSeconds` if needed) to comfortably exceed the slowest expected request.
- Fail readiness as soon as `IHostApplicationLifetime.ApplicationStopping` fires, so the Service stops sending *new* traffic immediately, rather than relying on the shutdown timeout to protect requests that shouldn't have arrived in the first place.

Skipping this is a common way a [[Kubernetes Deployments|rolling update]] "works" in testing but drops real requests in production under load.

## Container-aware GC and resource limits
The .NET runtime sizes its GC (heap segments, and for Server GC, thread/heap count) based on the number of CPUs it detects, and it reads that from the container's CPU **limit** — not the request, and not the node's real core count. Consequences:
- A CPU limit set too low relative to actual load causes throttling that shows up as latency spikes and longer GC pauses, not an obvious error — easy to misdiagnose as an application bug.
- A memory limit set with little headroom over the real working set risks OOMKill during a transient GC-driven spike; one set far too generously just wastes cluster capacity.
Size both from observed working-set/CPU behavior under real load, not a guess carried over from a different service.

## HPA can be fooled by GC pressure
An [[Kubernetes Deployments|HPA]] scaling on CPU utilization can be misled by a pod that's CPU-busy *because* it's GC-thrashing under memory pressure — the autoscaler adds replicas, which does nothing for a memory problem and just spreads the same underlying issue across more Pods. Worth checking GC/memory metrics before trusting a CPU-based scaling signal at face value.

## Related
- [[Kubernetes Deployments]] — rollout/resource/autoscaling mechanics these patterns plug into
- [[Kubernetes Probes]] — the general liveness/readiness/startup model
- [[GitLab CI - .NET Pipelines]] — the pipeline that builds and ships the image these Pods run

---
Part of [[Computers]] · related: [[Kubernetes Deployments]], [[Kubernetes Probes]], [[GitLab CI - .NET Pipelines]]
