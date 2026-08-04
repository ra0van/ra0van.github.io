---
public: true
---

#review #brewing #computer_science #devops #cicd #dotnet

# GitLab CI - .NET Pipelines

How the generic [[GitLab CI]] stage/job model gets applied to a .NET (C#) project, and the performance problems that show up almost every time.

## Typical stage → dotnet CLI mapping
| Stage   | Command                                | Notes                                                                  |
| ------- | -------------------------------------- | ---------------------------------------------------------------------- |
| restore | `dotnet restore`                       | pulls NuGet packages for the whole solution                            |
| build   | `dotnet build --no-restore`            | compiles; skip re-restoring since the previous job already did it      |
| test    | `dotnet test --no-build`               | run unit/integration tests against the already-built output            |
| publish | `dotnet publish -c Release --no-build` | produces the deployable output (framework-dependent or self-contained) |
| package | `docker build`                         | wraps the published output in a container image                        |
| deploy  | (Helm/kubectl/etc.)                    | ships the image to [[Kubernetes]] (see [[Kubernetes Deployments]], [[Kubernetes - .NET Workloads]]) or another target |

Chaining `--no-restore` / `--no-build` between stages avoids redoing work the previous job already did — but only works if the same `bin`/`obj` output is actually carried forward as an `artifact` between jobs (each job runs in a fresh environment by default).

## Common performance issues

### 1. Cold NuGet restore on every single run
Without caching, every job re-downloads the whole dependency graph from scratch. Fix: `cache` the NuGet package folder, keyed off a hash of `packages.lock.json` (or the `.csproj`/`.sln` files if lock files aren't in use) so the cache only invalidates when dependencies actually change. Combine with `dotnet restore --locked-mode` for reproducible, verifiable restores.

A gotcha that trips this up completely: the default NuGet global packages folder lives outside the checkout (under the user home directory), and — per [[GitLab CI]]'s cache/artifact path rule — GitLab can only cache paths *inside the project directory*. If you cache `~/.nuget/packages` as-is, nothing gets cached. The fix is to point NuGet at a repo-relative folder before restoring, then cache that folder instead:
```yaml
variables:
  NUGET_PACKAGES: '$CI_PROJECT_DIR/.nuget'
cache:
  key: nuget-cache
  paths:
    - .nuget
```

### 2. No incremental build in CI
CI containers start clean every time, so MSBuild's incremental/up-to-date checks never have anything to skip — every job is a full rebuild. This is expected, but it means build time scales with solution size on every pipeline run; keeping solutions decomposed and only rebuilding/testing what changed (via `rules:changes` or path-based job triggers) matters more than it would for a local incremental build.

### 3. Restoring per-project instead of per-solution
Running `dotnet restore` separately inside many small jobs (one per project) multiplies NuGet resolution overhead. Restore once for the whole solution in an early stage, publish the restored packages/output as an artifact, and have downstream jobs consume it with `--no-restore`.

### 4. Docker layer-cache busting
A classic mistake: `COPY . .` before `dotnet restore` in the Dockerfile invalidates the restore layer on every single source change, since Docker cache is content-hash based per layer. Fix — copy only the `.csproj`/`.sln` files first, restore, *then* copy the rest of the source:
```dockerfile
COPY *.sln .
COPY src/**/*.csproj ./src/
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o /out
```
This keeps the (slow) restore layer cached across builds where only application code changed.

### 5. Serial test execution across projects
`dotnet test` parallelizes test *classes* within a single assembly by default (e.g. xUnit), but multiple test *projects* run one after another unless you explicitly fan them out. Fix — split test projects into separate parallel GitLab jobs (or use `parallel:` / `parallel:matrix` to shard one project's tests across several jobs), rather than one job that walks the whole solution's test projects serially. See [[GitLab CI - Integration Test Sharding]] for the full design (disjoint shard filters, a partition-completeness check, and a shared baked test-dependency image) and [[xUnit Test Parallelism and Fixture Isolation]] for what actually determines a shard's floor.

In practice, large multi-project solutions often don't call `dotnet build`/`test`/`publish` directly from CI at all — they wrap the whole restore → build → unit test → integration test → publish → pack sequence behind one internal build orchestration script, invoked as a single CI job step. That centralizes solution-graph knowledge (which projects to build, which tests to run, what to publish) in one place instead of duplicating it across many job definitions, at the cost of losing GitLab's native per-job parallelism unless the orchestrator itself fans work out internally.

### 6. Oversized artifacts between stages
Passing `bin`/`obj` (including PDBs, intermediate files) as `artifacts:paths` between every stage bloats upload/download time. Fix — only pass forward what the next stage actually needs (e.g. the `dotnet publish` output directory), and set `expire_in` so old artifacts don't pile up.

### 7. Runner sizing vs. MSBuild/Roslyn parallelism
`dotnet build` spins up multiple MSBuild worker processes to compile projects in parallel; on an undersized/shared runner this causes CPU contention rather than a speedup, and can be slower than a smaller, less parallel build. Tag CPU-heavy build/test jobs to run on runners with enough cores, or explicitly cap parallelism (`-m:<n>`) to match what the runner actually has.

### 8. dotnet CLI cold-start overhead
The first `dotnet` invocation in a fresh container pays first-run setup costs. `DOTNET_NOLOGO=true` and `DOTNET_SKIP_FIRST_TIME_EXPERIENCE=true` (plus `DOTNET_CLI_TELEMETRY_OPTOUT=true`) trim this down; baking these into a pre-warmed custom CI image (rather than the stock SDK image) avoids paying it on every job.

### 9. Test results invisible in the merge request UI
GitLab renders test pass/fail annotations from `artifacts: reports: junit:`, but `dotnet test`'s native output (`.trx`) isn't JUnit XML. Without conversion, results only exist as a log blob nobody reads. Fix — add a JUnit test logger package to test projects and point `dotnet test` at it directly:
```yaml
script:
  - dotnet test --logger "junit;LogFilePath=artifacts/{assembly}.xml"
artifacts:
  reports:
    junit:
      - artifacts/*.xml
```
This is worth doing even for a single test project — the alternative is scrolling console output to find which test failed.

### 10. Docker-in-Docker daemon not ready when the job starts
Any stage that runs `docker build`/`push` from inside a containerized job (rather than on a `shell` executor with a host Docker socket) needs a Docker-in-Docker (`dind`) service. That daemon takes a moment to come up, and a job that immediately calls `docker info`/`docker build` can race it and fail intermittently. Fix — a short retry/wait loop before the real work starts:
```bash
for i in $(seq 1 30); do
  docker info && break
  echo "Waiting for docker to start"; sleep 1
done
```
This shows up specifically for .NET pipelines because container packaging (the `dotnet publish` → `docker build` step) is usually the one job in the pipeline that actually needs a Docker daemon.

### 11. Re-resolving the SDK image (and its tag) on every run
Pulling `mcr.microsoft.com/dotnet/sdk:<version>` by a floating tag means every job re-resolves and potentially re-pulls a moving target, and any tooling installed via `apt`/`dotnet tool install` at job start (linters, formatters, EF tools) gets reinstalled from scratch every run. Fix — build a custom SDK image with the fixed toolset pre-installed, pin it by digest (`image@sha256:...`) rather than by tag, and pull it through a registry/pull-through cache close to the runners. This trades slower, manual image updates for fast, reproducible job starts.

## Related
See [[GitLab CI]] for the general stage/job/runner model these patterns build on, and [[Kubernetes - .NET Workloads]] for what happens to the published image once it's deployed.

---
Part of [[Computers]] · related: [[GitLab CI]], [[Kubernetes - .NET Workloads]]
