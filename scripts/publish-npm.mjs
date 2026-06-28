#!/usr/bin/env node
/**
 * Build and publish liquidglassui to npm.
 *
 * Usage:
 *   node scripts/publish-npm.mjs patch     # bump patch + publish
 *   node scripts/publish-npm.mjs minor     # bump minor + publish
 *   node scripts/publish-npm.mjs major     # bump major + publish
 *   node scripts/publish-npm.mjs none      # publish current version (no bump)
 *   node scripts/publish-npm.mjs dry-run   # build + npm publish --dry-run
 */

import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const bump = process.argv[2] ?? 'patch'
const allowed = new Set(['patch', 'minor', 'major', 'none', 'dry-run'])

if (!allowed.has(bump)) {
  console.error(`Invalid bump type "${bump}". Use: patch | minor | major | none | dry-run`)
  process.exit(1)
}

function run(command) {
  execSync(command, { stdio: 'inherit' })
}

console.log('Building library…')
run('npm run build:lib')

if (bump === 'dry-run') {
  console.log('Dry run — package contents:')
  run('npm publish --dry-run --access public')
  process.exit(0)
}

if (bump !== 'none') {
  console.log(`Bumping ${bump} version…`)
  run(`npm version ${bump}`)
}

console.log('Publishing to npm…')
run('npm publish --access public')

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))
console.log(`\nPublished ${pkg.name}@${pkg.version}`)
