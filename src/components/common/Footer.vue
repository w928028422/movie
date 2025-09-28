<template>
  <footer class="bg-slate-900 text-white py-12 mt-16 border-t border-slate-700">
    <div class="container-responsive">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- 网站信息 -->
        <div class="col-span-1 md:col-span-2">
          <h3 class="text-xl font-bold mb-4 text-blue-400">🎬 电影资讯</h3>
          <p class="text-slate-300 mb-6 leading-relaxed">
            为您提供最新、最全面的电影信息，包括热门电影、即将上映、高分推荐等。
            基于TMDB API构建，数据实时更新。
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-slate-400 hover:text-blue-400 transition-colors p-2 bg-slate-800 rounded-lg hover:bg-slate-700">
              <el-icon size="20"><Share /></el-icon>
            </a>
            <a href="#" class="text-slate-400 hover:text-blue-400 transition-colors p-2 bg-slate-800 rounded-lg hover:bg-slate-700">
              <el-icon size="20"><ChatDotRound /></el-icon>
            </a>
            <a href="#" class="text-slate-400 hover:text-blue-400 transition-colors p-2 bg-slate-800 rounded-lg hover:bg-slate-700">
              <el-icon size="20"><Star /></el-icon>
            </a>
          </div>
        </div>

        <!-- 快速链接 -->
        <div>
          <h4 class="text-lg font-semibold mb-4 text-slate-200">快速链接</h4>
          <ul class="space-y-3">
            <li>
              <router-link to="/" class="text-slate-400 hover:text-blue-400 transition-colors flex items-center">
                <span class="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 opacity-60"></span>
                首页
              </router-link>
            </li>
            <li>
              <router-link to="/category" class="text-slate-400 hover:text-blue-400 transition-colors flex items-center">
                <span class="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 opacity-60"></span>
                电影分类
              </router-link>
            </li>
            <li>
              <router-link to="/favorites" class="text-slate-400 hover:text-blue-400 transition-colors flex items-center">
                <span class="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 opacity-60"></span>
                我的收藏
              </router-link>
            </li>
            <li>
              <router-link to="/about" class="text-slate-400 hover:text-blue-400 transition-colors flex items-center">
                <span class="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 opacity-60"></span>
                关于我们
              </router-link>
            </li>
          </ul>
        </div>

        <!-- 联系信息 -->
        <div>
          <h4 class="text-lg font-semibold mb-4 text-slate-200">数据来源</h4>
          <ul class="space-y-3 text-slate-400">
            <li class="flex items-center">
              <el-icon class="mr-3 text-blue-400"><Link /></el-icon>
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                class="hover:text-blue-400 transition-colors"
              >
                TMDB API
              </a>
            </li>
            <li class="flex items-center">
              <el-icon class="mr-3 text-green-400"><Document /></el-icon>
              <span>实时数据更新</span>
            </li>
            <li class="flex items-center">
              <el-icon class="mr-3 text-yellow-400"><Lock /></el-icon>
              <span>安全可靠</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- 底部版权 -->
      <div class="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
        <p>&copy; {{ currentYear }} 电影资讯. 所有数据来源于 TMDB API.</p>
        <p class="mt-2 text-sm">
          本网站仅用于展示电影信息，不提供任何下载服务。
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import {
  Share,
  ChatDotRound,
  Star,
  Link,
  Document,
  Lock
} from '@element-plus/icons-vue'

const currentYear = computed(() => new Date().getFullYear())
</script>