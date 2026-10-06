import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Me line eka add karanna

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Me plugin eka list ekata danna
  ],
})