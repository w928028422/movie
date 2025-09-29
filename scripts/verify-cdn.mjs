#!/usr/bin/env node

/**
 * CDN 链接验证脚本
 * 验证所有 CDN 链接是否可用
 */

import fetch from 'node-fetch'

const CDN_LINKS = [
  'https://cdnjs.cloudflare.com/ajax/libs/vue/3.4.15/vue.global.prod.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/vue-router/4.2.5/vue-router.global.prod.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pinia/2.1.7/pinia.iife.prod.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/axios/1.6.5/axios.min.js'
]

// 备用链接
const FALLBACK_LINKS = [
  'https://unpkg.com/vue@3.4.15/dist/vue.global.prod.js',
  'https://unpkg.com/vue-router@4.2.5/dist/vue-router.global.prod.js',
  'https://unpkg.com/pinia@2.1.7/dist/pinia.iife.prod.js',
  'https://unpkg.com/axios@1.6.5/dist/axios.min.js'
]

async function verifyLink(url) {
  try {
    console.log(`🔍 检查: ${url}`)
    const response = await fetch(url, { method: 'HEAD' })

    if (response.ok) {
      console.log(`✅ 成功: ${url} (${response.status})`)
      return true
    } else {
      console.log(`❌ 失败: ${url} (${response.status})`)
      return false
    }
  } catch (error) {
    console.log(`❌ 错误: ${url} - ${error.message}`)
    return false
  }
}

async function main() {
  console.log('🚀 开始验证 CDN 链接...\n')

  console.log('📦 主要 CDN 链接 (Cloudflare):')
  for (const link of CDN_LINKS) {
    await verifyLink(link)
  }

  console.log('\n📦 备用 CDN 链接 (UNPKG):')
  for (const link of FALLBACK_LINKS) {
    await verifyLink(link)
  }

  console.log('\n✨ CDN 链接验证完成！')
}

// 如果直接运行此脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error)
}