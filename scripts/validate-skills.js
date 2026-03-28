#!/usr/bin/env node
// Validates every .agents/skills/*/SKILL.md against scripts/skill-schema.json
// Usage: node scripts/validate-skills.js

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const skillsDir = join(root, 'skills');
const schemaPath = join(__dirname, 'skill-schema.json');

const schema = JSON.parse(readFileSync(schemaPath, 'utf8'));

/** Parse YAML frontmatter from a SKILL.md string. Returns null if none found. */
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;

  const yaml = match[1];
  const result = {};
  const lines = yaml.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) { i++; continue; }

    const colonIdx = trimmed.indexOf(':');
    if (colonIdx === -1) { i++; continue; }

    const key = trimmed.slice(0, colonIdx).trim();
    const raw = trimmed.slice(colonIdx + 1).trim();

    // Folded (>) or literal (|) block scalar — collect indented continuation lines
    if (raw === '>' || raw === '|') {
      i++;
      const parts = [];
      while (i < lines.length && (lines[i].startsWith('  ') || lines[i].trim() === '')) {
        parts.push(lines[i].trim());
        i++;
      }
      result[key] = parts.join(' ').trim();
      continue;
    }

    if (raw === 'true') result[key] = true;
    else if (raw === 'false') result[key] = false;
    else if (raw === '') result[key] = null;
    else if (raw.startsWith("'") || raw.startsWith('"')) {
      result[key] = raw.slice(1, -1);
    } else {
      result[key] = raw;
    }
    i++;
  }

  return result;
}

/** Validate a frontmatter object against the schema. Returns array of error strings. */
function validate(frontmatter, skillName) {
  const errors = [];
  const props = schema.properties;

  // Required fields
  for (const field of schema.required ?? []) {
    if (frontmatter[field] === undefined || frontmatter[field] === null || frontmatter[field] === '') {
      errors.push(`missing required field: "${field}"`);
    }
  }

  // Type checks
  for (const [key, value] of Object.entries(frontmatter)) {
    if (!props[key]) {
      if (schema.additionalProperties === false) {
        errors.push(`unknown field: "${key}"`);
      }
      continue;
    }

    const propSchema = props[key];

    if (propSchema.type === 'boolean' && typeof value !== 'boolean') {
      errors.push(`"${key}" must be boolean, got ${typeof value}`);
    }

    if (propSchema.type === 'string') {
      if (typeof value !== 'string') {
        errors.push(`"${key}" must be string, got ${typeof value}`);
      } else {
        if (propSchema.minLength && value.length < propSchema.minLength) {
          errors.push(`"${key}" is too short (min ${propSchema.minLength} chars)`);
        }
        if (propSchema.pattern && !new RegExp(propSchema.pattern).test(value)) {
          errors.push(`"${key}" does not match pattern ${propSchema.pattern}`);
        }
      }
    }
  }

  // name must match directory name
  if (frontmatter.name && frontmatter.name !== skillName) {
    errors.push(`"name" is "${frontmatter.name}" but directory is "${skillName}"`);
  }

  return errors;
}

// --- Main ---

const skills = readdirSync(skillsDir).filter(entry =>
  statSync(join(skillsDir, entry)).isDirectory()
);

let totalErrors = 0;
const results = [];

for (const skillName of skills.sort()) {
  const skillFile = join(skillsDir, skillName, 'SKILL.md');
  let content;
  try {
    content = readFileSync(skillFile, 'utf8');
  } catch {
    results.push({ skillName, errors: ['SKILL.md not found'] });
    totalErrors++;
    continue;
  }

  const frontmatter = parseFrontmatter(content);
  if (!frontmatter) {
    results.push({ skillName, errors: ['no frontmatter block found'] });
    totalErrors++;
    continue;
  }

  const errors = validate(frontmatter, skillName);
  results.push({ skillName, errors });
  totalErrors += errors.length;
}

// Output
for (const { skillName, errors } of results) {
  if (errors.length === 0) {
    console.log(`  OK   ${skillName}`);
  } else {
    console.log(`  FAIL ${skillName}`);
    for (const err of errors) {
      console.log(`       - ${err}`);
    }
  }
}

console.log('');

if (totalErrors > 0) {
  console.error(`${totalErrors} error(s) found across ${results.filter(r => r.errors.length > 0).length} skill(s).`);
  process.exit(1);
} else {
  console.log(`All ${results.length} skills valid.`);
}
