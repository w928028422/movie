<template>
  <div class="min-h-screen bg-gray-50">
    <div v-if="loading" class="container-responsive py-8">
      <Loading text="正在加载电影详情..." />
    </div>

    <div v-else-if="movie" class="movie-detail">
      <!-- 背景图片 -->
      <div
        v-if="movie.backdrop_path"
        class="hero-backdrop relative h-96 bg-cover bg-center"
        :style="{
          backgroundImage: `url(${getImageUrl(movie.backdrop_path, 'backdrop', 'large')})`
        }"
      >
        <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      <!-- 电影详情内容 -->
      <div class="container-responsive py-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- 海报 -->
          <div class="lg:col-span-1">
            <div class="sticky top-20">
              <img
                v-if="movie.poster_path"
                :src="getImageUrl(movie.poster_path, 'poster', 'large')"
                :alt="movie.title"
                class="w-full rounded-lg shadow-lg"
              />
              <div
                v-else
                class="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center"
              >
                <el-icon size="80" class="text-gray-400">
                  <Picture />
                </el-icon>
              </div>

              <!-- 操作按钮 -->
              <div class="mt-6 space-y-3">
                <el-button
                  type="primary"
                  size="large"
                  class="w-full"
                  :icon="userStore.isFavorite(movie.id) ? StarFilled : Star"
                  @click="toggleFavorite"
                >
                  {{ userStore.isFavorite(movie.id) ? '已收藏' : '加入收藏' }}
                </el-button>

                <el-button
                  size="large"
                  class="w-full"
                  :icon="userStore.isInWatchList(movie.id) ? Check : Plus"
                  @click="toggleWatchList"
                >
                  {{ userStore.isInWatchList(movie.id) ? '已添加' : '想看' }}
                </el-button>
              </div>
            </div>
          </div>

          <!-- 详情信息 -->
          <div class="lg:col-span-2">
            <!-- 标题和基本信息 -->
            <div class="mb-8">
              <h1 class="text-4xl font-bold text-gray-800 mb-4">
                {{ movie.title }}
                <span v-if="movie.release_date" class="text-gray-500">
                  ({{ new Date(movie.release_date).getFullYear() }})
                </span>
              </h1>

              <div class="flex flex-wrap items-center gap-4 mb-4">
                <div class="flex items-center">
                  <span class="text-2xl mr-2">⭐</span>
                  <span class="text-xl font-semibold">
                    {{ formatRating(movie.vote_average) }}
                  </span>
                  <span class="text-gray-500 ml-1">
                    ({{ movie.vote_count }} 评价)
                  </span>
                </div>

                <div v-if="movie.runtime" class="text-gray-600">
                  ⏱️ {{ formatRuntime(movie.runtime) }}
                </div>

                <div v-if="movie.release_date" class="text-gray-600">
                  📅 {{ formatDate(movie.release_date) }}
                </div>
              </div>

              <!-- 类型标签 -->
              <div v-if="movie.genres" class="flex flex-wrap gap-2 mb-6">
                <el-tag
                  v-for="genre in movie.genres"
                  :key="genre.id"
                  size="large"
                  effect="plain"
                >
                  {{ genre.name }}
                </el-tag>
              </div>

              <!-- 简介 -->
              <div v-if="movie.overview" class="mb-8">
                <h2 class="text-xl font-semibold text-gray-800 mb-3">剧情简介</h2>
                <p class="text-gray-700 leading-relaxed">{{ movie.overview }}</p>
              </div>
            </div>

            <!-- 演员阵容 -->
            <div v-if="movie.credits?.cast?.length" class="mb-8">
              <h2 class="text-xl font-semibold text-gray-800 mb-4">主要演员</h2>
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <div
                  v-for="actor in movie.credits.cast.slice(0, 8)"
                  :key="actor.id"
                  class="text-center"
                >
                  <img
                    v-if="actor.profile_path"
                    :src="getImageUrl(actor.profile_path, 'profile', 'medium')"
                    :alt="actor.name"
                    class="w-full h-32 object-cover rounded-lg mb-2"
                  />
                  <div
                    v-else
                    class="w-full h-32 bg-gray-200 rounded-lg mb-2 flex items-center justify-center"
                  >
                    <el-icon size="32" class="text-gray-400">
                      <User />
                    </el-icon>
                  </div>
                  <div class="text-sm font-medium text-gray-800">{{ actor.name }}</div>
                  <div class="text-xs text-gray-500">{{ actor.character }}</div>
                </div>
              </div>
            </div>

            <!-- 相似电影推荐 -->
            <div v-if="movie.similar?.results?.length" class="mb-8">
              <h2 class="text-xl font-semibold text-gray-800 mb-4">相似电影</h2>
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <div
                  v-for="similarMovie in movie.similar.results.slice(0, 8)"
                  :key="similarMovie.id"
                  class="cursor-pointer group"
                  @click="goToMovie(similarMovie.id)"
                >
                  <img
                    v-if="similarMovie.poster_path"
                    :src="getImageUrl(similarMovie.poster_path, 'poster', 'medium')"
                    :alt="similarMovie.title"
                    class="w-full h-40 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <div
                    v-else
                    class="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center"
                  >
                    <el-icon size="32" class="text-gray-400">
                      <Picture />
                    </el-icon>
                  </div>
                  <div class="mt-2 text-sm font-medium text-gray-800 line-clamp-2">
                    {{ similarMovie.title }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 错误状态 -->
    <div v-else class="container-responsive py-16 text-center">
      <el-icon size="80" class="text-gray-300 mb-4">
        <Warning />
      </el-icon>
      <h2 class="text-2xl font-semibold text-gray-600 mb-4">电影未找到</h2>
      <p class="text-gray-500 mb-6">抱歉，该电影信息不存在或已被移除。</p>
      <el-button type="primary" @click="$router.push('/')">
        返回首页
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Picture,
  User,
  Star,
  StarFilled,
  Plus,
  Check,
  Warning
} from '@element-plus/icons-vue'
import { useMovieStore } from '@/store/modules/movie'
import { useUserStore } from '@/store/modules/user'
import Loading from '@/components/common/Loading.vue'
import { getImageUrl, formatDate, formatRating, formatRuntime } from '@/utils/helpers'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const movieStore = useMovieStore()
const userStore = useUserStore()

