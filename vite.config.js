import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,        // ← ini penting agar bisa diakses dari IP LAN
    port: 3000         // ganti port kalau mau (misal: 3000)
  }
})
