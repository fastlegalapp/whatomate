import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core Vue ecosystem
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          // UI primitives
          'reka-ui': ['reka-ui'],
          // Charts (heavy)
          'charts': ['chart.js', 'vue-chartjs'],
          // Grid layout (heavy)
          'grid-layout': ['grid-layout-plus'],
          // Emoji picker (heavy)
          'emoji-picker': ['vue3-emoji-picker'],
          // Form validation
          'validation': ['vee-validate', '@vee-validate/zod', 'zod'],
          // Utilities
          'utils': ['@vueuse/core', 'axios', 'clsx', 'tailwind-merge', 'class-variance-authority']
        }
      }
    },
    // Increase chunk size warning limit (optional)
    chunkSizeWarningLimit: 500
  },
  // Drop console and debugger in production builds
  esbuild: {
    drop: ['console', 'debugger']
  },
  server: {
    port: 3000,
    allowedHosts: [],
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      },
      '/ws': {
        target: 'ws://localhost:8080',
        ws: true
      }
    }
  }
})
