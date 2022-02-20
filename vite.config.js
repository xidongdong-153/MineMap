import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/MineMap',
  server: {
    hmr: { overlay: false },
    host: 'localhost',
    port: 3000,
    cors: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000'
      }
    }
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      path: "path-browserify",
    }
  },
  build: {
    outDir: 'docs'
  }
})
