#!/usr/bin/env node
// Copies only notes flagged `public: true` from the private vault into content/,
// so the private vault never has to leave its own repo for the public build to see it.
import { existsSync, mkdirSync, readdirSync, statSync, readFileSync, writeFileSync, rmSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_ROOT = path.resolve(__dirname, "..");
const VAULT_DIR = process.env.VAULT_DIR
  ? path.resolve(process.env.VAULT_DIR)
  : path.resolve(SITE_ROOT, "../network/Notes/Knowledge");
const CONTENT_DIR = path.join(SITE_ROOT, "content");
const SYNCED_MARKER = ".synced-from-vault"; // written into every folder we generate, so we only ever wipe synced output

function isPublic(fileContent) {
  if (!fileContent.startsWith("---\n")) return false;
  const end = fileContent.indexOf("\n---", 4);
  if (end === -1) return false;
  const frontmatter = fileContent.slice(0, end);
  return /^public:\s*true\s*$/m.test(frontmatter);
}

function wipeSyncedOutput(dir) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) {
      wipeSyncedOutput(full);
      if (readdirSync(full).length === 0) rmSync(full, { recursive: true });
    } else if (existsSync(path.join(dir, SYNCED_MARKER))) {
      rmSync(full);
    }
  }
}

function walk(dir, results = []) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      if (entry === ".obsidian") continue;
      walk(full, results);
    } else if (entry.endsWith(".md")) {
      results.push(full);
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

  wipeSyncedOutput(CONTENT_DIR);

  const allNotes = walk(VAULT_DIR);
  let copied = 0;
  const touchedDirs = new Set();

  for (const srcPath of allNotes) {
    const content = readFileSync(srcPath, "utf-8");
    if (!isPublic(content)) continue;

    const relPath = path.relative(VAULT_DIR, srcPath);
    const destPath = path.join(CONTENT_DIR, relPath);
    const destDir = path.dirname(destPath);
    mkdirSync(destDir, { recursive: true });
    writeFileSync(destPath, content);
    touchedDirs.add(destDir);
    copied++;
    console.log(`  + ${relPath}`);
  }

  for (const dir of touchedDirs) {
    writeFileSync(path.join(dir, SYNCED_MARKER), "");
  }

  console.log(`\nSynced ${copied} public note(s) from ${VAULT_DIR}`);
}

main();
