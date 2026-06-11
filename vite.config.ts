import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/floating-emoji-system/',
  plugins: [vue()],
  server: {
    port: 3000,
    open: true
  }
})
