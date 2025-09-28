<template>
  <div class="min-h-screen bg-slate-50">
    <div class="container-responsive py-8">
      <!-- 搜索结果标题 -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-slate-800 mb-2">
          搜索结果
        </h1>
        <p v-if="searchQuery" class="text-slate-600">
          关键词: 「{{ searchQuery }}」
          <span v-if="totalResults > 0">
            - 共找到 {{ totalResults }} 个结果
          </span>
        </p>
      </div>

      <!-- 搜索结果 -->
      <MovieList
        :movies="movieStore.searchResults"
        :loading="movieStore.isLoading('search')"
        :show-pagination="true"
        :current-page="currentPage"
        :total-pages="movieStore.pagination.search.totalPages"
        :empty-text="searchQuery ? `未找到包含「${searchQuery}」的电影` : '请输入搜索关键词'"
        @page-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMovieStore } from '@/store/modules/movie'
import MovieList from '@/components/movie/MovieList.vue'

const route = useRoute()
const router = useRouter()
const movieStore = useMovieStore()

const currentPage = ref(1)

// 计算属性
const searchQuery = computed(() => route.query.q || '')
const totalResults = computed(() => {
  return movieStore.searchResults.length
})

// 方法
const handleSearch = async (page = 1) => {
  if (!searchQuery.value.trim()) return

  try {
    await movieStore.searchMovies(searchQuery.value, page)
    currentPage.value = page
  } catch (error) {
    console.error('搜索失败:', error)
  }
}

const handlePageChange = (page) => {
  handleSearch(page)
  // 滚动到顶部
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 监听搜索参数变化
watch(() => route.query.q, (newQuery) => {
  if (newQuery) {
    currentPage.value = 1
    handleSearch()
  } else {
    movieStore.clearSearchResults()
  }
}, { immediate: true })

// 生命周期
onMounted(() => {
  if (searchQuery.value) {
    handleSearch()
  }
})
</script>