import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Handle SPA routing - redirect all requests to index.html
    historyApiFallback: true,
  },
})