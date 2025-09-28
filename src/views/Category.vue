<template>
  <div class="min-h-screen bg-slate-50">
    <div class="container-responsive py-8">
      <!-- 页面标题 -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-slate-800 mb-2">
          电影分类
        </h1>
        <p class="text-slate-600">按类型和排序方式浏览电影</p>
      </div>

      <!-- 筛选器 -->
      <div class="bg-white rounded-xl shadow-sm p-6 mb-8 border border-slate-200">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- 类型选择 -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">
              电影类型
            </label>
            <el-select
              v-model="selectedGenre"
              placeholder="选择类型"
              class="w-full"
              @change="handleGenreChange"
            >
              <el-option
                label="全部类型"
                value=""
              />
              <el-option
                v-for="genre in genres"
                :key="genre.id"
                :label="genre.name"
                :value="genre.id"
              />
            </el-select>
          </div>

          <!-- 排序方式 -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">
              排序方式
            </label>
            <el-select
              v-model="sortBy"
              placeholder="选择排序"
              class="w-full"
              @change="handleSortChange"
            >
              <el-option label="热门程度" value="popular" />
              <el-option label="最新上映" value="latest" />
              <el-option label="即将上映" value="upcoming" />
              <el-option label="评分最高" value="top_rated" />
            </el-select>
          </div>

          <!-- 年份筛选 -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">
              上映年份
            </label>
            <el-select
              v-model="selectedYear"
              placeholder="选择年份"
              class="w-full"
              @change="handleYearChange"
            >
              <el-option label="全部年份" value="" />
              <el-option
                v-for="year in years"
                :key="year"
                :label="year"
                :value="year"
              />
            </el-select>
          </div>
        </div>
      </div>

      <!-- 电影列表 -->
      <MovieList
        :title="listTitle"
        :movies="currentMovies"
        :loading="isLoading"
        :show-pagination="true"
        :current-page="currentPage"
        :total-pages="totalPages"
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

// 响应式数据
const selectedGenre = ref('')
const sortBy = ref('popular')
const selectedYear = ref('')
const currentPage = ref(1)

// 类型数据
const genres = ref([
  { id: 28, name: '动作' },
  { id: 12, name: '冒险' },
  { id: 16, name: '动画' },
  { id: 35, name: '喜剧' },
  { id: 80, name: '犯罪' },
  { id: 99, name: '纪录片' },
  { id: 18, name: '剧情' },
  { id: 10751, name: '家庭' },
  { id: 14, name: '奇幻' },
  { id: 36, name: '历史' },
  { id: 27, name: '恐怖' },
  { id: 10402, name: '音乐' },
  { id: 9648, name: '悬疑' },
  { id: 10749, name: '爱情' },
  { id: 878, name: '科幻' },
  { id: 10770, name: '电视电影' },
  { id: 53, name: '惊悚' },
  { id: 10752, name: '战争' },
  { id: 37, name: '西部' }
])

// 年份数据
const years = computed(() => {
  const currentYear = new Date().getFullYear()
  const yearList = []
  for (let year = currentYear; year >= 1980; year--) {
    yearList.push(year)
  }
  return yearList
})

// 计算属性
const listTitle = computed(() => {
  const genreName = selectedGenre.value
    ? genres.value.find(g => g.id == selectedGenre.value)?.name
    : '全部'

  // 如果选择了特定类型，标题只显示类型
  if (selectedGenre.value) {
    return `${genreName}电影`
  }

  // 否则显示排序方式
  const sortName = {
    popular: '热门',
    latest: '最新',
    upcoming: '即将上映',
    top_rated: '高分'
  }[sortBy.value]

  return `${genreName} - ${sortName}电影`
})

const currentMovies = computed(() => {
  // 如果选择了年份或特定类型，显示筛选的结果
  if (selectedYear.value || selectedGenre.value) {
    return movieStore.genreMovies
  }

  // 否则根据排序方式显示对应的电影列表
  switch (sortBy.value) {
    case 'popular':
      return movieStore.popularMovies
    case 'latest':
      return movieStore.latestMovies
    case 'upcoming':
      return movieStore.upcomingMovies
    case 'top_rated':
      return movieStore.topRatedMovies
    default:
      return movieStore.popularMovies
  }
})

