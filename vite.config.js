import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    open: false,
    https: {
      key: fs.readFileSync('../data-steward-go/cert/client-key.pem'),
      cert: fs.readFileSync('../data-steward-go/cert/client-cert.pem'),
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    
  }
})
