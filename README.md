# 🎬 电影资讯网站

基于TMDB API构建的现代化电影信息网站，提供最新、最全面的电影资讯。

## ✨ 功能特性

- 🔥 **热门电影** - 实时展示当前最受欢迎的电影
- 🎬 **正在热映** - 当前正在上映的电影列表
- 📅 **即将上映** - 即将发布的电影预告
- ⭐ **高分推荐** - 基于评分的优质电影推荐
- 🔍 **智能搜索** - 快速搜索电影信息
- 🎭 **分类浏览** - 按类型、年份、评分筛选
- 💾 **收藏功能** - 收藏喜爱的电影
- 📱 **响应式设计** - 完美适配各种设备

## 🛠️ 技术栈

- **前端框架**: Vue 3 + Composition API
- **构建工具**: Vite
- **状态管理**: Pinia
- **路由管理**: Vue Router 4
- **UI组件**: Element Plus
- **样式框架**: Tailwind CSS
- **HTTP客户端**: Axios
- **数据来源**: TMDB API

## 🚀 在线预览

[https://yourusername.github.io/movie/](https://yourusername.github.io/movie/)

## 📦 安装运行

### 环境要求
- Node.js 16+
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 环境配置
创建 `.env` 文件并配置TMDB API密钥：
```env
VITE_API_READ_ACCESS_TOKEN=your_tmdb_access_token
```

### 开发运行
```bash
npm run dev
```

### 生产构建
```bash
npm run build
```

## 🏗️ 项目结构

```
src/
├── api/                 # API接口
├── assets/             # 静态资源
├── components/         # 公共组件
│   ├── common/        # 通用组件
│   └── movie/         # 电影相关组件
├── router/            # 路由配置
├── store/             # 状态管理
├── utils/             # 工具函数
└── views/             # 页面组件
```

## 🎨 设计特色

- **现代化界面** - 采用深色/浅色对比设计
- **流畅动画** - 精心设计的过渡效果
- **直观操作** - 用户友好的交互体验
- **专业配色** - 参考Netflix、TMDB等主流平台

## 📄 许可证

本项目仅用于学习和展示目的，所有电影数据来源于TMDB API。

## 🙏 致谢

- [TMDB](https://www.themoviedb.org/) - 提供丰富的电影数据
- [Vue.js](https://vuejs.org/) - 优秀的前端框架
- [Element Plus](https://element-plus.org/) - 完善的UI组件库
