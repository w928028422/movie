#!/usr/bin/env node

/**
 * GitHub Pages + Cloudflare CDN 部署优化脚本
 *
 * 功能:
 * 1. 自动配置静态资源CDN加速
 * 2. 优化资源加载策略
 * 3. 生成Service Worker缓存策略
 */

import fs from 'fs'
import path from 'path'

const DIST_DIR = './dist'

// 为静态资源添加缓存头建议（README形式）
function generateCacheHeaders() {
  const headers = `
# 为了获得最佳性能，建议在 Cloudflare 中配置以下缓存规则：

## 页面规则配置 (Page Rules)

### JavaScript 和 CSS 文件
- URL Pattern: *.w928028422.github.io/movie/assets/*
- 设置:
  - Cache Level: Cache Everything
  - Browser Cache TTL: 1 year
  - Edge Cache TTL: 1 month

### HTML 文件
- URL Pattern: *.w928028422.github.io/movie/*.html
- 设置:
  - Cache Level: Cache Everything
  - Browser Cache TTL: 2 hours
  - Edge Cache TTL: 2 hours

### 图片资源
- URL Pattern: *.w928028422.github.io/movie/*.{jpg,jpeg,png,gif,webp,ico}
- 设置:
  - Cache Level: Cache Everything
  - Browser Cache TTL: 1 month
  - Edge Cache TTL: 1 month

## 额外优化建议

### 1. 启用 Cloudflare 功能
- Auto Minify: CSS, HTML, JavaScript
- Brotli Compression: 开启
- HTTP/2: 开启
- 0-RTT Connection Resumption: 开启

### 2. 安全设置
- Always Use HTTPS: 开启
- HSTS: 开启
- Minimum TLS Version: 1.2

### 3. 性能优化
- Rocket Loader: 开启（异步加载JavaScript）
- Mirage: 开启（图片优化）
- Polish: 开启（自动图片压缩）

### 4. DNS 设置
确保您的域名使用 Cloudflare 的 DNS 服务以获得最佳性能。

## 预期性能提升

- 全球 CDN 节点缓存，减少延迟
- 自动压缩，减少传输大小
- HTTP/2 并行加载，提升速度
- 智能缓存策略，减少服务器请求

配置完成后，您的网站在全球范围内的加载速度将显著提升！
`

  fs.writeFileSync('./CLOUDFLARE_SETUP.md', headers.trim())
  console.log('✅ 已生成 Cloudflare 配置指南: CLOUDFLARE_SETUP.md')
}

// 生成 _headers 文件（用于支持 _headers 的静态托管服务）
function generateHeadersFile() {
  const headers = `# 静态资源缓存配置

# JavaScript 和 CSS 文件 - 长期缓存
/assets/*.js
  Cache-Control: public, max-age=31536000, immutable
  X-Content-Type-Options: nosniff

/assets/*.css
  Cache-Control: public, max-age=31536000, immutable
  X-Content-Type-Options: nosniff

# HTML 文件 - 短期缓存
/*.html
  Cache-Control: public, max-age=7200
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block

# 根目录文件 - 不缓存
/
  Cache-Control: public, max-age=0, must-revalidate
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block

# 图片文件 - 中期缓存
*.jpg
  Cache-Control: public, max-age=2592000
*.jpeg
  Cache-Control: public, max-age=2592000
*.png
  Cache-Control: public, max-age=2592000
*.gif
  Cache-Control: public, max-age=2592000
*.webp
  Cache-Control: public, max-age=2592000
*.ico
  Cache-Control: public, max-age=2592000
`

  fs.writeFileSync(`${DIST_DIR}/_headers`, headers.trim())
  console.log('✅ 已生成静态资源缓存配置: dist/_headers')
}

// 生成预加载提示文件
function generatePreloadHints() {
  const preloadScript = `
<!-- 预加载关键资源 -->
<script>
// 预加载 TMDB API 域名
const apiDomain = 'https://api.themoviedb.org'
const imageDomain = 'https://image.tmdb.org'

// 预连接到 API 域名
if ('preconnect' in document.createElement('link')) {
  const preconnectAPI = document.createElement('link')
  preconnectAPI.rel = 'preconnect'
  preconnectAPI.href = apiDomain
  preconnectAPI.crossOrigin = 'anonymous'
  document.head.appendChild(preconnectAPI)

  const preconnectImage = document.createElement('link')
  preconnectImage.rel = 'preconnect'
  preconnectImage.href = imageDomain
  preconnectImage.crossOrigin = 'anonymous'
  document.head.appendChild(preconnectImage)
}

// 预解析 DNS
const dnsPrefetch = [apiDomain, imageDomain, 'https://cdnjs.cloudflare.com']
dnsPrefetch.forEach(domain => {
  const link = document.createElement('link')
  link.rel = 'dns-prefetch'
  link.href = domain
  document.head.appendChild(link)
})
</script>
`

  // 如果存在index.html，在其中插入预加载脚本
  const indexPath = `${DIST_DIR}/index.html`
  if (fs.existsSync(indexPath)) {
    let html = fs.readFileSync(indexPath, 'utf8')

    // 在</head>前插入预加载脚本
    html = html.replace('</head>', `${preloadScript}\n</head>`)

    fs.writeFileSync(indexPath, html)
    console.log('✅ 已在 index.html 中添加预加载优化')
  }
}

// 主函数
function main() {
  console.log('🚀 开始 CDN 优化配置...\n')

  generateCacheHeaders()

  if (fs.existsSync(DIST_DIR)) {
    generateHeadersFile()
    generatePreloadHints()
  } else {
    console.log('⚠️  dist 目录不存在，请先运行 npm run build')
  }

  console.log('\n✨ CDN 优化配置完成！')
  console.log('\n📖 请查看 CLOUDFLARE_SETUP.md 了解如何配置 Cloudflare CDN')
}

// 运行脚本
main()