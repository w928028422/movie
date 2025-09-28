// 本地存储工具类
class Storage {
  // 获取数据
  get(key, defaultValue = null) {
    try {
      const value = localStorage.getItem(key)
      return value ? JSON.parse(value) : defaultValue
    } catch (error) {
      console.error('获取本地存储数据失败:', error)
      return defaultValue
    }
  }

  // 设置数据
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error('设置本地存储数据失败:', error)
      return false
    }
  }

  // 删除数据
  remove(key) {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error('删除本地存储数据失败:', error)
      return false
    }
  }

  // 清空所有数据
  clear() {
    try {
      localStorage.clear()
      return true
    } catch (error) {
      console.error('清空本地存储失败:', error)
      return false
    }
  }

  // 检查是否存在
  has(key) {
    return localStorage.getItem(key) !== null
  }
}

export const storage = new Storage()

// 常用存储键名
export const STORAGE_KEYS = {
  FAVORITES: 'movie_favorites',
  WATCH_LIST: 'movie_watch_list',
  USER_RATINGS: 'movie_user_ratings',
  SEARCH_HISTORY: 'movie_search_history',
  USER_PREFERENCES: 'movie_user_preferences',
}