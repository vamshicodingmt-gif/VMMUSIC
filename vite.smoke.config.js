import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Used only by `npm run test:smoke`.
 *
 * It bundles the real client entry (`src/main.jsx` is not needed — the smoke
 * test imports `App` directly) into a single ESM file that Node can load so the
 * app can be hydrated inside jsdom against the prerendered HTML in `dist/`.
 */
export default defineConfig({
  plugins: [react()],
  publicDir: false,
  logLevel: 'warn',
  ssr: { noExternal: true },
  build: {
    ssr: '.vmmf-smoke/entry.jsx',
    outDir: 'node_modules/.cache/vmmf-smoke',
    emptyOutDir: true,
    minify: false,
    rollupOptions: {
      output: { entryFileNames: 'bundle.mjs' },
    },
  },
});
