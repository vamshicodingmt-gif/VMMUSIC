import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Config for the *build-time only* server bundle that `scripts/prerender.mjs`
 * uses to turn every route into static HTML.
 *
 * It is deliberately separate from vite.config.js:
 *   • publicDir:false   → the static assets are already copied by the client
 *                         build into dist/, we don't want a second copy.
 *   • ssr entry         → dist/server/entry-server.js
 *   • minify:false      → readable stack traces if a page ever throws.
 */
export default defineConfig({
  plugins: [react()],
  publicDir: false,
  build: {
    ssr: 'src/entry-server.jsx',
    outDir: 'dist/server',
    emptyOutDir: true,
    minify: false,
    sourcemap: false,
    rollupOptions: {
      output: {
        entryFileNames: 'entry-server.js',
      },
    },
  },
});