const isLoading = computed(() => {
  // 如果选择了年份或特定类型，检查筛选的加载状态
  if (selectedYear.value || selectedGenre.value) {
    return movieStore.isLoading('genreMovies')
  }

  // 否则检查对应排序方式的加载状态
  const loadingKey = {
    popular: 'popular',
    latest: 'latest',
    upcoming: 'upcoming',
    top_rated: 'topRated'
  }[sortBy.value]

  return movieStore.isLoading(loadingKey)
})

const totalPages = computed(() => {
  // 如果选择了年份或特定类型，使用筛选的分页信息
  if (selectedYear.value || selectedGenre.value) {
    return movieStore.pagination.genreMovies?.totalPages || 1
  }

  // 否则使用对应排序方式的分页信息
  return movieStore.pagination[
    sortBy.value === 'top_rated' ? 'topRated' : sortBy.value
  ]?.totalPages || 1
})

// 方法
const loadMovies = async (page = 1) => {
  currentPage.value = page

  try {
    // 如果选择了年份或类型，使用discover API
    if (selectedYear.value || selectedGenre.value) {
      const filters = {}

      if (selectedGenre.value) {
        filters.with_genres = selectedGenre.value
      }

      if (selectedYear.value) {
        filters.primary_release_year = selectedYear.value
      }

      // 如果同时选择了排序方式，添加排序参数
      if (sortBy.value && sortBy.value !== 'popular') {
        switch (sortBy.value) {
          case 'latest':
            filters.sort_by = 'release_date.desc'
            break
          case 'upcoming':
            filters.sort_by = 'release_date.asc'
            filters['release_date.gte'] = new Date().toISOString().split('T')[0]
            break
          case 'top_rated':
            filters.sort_by = 'vote_average.desc'
            filters['vote_count.gte'] = 100 // 确保有足够的投票数
            break
          default:
            filters.sort_by = 'popularity.desc'
        }
      } else {
        filters.sort_by = 'popularity.desc'
      }

      await movieStore.fetchDiscoverMovies(filters, page)
    } else {
      // 否则使用原有的分类API
      switch (sortBy.value) {
        case 'popular':
          await movieStore.fetchPopularMovies(page)
          break
        case 'latest':
          await movieStore.fetchLatestMovies(page)
          break
        case 'upcoming':
          await movieStore.fetchUpcomingMovies(page)
          break
        case 'top_rated':
          await movieStore.fetchTopRatedMovies(page)
          break
      }
    }
  } catch (error) {
    console.error('加载电影失败:', error)
  }
}

const handleGenreChange = () => {
  currentPage.value = 1
  updateUrl()
  loadMovies()
}

const handleSortChange = () => {
  currentPage.value = 1
  updateUrl()
  loadMovies()
}

const handleYearChange = () => {
  currentPage.value = 1
  updateUrl()
  loadMovies()
}

const handlePageChange = (page) => {
  loadMovies(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const updateUrl = () => {
  const query = {}
  if (selectedGenre.value) query.genre = selectedGenre.value
  if (sortBy.value !== 'popular') query.type = sortBy.value
  if (selectedYear.value) query.year = selectedYear.value

  router.replace({ query })
}

// 初始化参数
const initializeParams = () => {
  const genreParam = route.params.genre || route.query.genre || ''
  selectedGenre.value = genreParam ? Number(genreParam) : ''
  sortBy.value = route.query.type || 'popular'
  selectedYear.value = route.query.year || ''
  currentPage.value = Number(route.query.page) || 1
}

// 监听路由变化
watch(() => route.query, () => {
  initializeParams()
  loadMovies(currentPage.value)
})

// 生命周期
onMounted(() => {
  initializeParams()
  loadMovies(currentPage.value)
})
</script>