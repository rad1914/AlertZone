// @path: vite.config.js
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
export default defineConfig({
  plugins: [sveltekit()],
  server: {
    host: '0.0.0.0',
    allowedHosts: ['.trycloudflare.com', '.vercel.app'],
    proxy: {
      '/api': {
        target: 'http://192.168.100.53:3001',
        changeOrigin: true
      }
    }
  }
})
