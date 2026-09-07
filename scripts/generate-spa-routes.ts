/**
 * Post-build script: copy dist/index.html into dist/<variantId>/index.html
 * for every registered puzzle variant, so any static host can resolve
 * deep links like /classic, /killer, etc. to a real file on disk.
 *
 * React Router then handles the route client-side.
 *
 * Run automatically as part of `pnpm build`.
 */
import { copyFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { variantRegistry } from '../src/variants/registry';

const dist = resolve(process.cwd(), 'dist');
const src = resolve(dist, 'index.html');
let count = 0;

for (const id of Object.keys(variantRegistry)) {
  const dir = resolve(dist, id);
  mkdirSync(dir, { recursive: true });
  copyFileSync(src, resolve(dir, 'index.html'));
  count++;
}

console.log(`Generated ${count} per-route index.html files in dist/`);
