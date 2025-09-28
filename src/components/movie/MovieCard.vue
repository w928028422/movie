<template>
  <div class="movie-card group cursor-pointer" @click="handleClick">
    <!-- 海报图片 -->
    <div class="relative overflow-hidden rounded-t-lg">
      <img
        v-if="movie.poster_path"
        :src="posterUrl"
        :alt="movie.title"
        class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
        loading="lazy"
        @error="handleImageError"
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

      <!-- 收藏按钮 -->
      <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <el-button
          :type="userStore.isFavorite(movie.id) ? 'danger' : 'primary'"
          :icon="userStore.isFavorite(movie.id) ? StarFilled : Star"
          circle
          size="small"
          @click.stop="toggleFavorite"
        />
      </div>
    </div>

    <!-- 电影信息 -->
    <div class="p-4">
      <h3
        class="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors"
        :title="movie.title"
      >
        {{ movie.title }}
      </h3>

      <p class="text-gray-600 text-sm mb-2">
        {{ formatDate(movie.release_date) }}
      </p>

      <p
        v-if="movie.overview"
        class="text-gray-700 text-sm line-clamp-3"
        :title="movie.overview"
      >
        {{ truncateText(movie.overview, 100) }}
      </p>

      <!-- 类型标签 -->
      <div v-if="movie.genre_ids && movie.genre_ids.length > 0" class="mt-3">
        <div class="flex flex-wrap gap-1">
          <span
            v-for="genreId in movie.genre_ids.slice(0, 3)"
            :key="genreId"
            class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
          >
            {{ getGenreName(genreId) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Picture, Star, StarFilled } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/modules/user'
import { getImageUrl, formatDate, formatRating, truncateText } from '@/utils/helpers'
import { MOVIE_GENRES } from '@/utils/constants'
import { ElMessage } from 'element-plus'

const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const userStore = useUserStore()

// 计算属性
const posterUrl = computed(() => {
  return getImageUrl(props.movie.poster_path, 'poster', 'medium')
})

// 方法
const handleClick = () => {
  router.push({ name: 'MovieDetail', params: { id: props.movie.id } })
}

const handleImageError = (event) => {
  event.target.style.display = 'none'
  event.target.nextElementSibling?.classList.remove('hidden')
}

const toggleFavorite = () => {
  userStore.toggleFavorite(props.movie)
  ElMessage.success(
    userStore.isFavorite(props.movie.id) ? '已添加到收藏' : '已从收藏中移除'
  )
}

const getGenreName = (genreId) => {
  return MOVIE_GENRES[genreId] || '未知'
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>