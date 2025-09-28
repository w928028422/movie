import { TMDB_CONFIG, IMAGE_SIZES } from '@/utils/constants'

// 获取完整图片URL
export const getImageUrl = (path, type = 'poster', size = 'medium') => {
  if (!path) return null

  const sizeConfig = IMAGE_SIZES[type]
  const imageSize = sizeConfig ? sizeConfig[size] : 'w500'

  return `${TMDB_CONFIG.IMAGE_BASE_URL}/${imageSize}${path}`
}

// 格式化电影时长
export const formatRuntime = (minutes) => {
  if (!minutes) return '未知'

  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  if (hours > 0) {
    return `${hours}小时${mins}分钟`
  }
  return `${mins}分钟`
}

// 格式化日期
export const formatDate = (dateString) => {
  if (!dateString) return '未知'

  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 格式化评分
export const formatRating = (rating) => {
  if (!rating) return '0.0'
  return rating.toFixed(1)
}

// 截取文本
export const truncateText = (text, maxLength = 100) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// 防抖函数
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}