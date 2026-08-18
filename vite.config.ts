import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // Inline every imported asset (including the two real photos) as a
    // base64 data URI directly in the JS bundle, regardless of size, so
    // viteSingleFile can fold everything into one standalone index.html
    // that works by double-clicking — no server required.
    assetsInlineLimit: 100_000_000,
    cssCodeSplit: false,
  },
})
