<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- 顶部导航 -->
    <Header />

    <!-- 主要内容 -->
    <main class="min-h-screen">
      <router-view />
    </main>

    <!-- 底部 -->
    <Footer />

    <!-- 全局错误提示 -->
    <div v-if="movieStore.error" class="fixed top-20 right-4 z-50">
      <el-alert
        :title="movieStore.error"
        type="error"
        show-icon
        closable
        @close="movieStore.clearError"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Header from '@/components/common/Header.vue'
import Footer from '@/components/common/Footer.vue'
import { useMovieStore } from '@/store/modules/movie'
import { useUserStore } from '@/store/modules/user'

const movieStore = useMovieStore()
const userStore = useUserStore()

// 应用初始化
onMounted(() => {
  // 从本地存储加载用户数据
  userStore.loadFromStorage()
})
</script>

<style>
#app {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 全局样式 */
html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  padding: 0;
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
