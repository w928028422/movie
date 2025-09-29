import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { createHtmlPlugin } from 'vite-plugin-html'

// Element Plus 按需导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// CDN配置
const USE_CDN = process.env.NODE_ENV === 'production'

const CDN_LINKS = USE_CDN ? [
  // UNPKG CDN - 更可靠的公共CDN
  'https://unpkg.com/vue@3.4.15/dist/vue.global.prod.js',
  'https://unpkg.com/vue-router@4.2.5/dist/vue-router.global.prod.js',
  'https://unpkg.com/pinia@2.1.7/dist/pinia.iife.prod.js',
  'https://unpkg.com/axios@1.6.5/dist/axios.min.js'
] : []

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),

    // Element Plus 自动导入
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),

    // HTML插件 - 注入CDN链接
    createHtmlPlugin({
      inject: {
        data: {
          // CDN预加载链接
          cdnPreload: USE_CDN ? CDN_LINKS.map(url =>
            `<link rel="preload" href="${url}" as="script" crossorigin>`
          ).join('\n    ') : '',

          // CDN脚本链接
          cdnScripts: USE_CDN ? CDN_LINKS.map(url =>
            `<script src="${url}" crossorigin></script>`
          ).join('\n    ') : ''
        }
      }
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    // 代码分割优化
    rollupOptions: {
      // 外部化依赖，使用CDN
      external: USE_CDN ? [
        'vue',
        'vue-router',
        'pinia',
        'axios'
      ] : [],

      output: {
        // CDN全局变量映射
        globals: USE_CDN ? {
          'vue': 'Vue',
          'vue-router': 'VueRouter',
          'pinia': 'Pinia',
          'axios': 'axios'
        } : {},

        // 手动分包策略
        manualChunks: {
          // Element Plus UI 库
          'element-plus': ['element-plus'],
        },

        // 文件命名策略
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },

    // 压缩配置
    minify: 'terser',
    terserOptions: {
      compress: {
        // 移除console.log
        drop_console: true,
        // 移除debugger
        drop_debugger: true,
      }
    },

    // 设置chunk大小警告限制
    chunkSizeWarningLimit: 500
  },
  // GitHub Pages 配置
  base: process.env.NODE_ENV === 'production' ? '/movie/' : '/',
})
