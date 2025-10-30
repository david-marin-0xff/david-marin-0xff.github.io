import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  publicDir: 'src/assets',   // <- copy src/assets into dist as-is
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
});
