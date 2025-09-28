import { defineStore } from 'pinia'
import { storage, STORAGE_KEYS } from '@/utils/storage'

export const useUserStore = defineStore('user', {
  state: () => ({
    // 收藏的电影
    favorites: storage.get(STORAGE_KEYS.FAVORITES, []),

    // 观看列表
    watchList: storage.get(STORAGE_KEYS.WATCH_LIST, []),

    // 用户评分
    userRatings: storage.get(STORAGE_KEYS.USER_RATINGS, {}),

    // 搜索历史
    searchHistory: storage.get(STORAGE_KEYS.SEARCH_HISTORY, []),

    // 用户偏好设置
    preferences: storage.get(STORAGE_KEYS.USER_PREFERENCES, {
      theme: 'light', // light | dark
      language: 'zh-CN',
      autoPlay: true,
    }),
  }),

  getters: {
    // 检查电影是否已收藏
    isFavorite: (state) => (movieId) => {
      return state.favorites.some(movie => movie.id === movieId)
    },

    // 检查电影是否在观看列表中
    isInWatchList: (state) => (movieId) => {
      return state.watchList.some(movie => movie.id === movieId)
    },

    // 获取用户对电影的评分
    getUserRating: (state) => (movieId) => {
      return state.userRatings[movieId] || 0
    },

    // 获取收藏数量
    favoritesCount: (state) => state.favorites.length,

    // 获取观看列表数量
    watchListCount: (state) => state.watchList.length,
  },

  actions: {
    // 添加到收藏
    addToFavorites(movie) {
      if (!this.isFavorite(movie.id)) {
        this.favorites.push({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
          addedAt: new Date().toISOString(),
        })
        this.syncToStorage('favorites')
      }
    },

    // 从收藏中移除
    removeFromFavorites(movieId) {
      const index = this.favorites.findIndex(movie => movie.id === movieId)
      if (index > -1) {
        this.favorites.splice(index, 1)
        this.syncToStorage('favorites')
      }
    },

    // 切换收藏状态
    toggleFavorite(movie) {
      if (this.isFavorite(movie.id)) {
        this.removeFromFavorites(movie.id)
      } else {
        this.addToFavorites(movie)
      }
    },

    // 添加到观看列表
    addToWatchList(movie) {
      if (!this.isInWatchList(movie.id)) {
        this.watchList.push({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
          addedAt: new Date().toISOString(),
        })
        this.syncToStorage('watchList')
      }
    },

    // 从观看列表中移除
    removeFromWatchList(movieId) {
      const index = this.watchList.findIndex(movie => movie.id === movieId)
      if (index > -1) {
        this.watchList.splice(index, 1)
        this.syncToStorage('watchList')
      }
    },

    // 切换观看列表状态
    toggleWatchList(movie) {
      if (this.isInWatchList(movie.id)) {
        this.removeFromWatchList(movie.id)
      } else {
        this.addToWatchList(movie)
      }
    },

    // 设置用户评分
    setUserRating(movieId, rating) {
      this.userRatings[movieId] = rating
      this.syncToStorage('userRatings')
    },

    // 添加搜索历史
    addSearchHistory(query) {
      if (!query.trim()) return

      // 移除重复项
      const index = this.searchHistory.indexOf(query)
      if (index > -1) {
        this.searchHistory.splice(index, 1)
      }

      // 添加到开头
      this.searchHistory.unshift(query)

      // 限制历史记录数量
      if (this.searchHistory.length > 10) {
        this.searchHistory = this.searchHistory.slice(0, 10)
      }

      this.syncToStorage('searchHistory')
    },

    // 清空搜索历史
    clearSearchHistory() {
      this.searchHistory = []
      this.syncToStorage('searchHistory')
    },

    // 更新偏好设置
    updatePreferences(newPreferences) {
      this.preferences = { ...this.preferences, ...newPreferences }
      this.syncToStorage('preferences')
    },

    // 同步到本地存储
    syncToStorage(key) {
      const storageKey = STORAGE_KEYS[key.toUpperCase()] || STORAGE_KEYS[key]
      if (storageKey) {
        storage.set(storageKey, this[key])
      }
    },

    // 从本地存储加载数据
    loadFromStorage() {
      this.favorites = storage.get(STORAGE_KEYS.FAVORITES, [])
      this.watchList = storage.get(STORAGE_KEYS.WATCH_LIST, [])
      this.userRatings = storage.get(STORAGE_KEYS.USER_RATINGS, {})
      this.searchHistory = storage.get(STORAGE_KEYS.SEARCH_HISTORY, [])
      this.preferences = storage.get(STORAGE_KEYS.USER_PREFERENCES, {
        theme: 'light',
        language: 'zh-CN',
        autoPlay: true,
      })
    },

    // 清空所有用户数据
    clearAllData() {
      this.favorites = []
      this.watchList = []
      this.userRatings = {}
      this.searchHistory = []

      // 清空本地存储
      storage.remove(STORAGE_KEYS.FAVORITES)
      storage.remove(STORAGE_KEYS.WATCH_LIST)
      storage.remove(STORAGE_KEYS.USER_RATINGS)
      storage.remove(STORAGE_KEYS.SEARCH_HISTORY)
    },
  },
})