import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Vite configuration — works for local dev, `vite preview` and Vercel.
 * The production build is a static bundle: `dist/` is fully prerendered HTML
 * + hashed JS/CSS, which is exactly what Vercel serves from its CDN.
 */
export default defineConfig({
  plugins: [react()],
  server: {
    // Bind to all interfaces so the sandbox/live-preview proxy can reach it.
    host: true,
    port: 5173,
    // The preview is served through a proxied host (e.g. *.e2b.app); allow any
    // host header so the preview never gets a "Blocked request" response.
    allowedHosts: true,
    strictPort: false,
  },
  preview: {
    host: true,
    port: 4173,
    allowedHosts: true,
    strictPort: false,
  },
  build: {
    target: 'es2020',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    // Small SVGs stay inline; everything else becomes a cached file.
    assetsInlineLimit: 2048,
    cssCodeSplit: false,
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        // Vite 8 / rolldown expects a function here. Splitting the React
        // runtime into its own chunk keeps `npm update`-style app changes from
        // busting the vendor cache (better repeat-visit Core Web Vitals).
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/scheduler')) {
            return 'react';
          }
          return undefined;
        },
      },
    },
  },
});
