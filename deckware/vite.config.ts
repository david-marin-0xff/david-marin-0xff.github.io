import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  root: '.', // points to your index.html
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
