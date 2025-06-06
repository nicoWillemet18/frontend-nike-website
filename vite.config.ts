import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    https: {
      key: "./localhost-key.pem",
      cert: "./localhost.pem",
    },
    host: true,
    strictPort: true,
    port: 5173,
  },
})





















