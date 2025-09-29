import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'

// CDN配置
const CDN_CONFIG = {
  // Cloudflare CDN (推荐 - 全球最快)
  cloudflare: {
    vue: 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.4.15/vue.global.prod.min.js',
    'vue-router': 'https://cdnjs.cloudflare.com/ajax/libs/vue-router/4.2.5/vue-router.global.prod.min.js',
    pinia: 'https://cdnjs.cloudflare.com/ajax/libs/pinia/2.1.7/pinia.iife.prod.min.js',
    axios: 'https://cdnjs.cloudflare.com/ajax/libs/axios/1.6.5/axios.min.js'
  },

  // JSDelivr CDN (备选)
  jsdelivr: {
    vue: 'https://cdn.jsdelivr.net/npm/vue@3.4.15/dist/vue.global.prod.js',
    'vue-router': 'https://cdn.jsdelivr.net/npm/vue-router@4.2.5/dist/vue-router.global.prod.js',
    pinia: 'https://cdn.jsdelivr.net/npm/pinia@2.1.7/dist/pinia.iife.prod.js',
    axios: 'https://cdn.jsdelivr.net/npm/axios@1.6.5/dist/axios.min.js'
  },

  // UNPKG CDN (备选)
  unpkg: {
    vue: 'https://unpkg.com/vue@3.4.15/dist/vue.global.prod.js',
    'vue-router': 'https://unpkg.com/vue-router@4.2.5/dist/vue-router.global.prod.js',
    pinia: 'https://unpkg.com/pinia@2.1.7/dist/pinia.iife.prod.js',
    axios: 'https://unpkg.com/axios@1.6.5/dist/axios.min.js'
  }
}

// 生成CDN链接 - 默认使用Cloudflare
export function generateCDNLinks(provider = 'cloudflare') {
  const config = CDN_CONFIG[provider] || CDN_CONFIG.cloudflare

  return Object.entries(config).map(([name, url]) => ({
    name,
    url,
    // 添加预加载提示
    preload: true,
    // 添加完整性校验（可选）
    integrity: null
  }))
}

// 生成HTML script标签
export function generateCDNScripts(provider = 'cloudflare') {
  const links = generateCDNLinks(provider)

  return links.map(({ url, name }) => `
    <script src="${url}" crossorigin></script>
  `).join('')
}

// 生成preload链接
export function generatePreloadLinks(provider = 'cloudflare') {
  const links = generateCDNLinks(provider)

  return links.map(({ url, name }) => `
    <link rel="preload" href="${url}" as="script" crossorigin>
  `).join('')
}

export { CDN_CONFIG }