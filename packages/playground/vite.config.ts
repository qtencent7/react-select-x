import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@react-select-x/core': resolve(__dirname, '../core/src/index.tsx'),
    },
  },
})
