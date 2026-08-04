---
public: true
---

#review #brewing #computer_science #git

# Git

A distributed version control system: every clone holds the full history, and content is stored as a graph of immutable, content-addressed objects rather than as file-by-file diffs. This note covers what actually lives inside `.git/` *(hub)*.

## Objects — Git's database
`.git/objects` is where Git stores every piece of content it tracks (blobs, trees, commits, tags), each addressed by the SHA-1/SHA-256 hash of its contents.
- At first, every new object is written as its own file — a **loose object**.
- On certain events (e.g. `git gc`, pushing to a remote), many loose objects get rolled up into a **pack**: a single file holding many objects in a compressed, delta-encoded format — `.git/objects/pack`.
- `.git/objects/info` stores metadata about the packs (for some remote protocols) and can hold links to objects kept elsewhere.

## Ignoring files: `.gitignore` vs. `.git/info/exclude`
Both tell Git's user-facing commands which untracked files to leave alone, but they differ in scope:
- **`.gitignore`** lives in the source tree, so it's committed and distributed to everyone who clones the repo — the right place for rules that apply to the project itself (build output, dependency folders).
- **`.git/info/exclude`** (created by `git init`) is local only — never committed, never shared. The right place for personal, machine-specific ignores (your editor's swap files) that shouldn't leak into the shared `.gitignore`.

## Hooks
`.git/hooks` holds scripts that Git runs automatically at points in its core commands (e.g. before a commit, before a push). Since they're local by default, they're how individual clones (or CI, via a checked-in hook installer) customize Git's behavior — linting a commit message, running a formatter pre-commit, etc.

## Related
- [[Git Rebase]] — rewriting history onto a new base, interactive rebase, conflicts
- [[Git Rebase Onto]] — replaying a specific range of commits onto a different base
- [[GitLab CI]] — how these objects/refs feed into pipeline triggers
- [[GitLab Merge Trains]] — merging multiple MRs into a busy branch safely

---
Part of [[Computers]] · related: [[Git Rebase]], [[GitLab CI]]
