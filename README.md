# ra0van.github.io

Personal blog and digital garden, built with [Quartz](https://quartz.jzhao.xyz/).

Live at **https://ra0van.github.io**.

## How content gets here

The actual notes live in a private vault (a separate, private repo). Nothing in that
vault is edited directly in this repo — instead, [`scripts/sync-public-content.mjs`](scripts/sync-public-content.mjs)
copies from the vault into [`content/`](content), and only what that script copies
ever gets committed here.

```sh
node scripts/sync-public-content.mjs   # pulls from ../network/Notes by default
                                        # override with VAULT_DIR=/path/to/vault
```

It excludes the vault's `Personal/` and `.obsidian/` folders by name, and skips any
note frontmatter-tagged `private: true` wherever it lives. Everything else in the
vault is currently synced as-is (not gated behind a `public: true` flag) — see
`scripts/sync-public-content.mjs` for the exact rules if that changes.

Run the sync, review the diff, then commit and push — pushing to `main` triggers the
GitHub Pages deploy via [`.github/workflows/deploy.yaml`](.github/workflows/deploy.yaml).

## Local development

```sh
npm install
npx quartz build --serve
```

## Credit

Built on [Quartz v5](https://github.com/jackyzha0/quartz) by Jacky Zhao — `upstream`
remote still points there for pulling in Quartz updates.
