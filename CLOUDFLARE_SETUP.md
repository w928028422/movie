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