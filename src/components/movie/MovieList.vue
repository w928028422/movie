<template>
  <div class="movie-list">
    <!-- 列表标题 -->
    <div v-if="title" class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-800">{{ title }}</h2>
      <router-link
        v-if="viewAllLink"
        :to="viewAllLink"
        class="text-primary-600 hover:text-primary-700 font-medium"
      >
        查看全部 →
      </router-link>
    </div>

    <!-- 加载状态 -->
    <Loading v-if="loading" :text="loadingText" />

    <!-- 空状态 -->
    <div
      v-else-if="!movies || movies.length === 0"
      class="text-center py-12"
    >
      <el-icon size="64" class="text-gray-300 mb-4">
        <Film />
      </el-icon>
      <p class="text-gray-500 text-lg">{{ emptyText }}</p>
    </div>

    <!-- 电影列表 -->
    <div
      v-else
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
    >
      <MovieCard
        v-for="movie in displayMovies"
        :key="movie.id"
        :movie="movie"
      />
    </div>

    <!-- 加载更多按钮 -->
    <div
      v-if="showLoadMore && hasMore"
      class="text-center mt-8"
    >
      <el-button
        type="primary"
        size="large"
        :loading="loadingMore"
        @click="$emit('loadMore')"
      >
        {{ loadingMore ? '加载中...' : '加载更多' }}
      </el-button>
    </div>

    <!-- 分页 -->
    <div
      v-if="showPagination && totalPages > 1"
      class="flex justify-center mt-8"
    >
      <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        :page-count="totalPages"
        layout="prev, pager, next, jumper"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Film } from '@element-plus/icons-vue'
import MovieCard from './MovieCard.vue'
import Loading from '@/components/common/Loading.vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  movies: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  loadingText: {
    type: String,
    default: '加载中...'
  },
  emptyText: {
    type: String,
    default: '暂无电影数据'
  },
  viewAllLink: {
    type: [String, Object],
    default: null
  },
  showLoadMore: {
    type: Boolean,
    default: false
  },
  loadingMore: {
    type: Boolean,
    default: false
  },
  hasMore: {
    type: Boolean,
    default: false
  },
  showPagination: {
    type: Boolean,
    default: false
  },
  currentPage: {
    type: Number,
    default: 1
  },
  totalPages: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 20
  },
  limit: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['loadMore', 'pageChange'])

// 计算属性
const displayMovies = computed(() => {
  if (props.limit > 0) {
    return props.movies.slice(0, props.limit)
  }
  return props.movies
})

const total = computed(() => {
  return props.totalPages * props.pageSize
})

// 方法
const handlePageChange = (page) => {
  emit('pageChange', page)
}
</script>