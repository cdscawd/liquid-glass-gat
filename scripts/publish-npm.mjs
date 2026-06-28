#!/usr/bin/env node
/**
 * Build and publish liquidglassui to npm (registry.npmjs.org).
 *
 * Usage:
 *   node scripts/publish-npm.mjs patch     # bump patch + publish
 *   node scripts/publish-npm.mjs minor     # bump minor + publish
 *   node scripts/publish-npm.mjs major     # bump major + publish
 *   node scripts/publish-npm.mjs none      # publish current version (no bump)
 *   node scripts/publish-npm.mjs dry-run   # build + npm publish --dry-run
 *
 * First-time setup (official npm, not npmmirror):
 *   npm login --registry=https://registry.npmjs.org/
 */

import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const NPM_REGISTRY = 'https://registry.npmjs.org/'
const bump = process.argv[2] ?? 'patch'
const allowed = new Set(['patch', 'minor', 'major', 'none', 'dry-run'])

if (!allowed.has(bump)) {
  console.error(`Invalid bump type "${bump}". Use: patch | minor | major | none | dry-run`)
  process.exit(1)
}

const publishArgs = `--registry=${NPM_REGISTRY} --access public`

function run(command) {
  execSync(command, { stdio: 'inherit' })
}

console.log(`Building library…`)
run('npm run build:lib')

if (bump === 'dry-run') {
  console.log(`Dry run — publishing to ${NPM_REGISTRY}`)
  run(`npm publish --dry-run ${publishArgs}`)
  process.exit(0)
}

if (bump !== 'none') {
  console.log(`Bumping ${bump} version (package.json only, no git tag)…`)
  run(`npm version ${bump} --no-git-tag-version`)
}

console.log(`Publishing to ${NPM_REGISTRY}…`)
try {
  run(`npm publish ${publishArgs}`)
} catch {
  console.error(
    '\nPublish failed. Common fixes:\n' +
      '  • ENEEDAUTH — npm login --registry=https://registry.npmjs.org/\n' +
      '  • E403 — name too similar to an existing package; use a scoped name e.g. @gatsby/liquidglassui\n' +
      '  • Global install mirror (npmmirror) is fine; publish uses registry.npmjs.org\n',
  )
  process.exit(1)
}

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))
console.log(`\nPublished ${pkg.name}@${pkg.version}`)
console.log('Remember to commit package.json and package-lock.json if version was bumped.')
