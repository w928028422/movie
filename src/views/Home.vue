<template>
  <div class="home-page bg-slate-50 min-h-screen">
    <!-- 轮播图 >
    <section class="hero-section mb-12">
      <el-carousel
        :interval="5000"
        :loop="true"
        indicator-position="outside"
        height="400px"
        class="rounded-lg overflow-hidden"
      >
        <el-carousel-item
          v-for="(movie) in featuredMovies"
          :key="movie.id"
          class="relative cursor-pointer"
          @click="goToMovie(movie.id)"
        >
          <div
            class="carousel-slide w-full h-full bg-cover bg-center relative"
            :style="{
              backgroundImage: movie.backdrop_path
                ? `url(${getImageUrl(movie.backdrop_path, 'backdrop', 'large')})`
                : `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
            }"
          >

            <div
              v-if="!movie.backdrop_path"
              class="absolute inset-0 flex items-center justify-center"
            >
              <div class="text-center text-white">
                <div class="text-6xl mb-4">🎬</div>
                <h3 class="text-2xl font-bold">{{ movie.title }}</h3>
              </div>
            </div>


            <div class="absolute inset-0 bg-black bg-opacity-40" style="z-index: 2;"></div>


            <div class="absolute bottom-0 left-0 right-0 p-8 text-white" style="z-index: 3;">
              <div class="container-responsive">
                <h2 class="text-3xl md:text-4xl font-bold mb-2">{{ movie.title }}</h2>
                <p class="text-lg mb-4 line-clamp-2 max-w-2xl">{{ movie.overview }}</p>
                <div class="flex items-center space-x-4">
                  <span class="flex items-center">
                    ⭐ {{ formatRating(movie.vote_average) }}
                  </span>
                  <span>{{ formatDate(movie.release_date) }}</span>
                </div>
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </section -->

    <!-- 类型快速导航 -->
    <section class="mb-16 bg-white rounded-xl shadow-sm p-8 mx-4 lg:mx-8">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-slate-800 mb-2">浏览电影类型</h2>
        <p class="text-slate-600">发现你感兴趣的电影</p>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
        <div
          v-for="genre in popularGenres"
          :key="genre.id"
          class="genre-tag text-center py-3 px-4 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
          @click="goToGenre(genre.id)"
        >
          <div class="font-medium text-sm text-slate-700 hover:text-blue-600 transition-colors">
            {{ genre.name }}
          </div>
        </div>
      </div>

      <!-- 查看全部按钮 -->
      <div class="text-center mt-8">
        <button
          @click="$router.push({ name: 'Category' })"
          class="inline-flex items-center px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <span>查看全部分类</span>
          <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </section>
    <div class="container-responsive">
      <!-- 热门电影 -->
      <section class="mb-12">
        <MovieList
          title="🔥 热门电影"
          :movies="movieStore.popularMovies"
          :loading="movieStore.isLoading('popular')"
          :limit="12"
          :view-all-link="{ name: 'Category', query: { type: 'popular' } }"
          loading-text="正在加载热门电影..."
        />
      </section>

      <!-- 最新上映 -->
      <section class="mb-12">
        <MovieList
          title="🎬 正在热映"
          :movies="movieStore.latestMovies"
          :loading="movieStore.isLoading('latest')"
          :limit="12"
          :view-all-link="{ name: 'Category', query: { type: 'latest' } }"
          loading-text="正在加载最新电影..."
        />
      </section>

      <!-- 即将上映 -->
      <section class="mb-12">
        <MovieList
          title="📅 即将上映"
          :movies="movieStore.upcomingMovies"
          :loading="movieStore.isLoading('upcoming')"
          :limit="12"
          :view-all-link="{ name: 'Category', query: { type: 'upcoming' } }"
          loading-text="正在加载即将上映电影..."
        />
      </section>

      <!-- 高评分推荐 -->
      <section class="mb-12">
        <MovieList
          title="⭐ 高分推荐"
          :movies="movieStore.topRatedMovies"
          :loading="movieStore.isLoading('topRated')"
          :limit="12"
          :view-all-link="{ name: 'Category', query: { type: 'top_rated' } }"
          loading-text="正在加载高分电影..."
        />
      </section>


    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMovieStore } from '@/store/modules/movie'
import MovieList from '@/components/movie/MovieList.vue'
import { getImageUrl, formatDate, formatRating } from '@/utils/helpers'

const router = useRouter()
const movieStore = useMovieStore()

// 响应式数据
const popularGenres = ref([
  { id: 28, name: '动作' },
  { id: 35, name: '喜剧' },
  { id: 18, name: '剧情' },
  { id: 27, name: '恐怖' },
  { id: 878, name: '科幻' },
  { id: 10749, name: '爱情' },
  { id: 16, name: '动画' },
  { id: 53, name: '惊悚' },
  { id: 12, name: '冒险' },
  { id: 14, name: '奇幻' },
  { id: 80, name: '犯罪' },
  { id: 36, name: '历史' }
])

// 计算属性
const featuredMovies = computed(() => {
  // 从热门电影中选择有backdrop_path的电影作为轮播图
  const movies = movieStore.popularMovies
    .filter(movie => movie.backdrop_path)
    .slice(0, 5)

  console.log('Featured movies for carousel:', movies.map(m => ({
    id: m.id,
    title: m.title,
    backdrop_path: m.backdrop_path,
    imageUrl: getImageUrl(m.backdrop_path, 'backdrop', 'large')
  })))

  return movies
})

// 方法
const goToMovie = (movieId) => {
  router.push({ name: 'MovieDetail', params: { id: movieId } })
}

const goToGenre = (genreId) => {
  router.push({
    name: 'Category',
    params: { genre: genreId },
    query: { type: 'genre' }
  })
}

// 生命周期
onMounted(async () => {
  try {
    // 并行加载所有数据
    await Promise.all([
      movieStore.fetchPopularMovies(),
      movieStore.fetchLatestMovies(),
      movieStore.fetchUpcomingMovies(),
      movieStore.fetchTopRatedMovies()
    ])
  } catch (error) {
    console.error('加载首页数据失败:', error)
  }
})
</script>

<style scoped>
.hero-section {
  max-width: 100%;
  margin: 0 auto;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.genre-tag {
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid rgb(226 232 240);
  background: rgb(248 250 252);
}

.genre-tag:hover {
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
  transform: translateY(-1px);
  border-color: rgb(59 130 246);
  background: rgb(239 246 255);
}

.carousel-slide {
  min-height: 400px;
  background-size: cover !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
  position: relative;
  z-index: 1;
}

:deep(.el-carousel__item) {
  height: 400px;
}

:deep(.el-carousel__container) {
  height: 400px;
}

:deep(.el-carousel__indicator) {
  background-color: rgba(255, 255, 255, 0.5);
}

:deep(.el-carousel__indicator.is-active) {
  background-color: #3b82f6;
}
</style>