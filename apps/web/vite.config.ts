import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/Opencut/',
  plugins: [
    tailwindcss(),
    viteReact(),
  ],
  resolve: {
    alias: {
      '#': resolve(__dirname, 'src'),
    },
  },
})