// 响应式数据
const loading = ref(false)

// 计算属性
const movie = computed(() => movieStore.currentMovie)
const movieId = computed(() => Number(route.params.id))

// 方法
const loadMovieDetail = async (id) => {
  loading.value = true
  try {
    await movieStore.fetchMovieDetail(id)
  } catch (error) {
    console.error('加载电影详情失败:', error)
  } finally {
    loading.value = false
  }
}

const toggleFavorite = () => {
  userStore.toggleFavorite(movie.value)
  ElMessage({
    message: userStore.isFavorite(movie.value.id) ? '已添加到收藏' : '已从收藏中移除',
    type: 'success',
    duration: 2000
  })
}

const toggleWatchList = () => {
  userStore.toggleWatchList(movie.value)
  ElMessage({
    message: userStore.isInWatchList(movie.value.id) ? '已添加到想看列表' : '已从想看列表中移除',
    type: 'success',
    duration: 2000
  })
}

const goToMovie = (id) => {
  if (id !== movieId.value) {
    router.push({ name: 'MovieDetail', params: { id } })
  }
}

// 监听路由参数变化
watch(() => route.params.id, (newId) => {
  if (newId) {
    loadMovieDetail(Number(newId))
  }
})

// 生命周期
onMounted(() => {
  if (movieId.value) {
    loadMovieDetail(movieId.value)
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.hero-backdrop {
  margin-top: -64px;
  padding-top: 64px;
}
</style>