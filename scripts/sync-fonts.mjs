/**
 * Copies the self-hosted variable font files we actually ship (latin subset
 * only — ~178 KB total for 4 files) from node_modules into `public/fonts/`.
 *
 * Why self-hosted: no third-party font request, no render-blocking call to
 * fonts.gstatic.com, no consent/cookie implications, one less connection for
 * Core Web Vitals. Runs automatically on `npm install` (postinstall) and at
 * the start of `npm run build`.
 */
import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outDir = join(root, 'public', 'fonts');

const files = [
  [
    'node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
    'inter-latin-wght-normal.woff2',
  ],
  [
    'node_modules/@fontsource-variable/inter/files/inter-latin-wght-italic.woff2',
    'inter-latin-wght-italic.woff2',
  ],
  [
    'node_modules/@fontsource-variable/playfair-display/files/playfair-display-latin-wght-normal.woff2',
    'playfair-display-latin-wght-normal.woff2',
  ],
  [
    'node_modules/@fontsource-variable/playfair-display/files/playfair-display-latin-wght-italic.woff2',
    'playfair-display-latin-wght-italic.woff2',
  ],
];

await mkdir(outDir, { recursive: true });

let copied = 0;
for (const [from, to] of files) {
  const source = join(root, from);
  if (!existsSync(source)) {
    console.warn(`[fonts] missing ${from} — run \`npm install\` first.`);
    continue;
  }
  await copyFile(source, join(outDir, to));
  copied += 1;
}

// Keep the licence alongside the fonts (SIL Open Font License 1.1).
await writeFile(
  join(outDir, 'LICENSE.txt'),
  [
    'Inter — Copyright (c) 2016 The Inter Project Authors. SIL Open Font License 1.1.',
    'Playfair Display — Copyright (c) 2017 The Playfair Display Project Authors. SIL Open Font License 1.1.',
    '',
    'Both families are licensed under the SIL Open Font License, Version 1.1.',
    'Full licence text: https://openfontlicense.org',
    '',
  ].join('\n'),
  'utf8',
);

console.log(`[fonts] ${copied}/${files.length} font files synced to public/fonts`);
