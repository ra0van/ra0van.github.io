#!/usr/bin/env node
// Copies the vault into content/, excluding folders that were never meant to be public.
// NOTE: as of the "publish everything for now" decision, this does NOT require a
// `public: true` frontmatter flag — everything under VAULT_DIR is synced except EXCLUDED_DIRS.
// Re-tighten by restoring a public:true check in the loop below if that changes.
//
// Tracks exactly which files it wrote in a manifest (rather than marking whole
// directories as "synced"), so a hand-authored file living in the same folder as
// synced content (e.g. content/index.md) is never at risk of being swept up in a wipe.
import { existsSync, mkdirSync, readdirSync, statSync, readFileSync, writeFileSync, copyFileSync, rmSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_ROOT = path.resolve(__dirname, "..");
const VAULT_DIR = process.env.VAULT_DIR
  ? path.resolve(process.env.VAULT_DIR)
  : path.resolve(SITE_ROOT, "../network/Notes");
const CONTENT_DIR = path.join(SITE_ROOT, "content");
const MANIFEST_PATH = path.join(SITE_ROOT, ".sync-manifest.json");

// Folder names (matched anywhere in the tree, case-sensitive) that never get synced,
// regardless of the "publish everything" decision — these are personal/meta by name alone.
const EXCLUDED_DIRS = new Set([".obsidian", "Personal", "Meta"]);

const ASSET_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"]);

function isMarkedPrivate(fileContent) {
  if (!fileContent.startsWith("---\n")) return false;
  const end = fileContent.indexOf("\n---", 4);
  if (end === -1) return false;
  const frontmatter = fileContent.slice(0, end);
  return /^private:\s*true\s*$/m.test(frontmatter);
}

function removePreviouslySyncedFiles() {
  if (!existsSync(MANIFEST_PATH)) return;
  const previous = JSON.parse(readFileSync(MANIFEST_PATH, "utf-8"));
  for (const relPath of previous) {
    const full = path.join(CONTENT_DIR, relPath);
    if (existsSync(full)) rmSync(full);
  }
  // Clean up any directories that are now empty as a result.
  const dirs = new Set(previous.map((p) => path.dirname(path.join(CONTENT_DIR, p))));
  for (const dir of [...dirs].sort((a, b) => b.length - a.length)) {
    let d = dir;
    while (d.startsWith(CONTENT_DIR) && existsSync(d) && readdirSync(d).length === 0) {
      rmSync(d, { recursive: true });
      d = path.dirname(d);
    }
  }
}

function walk(dir, results = []) {
  for (const entry of readdirSync(dir)) {
    if (EXCLUDED_DIRS.has(entry)) continue;
    const full = path.join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walk(full, results);
    } else {
      const ext = path.extname(entry);
      if (ext === ".md" || ext === ".canvas" || ASSET_EXTENSIONS.has(ext)) results.push(full);
    }
  }
  return results;
}

function main() {
  if (!existsSync(VAULT_DIR)) {
    console.error(`Vault directory not found: ${VAULT_DIR}`);
    console.error(`Set VAULT_DIR env var to override.`);
    process.exit(1);
  }

  removePreviouslySyncedFiles();

  const allFiles = walk(VAULT_DIR);
  const written = [];
  let skippedPrivate = 0;

  for (const srcPath of allFiles) {
    const relPath = path.relative(VAULT_DIR, srcPath);
    const destPath = path.join(CONTENT_DIR, relPath);

    if (srcPath.endsWith(".md")) {
      const content = readFileSync(srcPath, "utf-8");
      if (isMarkedPrivate(content)) {
        skippedPrivate++;
        console.log(`  - ${relPath} (private: true)`);
        continue;
      }
      mkdirSync(path.dirname(destPath), { recursive: true });
      writeFileSync(destPath, content);
    } else {
      mkdirSync(path.dirname(destPath), { recursive: true });
      copyFileSync(srcPath, destPath);
    }
    written.push(relPath);
    console.log(`  + ${relPath}`);
  }

  writeFileSync(MANIFEST_PATH, JSON.stringify(written, null, 2));

  if (skippedPrivate > 0) console.log(`\nSkipped ${skippedPrivate} file(s) marked private: true`);
  console.log(`\nSynced ${written.length} file(s) from ${VAULT_DIR} (excluded: ${[...EXCLUDED_DIRS].join(", ")})`);
}

main();
