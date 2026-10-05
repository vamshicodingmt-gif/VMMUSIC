/**
 * ---------------------------------------------------------------------------
 * VERCEL OUTPUT-DIRECTORY SAFETY NET
 * ---------------------------------------------------------------------------
 * Why this exists
 * ---------------
 * A Vercel project created while the repository was still empty can be saved
 * with **Framework Preset: "Other"**, which makes Vercel publish the *repo
 * root* instead of `dist/`. The build then "succeeds" but the site shows a
 * blank page or `404: NOT_FOUND`, because the built files are in `dist/`.
 *
 * Dashboard settings can be stale and cannot be changed from a repository, so
 * this script removes the dependency on that setting entirely: during a Vercel
 * build only (`VERCEL=1`), it also copies the finished site to the paths Vercel
 * might be publishing. Whichever directory Vercel picks, the deployed site is
 * correct:
 *
 *   • Output Directory = dist   → the normal, intended configuration
 *   • Output Directory = (root) → the copy written here is served
 *   • Output Directory = public → the copy written here is served
 *
 * It NEVER runs on a local machine (`npm run build` on your computer leaves the
 * source tree untouched) and never deletes anything — it only adds files.
 */
import { cpSync, existsSync, readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, 'dist');

/** Only ever run inside Vercel's build container. */
if (process.env.VERCEL !== '1') {
  console.log('[vercel-fallback] skipped (not a Vercel build)');
  process.exit(0);
}

if (!existsSync(dist)) {
  console.warn('[vercel-fallback] dist/ not found — nothing to copy');
  process.exit(0);
}

/**
 * Copies the *contents* of dist/ into `target`. Copying contents (rather than
 * the dist folder itself) means root→root copying can never recurse into dist.
 * Files already present are overwritten with identical build output.
 */
function copyInto(target) {
  let copied = 0;

  for (const entry of readdirSync(dist)) {
    const from = join(dist, entry);
    const to = join(target, entry);

    // Never copy the build cache directories back into the project.
    if (entry === 'node_modules' || entry === '.vercel') continue;

    cpSync(from, to, { recursive: statSync(from).isDirectory(), force: true });
    copied += 1;
  }

  return copied;
}

const targets = [
  ['project root', root],
  ['public/', join(root, 'public')],
];

for (const [label, target] of targets) {
  if (!existsSync(target)) continue;
  const count = copyInto(target);
  console.log(`[vercel-fallback] copied ${count} item(s) into ${label}`);
}

console.log(
  '[vercel-fallback] done — the site will load even if Vercel\'s Output Directory is mis-set',
);
