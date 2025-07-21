import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,             // écoute sur toutes les interfaces (utile pour accès depuis autre PC/mobile)
    port: 5173,             // tu peux choisir un autre port si nécessaire
    strictPort: true,       // ne change pas de port automatiquement
    cors: true,  
  }
})


