<template>
  <!-- 空状态 -->
  <div
    v-if="movies.length === 0"
    class="text-center py-16"
  >
    <el-icon size="80" class="text-slate-300 mb-4">
      <Picture />
    </el-icon>
    <h3 class="text-xl font-medium text-slate-500 mb-2">
      {{ emptyText }}
    </h3>
    <p class="text-slate-400 mb-6">
      {{ emptyDescription }}
    </p>
    <el-button
      type="primary"
      size="large"
      @click="$router.push('/')"
    >
      去首页看看
    </el-button>
  </div>

  <!-- 电影网格列表 -->
  <div
    v-else
    class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
  >
    <div
      v-for="movie in movies"
      :key="movie.id"
      class="movie-card group cursor-pointer relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
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
          class="w-full h-64 bg-slate-200 flex items-center justify-center"
        >
          <el-icon size="48" class="text-slate-400">
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

        <!-- 移除按钮 -->
        <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <el-button
            type="danger"
            :icon="Delete"
            circle
            size="small"
            @click.stop="$emit('remove', movie)"
          />
        </div>
      </div>

      <!-- 电影信息 -->
      <div class="p-4">
        <h3
          class="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors"
          :title="movie.title"
        >
          {{ movie.title }}
        </h3>

        <p class="text-slate-600 text-sm mb-2">
          {{ formatDate(movie.release_date) }}
        </p>

        <p class="text-slate-500 text-xs">
          {{ movie.addedAt ? `收藏于 ${formatDate(movie.addedAt)}` : '' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { Delete, Picture } from '@element-plus/icons-vue'
import { getImageUrl, formatDate, formatRating } from '@/utils/helpers'

const router = useRouter()

defineProps({
  movies: {
    type: Array,
    default: () => []
  },
  emptyText: {
    type: String,
    default: '暂无数据'
  },
  emptyDescription: {
    type: String,
    default: '请稍后再试'
  }
})

defineEmits(['remove'])

const goToMovie = (movieId) => {
  router.push({ name: 'MovieDetail', params: { id: movieId } })
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