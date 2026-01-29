import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';

export default defineConfig({
  plugins: [
    vue(),
    process.env.VITE_VISUALIZE === 'true' && visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    })
  ].filter(Boolean),
  server: {
    port: 3000,
    host: '0.0.0.0',
    historyApiFallback: true
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        entryFileNames: '[name].[hash].js',
        chunkFileNames: '[name].[hash].js',
        assetFileNames: '[name].[hash][extname]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './components'),
      '@wslyhbb/vue3-tags-input': path.resolve(__dirname, '../vue-tags-input/vue-tags-input.vue'),
      '@tag-input': path.resolve(__dirname, '../vue-tags-input/tag-input.vue'),
      'colors': path.resolve(__dirname, './colors.scss'),
      'vue': '@vue/runtime-dom',
    }
  }
})
