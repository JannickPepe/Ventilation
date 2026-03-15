import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'

const baseConfig = {
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          vueuse: ['@vueuse/core', '@vueuse/motion'],
          validation: ['vee-validate', '@vee-validate/zod', 'zod']
        }
      }
    }
  }
}

export default defineConfig(({ mode }) => {
  if (mode === 'analyze') {
    return {
      ...baseConfig,
      plugins: [
        ...baseConfig.plugins,
        visualizer({
          open: true,
          gzipSize: true,
          brotliSize: true,
          filename: 'dist/stats.html'
        })
      ]
    }
  }
  return baseConfig
})
