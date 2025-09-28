<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container-responsive py-8">
      <!-- 页面标题 -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">
            我的收藏
          </h1>
          <p class="text-gray-600">
            共收藏了 {{ userStore.favoritesCount }} 部电影
          </p>
        </div>

        <!-- 清空收藏按钮 -->
        <el-button
          v-if="userStore.favoritesCount > 0"
          type="danger"
          :icon="Delete"
          @click="handleClearAll"
        >
          清空收藏
        </el-button>
      </div>

      <!-- 空状态 -->
      <div
        v-if="userStore.favoritesCount === 0"
        class="text-center py-16"
      >
        <el-icon size="80" class="text-gray-300 mb-4">
          <StarFilled />
        </el-icon>
        <h3 class="text-xl font-medium text-gray-500 mb-2">
          还没有收藏的电影
        </h3>
        <p class="text-gray-400 mb-6">
          去首页发现更多精彩电影吧
        </p>
        <el-button
          type="primary"
          size="large"
          @click="$router.push('/')"
        >
          去首页看看
        </el-button>
      </div>

      <!-- 收藏列表 -->
      <div
        v-else
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
      >
        <div
          v-for="movie in userStore.favorites"
          :key="movie.id"
          class="movie-card group cursor-pointer relative"
          @click="goToMovie(movie.id)"
        >
          <!-- 海报图片 -->
          <div class="relative overflow-hidden rounded-t-lg">
            <img
              v-if="movie.poster_path"
              :src="getImageUrl(movie.poster_path, 'poster', 'medium')"
              :alt="movie.title"
              class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
            />
            <div
              v-else
              class="w-full h-64 bg-gray-200 flex items-center justify-center"
            >
              <el-icon size="48" class="text-gray-400">
                <Picture />
              </el-icon>
            </div>

            <!-- 评分标签 -->
            <div
              v-if="movie.vote_average"
              class="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm font-medium"
            >
              ⭐ {{ formatRating(movie.vote_average) }}
            </div>

            <!-- 移除收藏按钮 -->
            <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <el-button
                type="danger"
                :icon="Delete"
                circle
                size="small"
                @click.stop="handleRemoveFavorite(movie)"
              />
            </div>
          </div>

          <!-- 电影信息 -->
          <div class="p-4 bg-white rounded-b-lg">
            <h3
              class="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors"
              :title="movie.title"
            >
              {{ movie.title }}
            </h3>

            <p class="text-gray-600 text-sm mb-2">
              {{ formatDate(movie.release_date) }}
            </p>

            <p class="text-gray-500 text-xs">
              收藏于 {{ formatDate(movie.addedAt) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { Delete, StarFilled, Picture } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/modules/user'
import { getImageUrl, formatDate, formatRating } from '@/utils/helpers'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()

// 方法
const goToMovie = (movieId) => {
  router.push({ name: 'MovieDetail', params: { id: movieId } })
}

const handleRemoveFavorite = async (movie) => {
  try {
    await ElMessageBox.confirm(
      `确定要从收藏中移除《${movie.title}》吗？`,
      '确认移除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )

    userStore.removeFromFavorites(movie.id)
    ElMessage.success('已从收藏中移除')
  } catch {
    // 用户取消操作
  }
}

const handleClearAll = async () => {
  try {
    await ElMessageBox.confirm(
      `确定要清空所有收藏吗？此操作不可恢复。`,
      '确认清空',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )

    userStore.favorites.splice(0)
    userStore.syncToStorage('favorites')
    ElMessage.success('已清空所有收藏')
  } catch {
    // 用户取消操作
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>