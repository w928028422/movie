<template>
  <div class="min-h-screen bg-gray-50 py-16">
    <div class="container-responsive">
      <div class="max-w-4xl mx-auto">
        <!-- 页面标题 -->
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-gray-800 mb-4">
            关于电影资讯
          </h1>
          <p class="text-xl text-gray-600">
            为您提供最新、最全面的电影信息
          </p>
        </div>

        <!-- 项目介绍 -->
        <div class="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">项目介绍</h2>
          <p class="text-gray-600 leading-relaxed mb-4">
            这是一个基于Vue3构建的现代化电影资讯网站。我们致力于为电影爱好者提供最新的电影信息、
            详细的电影介绍、精准的评分数据以及丰富的演员阵容信息。
          </p>
          <p class="text-gray-600 leading-relaxed">
            网站采用响应式设计，完美适配手机、平板和桌面设备，让您随时随地都能获得最佳的浏览体验。
          </p>
        </div>

        <!-- 主要功能 -->
        <div class="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">主要功能</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                  <el-icon class="text-white">
                    <Film />
                  </el-icon>
                </div>
              </div>
              <div>
                <h3 class="font-semibold text-gray-800 mb-2">电影浏览</h3>
                <p class="text-gray-600 text-sm">
                  浏览热门、最新、即将上映和高评分电影
                </p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                  <el-icon class="text-white">
                    <Search />
                  </el-icon>
                </div>
              </div>
              <div>
                <h3 class="font-semibold text-gray-800 mb-2">智能搜索</h3>
                <p class="text-gray-600 text-sm">
                  支持电影名称、演员、导演的智能搜索
                </p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                  <el-icon class="text-white">
                    <Star />
                  </el-icon>
                </div>
              </div>
              <div>
                <h3 class="font-semibold text-gray-800 mb-2">个人收藏</h3>
                <p class="text-gray-600 text-sm">
                  收藏喜欢的电影，建立个人观影清单
                </p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                  <el-icon class="text-white">
                    <Operation />
                  </el-icon>
                </div>
              </div>
              <div>
                <h3 class="font-semibold text-gray-800 mb-2">分类筛选</h3>
                <p class="text-gray-600 text-sm">
                  按类型、年份、评分等条件筛选电影
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- 技术栈 -->
        <div class="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">技术栈</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <div class="text-2xl mb-2">⚡</div>
              <div class="font-medium text-gray-800">Vue 3</div>
              <div class="text-sm text-gray-600">前端框架</div>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <div class="text-2xl mb-2">🎨</div>
              <div class="font-medium text-gray-800">Element Plus</div>
              <div class="text-sm text-gray-600">UI组件库</div>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <div class="text-2xl mb-2">🎯</div>
              <div class="font-medium text-gray-800">Tailwind CSS</div>
              <div class="text-sm text-gray-600">样式框架</div>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <div class="text-2xl mb-2">🚀</div>
              <div class="font-medium text-gray-800">Vite</div>
              <div class="text-sm text-gray-600">构建工具</div>
            </div>
          </div>
        </div>

        <!-- 数据来源 -->
        <div class="bg-white rounded-lg shadow-md p-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">数据来源</h2>
          <div class="flex items-center space-x-6">
            <div class="flex-shrink-0">
              <div class="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-lg">TMDB</span>
              </div>
            </div>
            <div>
              <h3 class="font-semibold text-gray-800 mb-2">
                The Movie Database (TMDB)
              </h3>
              <p class="text-gray-600 text-sm mb-2">
                全球最权威的电影数据库之一，提供丰富的电影信息、高质量的图片和准确的评分数据。
              </p>
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                class="text-primary-600 hover:text-primary-700 text-sm"
              >
                访问 TMDB 官网 →
              </a>
            </div>
          </div>
        </div>

        <!-- 版权信息 -->
        <div class="text-center mt-12 text-gray-500">
          <p>&copy; {{ currentYear }} 电影资讯. 本网站仅用于学习和展示目的。</p>
          <p class="mt-2 text-sm">
            所有电影数据来源于 TMDB API，版权归原电影公司所有。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Film, Search, Star, Operation } from '@element-plus/icons-vue'

const currentYear = computed(() => new Date().getFullYear())
</script>