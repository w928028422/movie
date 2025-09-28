<template>
  <header class="bg-slate-900 border-b border-slate-700 sticky top-0 z-50 backdrop-blur-md">
    <nav class="container-responsive">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link
            to="/"
            class="text-2xl font-bold text-white hover:text-blue-400 transition-colors"
          >
            🎬 电影资讯
          </router-link>
        </div>

        <!-- 导航菜单 -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link
            to="/"
            class="nav-link"
            :class="{ 'nav-link-active': $route.name === 'Home' }"
          >
            首页
          </router-link>
          <router-link
            to="/category"
            class="nav-link"
            :class="{ 'nav-link-active': $route.name === 'Category' }"
          >
            分类
          </router-link>
          <router-link
            to="/favorites"
            class="nav-link"
            :class="{ 'nav-link-active': $route.name === 'Favorites' }"
          >
            收藏
          </router-link>
        </div>

        <!-- 搜索框 -->
        <div class="flex items-center space-x-4">
          <div class="relative hidden sm:block">
            <el-input
              v-model="searchQuery"
              placeholder="搜索电影..."
              class="w-64 search-input"
              @keyup.enter="handleSearch"
              @input="handleSearchInput"
            >
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>

            <!-- 搜索建议 -->
            <div
              v-if="showSuggestions && searchSuggestions.length > 0"
              class="absolute top-full left-0 right-0 bg-slate-800 shadow-lg rounded-b-md border border-slate-600 border-t-0 max-h-60 overflow-y-auto z-50"
            >
              <div
                v-for="suggestion in searchSuggestions"
                :key="suggestion"
                class="px-4 py-2 hover:bg-slate-700 cursor-pointer text-sm text-gray-300"
                @click="searchQuery = suggestion; handleSearch()"
              >
                {{ suggestion }}
              </div>
            </div>
          </div>

          <!-- 移动端搜索按钮 -->
          <el-button
            class="sm:hidden"
            type="primary"
            :icon="Search"
            circle
            @click="showMobileSearch = true"
          />

          <!-- 移动端菜单按钮 -->
          <el-button
            class="md:hidden"
            type="primary"
            :icon="Menu"
            circle
            @click="showMobileMenu = !showMobileMenu"
          />
        </div>
      </div>

      <!-- 移动端菜单 -->
      <div
        v-if="showMobileMenu"
        class="md:hidden border-t border-slate-700 py-4"
      >
        <div class="flex flex-col space-y-4">
          <router-link
            to="/"
            class="nav-link"
            @click="showMobileMenu = false"
          >
            首页
          </router-link>
          <router-link
            to="/category"
            class="nav-link"
            @click="showMobileMenu = false"
          >
            分类
          </router-link>
          <router-link
            to="/favorites"
            class="nav-link"
            @click="showMobileMenu = false"
          >
            收藏
          </router-link>
        </div>
      </div>
    </nav>

    <!-- 移动端搜索弹窗 -->
    <el-dialog
      v-model="showMobileSearch"
      title="搜索电影"
      width="90%"
      :show-close="true"
    >
      <el-input
        v-model="searchQuery"
        placeholder="搜索电影..."
        size="large"
        @keyup.enter="handleSearch(); showMobileSearch = false"
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
    </el-dialog>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { Search, Menu } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/modules/user'
import { debounce } from '@/utils/helpers'

const router = useRouter()
const userStore = useUserStore()

// 响应式数据
const searchQuery = ref('')
const showMobileMenu = ref(false)
const showMobileSearch = ref(false)
const showSuggestions = ref(false)

// 计算属性
const searchSuggestions = computed(() => {
  if (!searchQuery.value.trim()) return []
  return userStore.searchHistory.filter(item =>
    item.toLowerCase().includes(searchQuery.value.toLowerCase())
  ).slice(0, 5)
})

// 搜索处理
const handleSearch = () => {
  if (!searchQuery.value.trim()) return

  userStore.addSearchHistory(searchQuery.value)
  router.push({
    name: 'Search',
    query: { q: searchQuery.value }
  })
  showSuggestions.value = false
}

// 搜索输入处理
const handleSearchInput = debounce(() => {
  showSuggestions.value = searchQuery.value.length > 0
}, 300)

// 点击外部关闭建议
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    showSuggestions.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.nav-link {
  @apply text-gray-300 hover:text-blue-400 font-medium transition-colors duration-200;
}

.nav-link-active {
  @apply text-blue-400;
}

:deep(.search-input .el-input__wrapper) {
  background-color: rgb(30 41 59);
  border-color: rgb(71 85 105);
  box-shadow: 0 0 0 1px rgb(71 85 105) inset;
}

:deep(.search-input .el-input__wrapper:hover) {
  border-color: rgb(59 130 246);
  box-shadow: 0 0 0 1px rgb(59 130 246) inset;
}

:deep(.search-input .el-input__wrapper.is-focus) {
  border-color: rgb(59 130 246);
  box-shadow: 0 0 0 1px rgb(59 130 246) inset;
}

:deep(.search-input .el-input__inner) {
  color: rgb(226 232 240);
}

:deep(.search-input .el-input__inner::placeholder) {
  color: rgb(148 163 184);
}

:deep(.search-input .el-input__prefix-inner) {
  color: rgb(148 163 184);
}
</style>