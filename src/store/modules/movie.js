import { defineStore } from 'pinia'
import {
  getPopularMovies,
  getLatestMovies,
  getUpcomingMovies,
  getTopRatedMovies,
  getMovieDetail,
  searchMovies,
  getGenres,
  getMoviesByGenre,
  discoverMovies
} from '@/api'

export const useMovieStore = defineStore('movie', {
  state: () => ({
    // 电影列表
    popularMovies: [],
    latestMovies: [],
    upcomingMovies: [],
    topRatedMovies: [],
    searchResults: [],
    genreMovies: [],

    // 电影详情
    currentMovie: null,

    // 类型列表
    genres: [],

    // 加载状态
    loading: {
      popular: false,
      latest: false,
      upcoming: false,
      topRated: false,
      search: false,
      detail: false,
      genres: false,
      genreMovies: false,
    },

    // 分页信息
    pagination: {
      popular: { page: 1, totalPages: 1 },
      latest: { page: 1, totalPages: 1 },
      upcoming: { page: 1, totalPages: 1 },
      topRated: { page: 1, totalPages: 1 },
      search: { page: 1, totalPages: 1 },
      genreMovies: { page: 1, totalPages: 1 },
    },

    // 错误信息
    error: null,
  }),

  getters: {
    // 获取指定类型的电影
    getMoviesByType: (state) => (type) => {
      return state[type] || []
    },

    // 检查是否正在加载
    isLoading: (state) => (type) => {
      return state.loading[type] || false
    },
  },

  actions: {
    // 设置加载状态
    setLoading(type, status) {
      this.loading[type] = status
    },

    // 设置错误信息
    setError(error) {
      this.error = error
    },

    // 获取热门电影
    async fetchPopularMovies(page = 1, append = false) {
      this.setLoading('popular', true)
      try {
        const response = await getPopularMovies(page)
        if (append) {
          this.popularMovies.push(...response.results)
        } else {
          this.popularMovies = response.results
        }
        this.pagination.popular = {
          page: response.page,
          totalPages: response.total_pages
        }
      } catch (error) {
        this.setError(error.message)
      } finally {
        this.setLoading('popular', false)
      }
    },

    // 获取最新电影
    async fetchLatestMovies(page = 1, append = false) {
      this.setLoading('latest', true)
      try {
        const response = await getLatestMovies(page)
        if (append) {
          this.latestMovies.push(...response.results)
        } else {
          this.latestMovies = response.results
        }
        this.pagination.latest = {
          page: response.page,
          totalPages: response.total_pages
        }
      } catch (error) {
        this.setError(error.message)
      } finally {
        this.setLoading('latest', false)
      }
    },

    // 获取即将上映电影
    async fetchUpcomingMovies(page = 1, append = false) {
      this.setLoading('upcoming', true)
      try {
        const response = await getUpcomingMovies(page)
        if (append) {
          this.upcomingMovies.push(...response.results)
        } else {
          this.upcomingMovies = response.results
        }
        this.pagination.upcoming = {
          page: response.page,
          totalPages: response.total_pages
        }
      } catch (error) {
        this.setError(error.message)
      } finally {
        this.setLoading('upcoming', false)
      }
    },

    // 获取高评分电影
    async fetchTopRatedMovies(page = 1, append = false) {
      this.setLoading('topRated', true)
      try {
        const response = await getTopRatedMovies(page)
        if (append) {
          this.topRatedMovies.push(...response.results)
        } else {
          this.topRatedMovies = response.results
        }
        this.pagination.topRated = {
          page: response.page,
          totalPages: response.total_pages
        }
      } catch (error) {
        this.setError(error.message)
      } finally {
        this.setLoading('topRated', false)
      }
    },

    // 获取电影详情
    async fetchMovieDetail(movieId) {
      this.setLoading('detail', true)
      try {
        const response = await getMovieDetail(movieId)
        this.currentMovie = response
        return response
      } catch (error) {
        this.setError(error.message)
        throw error
      } finally {
        this.setLoading('detail', false)
      }
    },

    // 搜索电影
    async searchMovies(query, page = 1, append = false) {
      this.setLoading('search', true)
      try {
        const response = await searchMovies(query, page)
        if (append) {
          this.searchResults.push(...response.results)
        } else {
          this.searchResults = response.results
        }
        this.pagination.search = {
          page: response.page,
          totalPages: response.total_pages
        }
        return response
      } catch (error) {
        this.setError(error.message)
        throw error
      } finally {
        this.setLoading('search', false)
      }
    },

    // 获取电影类型
    async fetchGenres() {
      this.setLoading('genres', true)
      try {
        const response = await getGenres()
        this.genres = response.genres
        return response.genres
      } catch (error) {
        this.setError(error.message)
        throw error
      } finally {
        this.setLoading('genres', false)
      }
    },

    // 按类型获取电影
    async fetchMoviesByGenre(genreId, page = 1, append = false) {
      this.setLoading('genreMovies', true)
      try {
        const response = await getMoviesByGenre(genreId, page)
        if (append) {
          this.genreMovies.push(...response.results)
        } else {
          this.genreMovies = response.results
        }
        this.pagination.genreMovies = {
          page: response.page,
          totalPages: response.total_pages
        }
        return response
      } catch (error) {
        this.setError(error.message)
        throw error
      } finally {
        this.setLoading('genreMovies', false)
      }
    },

    // 发现电影（支持多种筛选条件）
    async fetchDiscoverMovies(filters = {}, page = 1, append = false) {
      this.setLoading('genreMovies', true)
      try {
        const params = {
          page,
          ...filters
        }
        const response = await discoverMovies(params)
        if (append) {
          this.genreMovies.push(...response.results)
        } else {
          this.genreMovies = response.results
        }
        this.pagination.genreMovies = {
          page: response.page,
          totalPages: response.total_pages
        }
        return response
      } catch (error) {
        this.setError(error.message)
        throw error
      } finally {
        this.setLoading('genreMovies', false)
      }
    },

    // 清空搜索结果
    clearSearchResults() {
      this.searchResults = []
      this.pagination.search = { page: 1, totalPages: 1 }
    },

    // 重置错误状态
    clearError() {
      this.error = null
    },
  },
})