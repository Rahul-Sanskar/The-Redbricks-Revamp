import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(),

    // Generate pre-compressed .gz and .br files for all JS/CSS/HTML/SVG assets
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024,
      deleteOriginFile: false,
    }),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false,
    }),
  ],

  build: {
    rollupOptions: {
      output: {
        // Keep framer-motion and router-dom as separate cacheable chunks.
        // React is small enough (~6KB gz) to stay in the main bundle.
        manualChunks(id) {
          if (id.includes('framer-motion')) return 'motion-vendor'
          if (id.includes('react-router') || id.includes('@remix-run')) return 'router-vendor'
        },
      },
    },
    chunkSizeWarningLimit: 200,
  },
})
