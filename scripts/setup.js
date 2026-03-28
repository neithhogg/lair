#!/usr/bin/env node
// Sets up all skills locally for every installed AI tool.
// Usage: npm run setup   OR   node scripts/setup.js

import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const manifest = JSON.parse(
  readFileSync(join(__dirname, 'skills.recommended.json'), 'utf8')
);

function run(cmd) {
  console.log(`\n> ${cmd}`);
  execSync(cmd, { stdio: 'inherit', cwd: root });
}

// Install lair's own skills from the local repo.
// --full-depth required: skills live in skills/ subdirectory, not repo root.
console.log('Installing lair skills...');
run('npx skills add . --full-depth --all -y');

// Install each recommended third-party skill.
// Failures are warnings only — network issues shouldn't block local dev.
console.log('\nInstalling recommended third-party skills...');
for (const { source, skill } of manifest.skills) {
  try {
    run(`npx skills add ${source} --skill ${skill} -y`);
  } catch {
    console.error(`  Warning: failed to install ${skill} from ${source}`);
  }
}

console.log('\nSetup complete.');
