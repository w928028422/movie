// TMDB API 配置
export const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
  API_KEY: import.meta.env.VITE_TMDB_API_KEY || '',
  ACCESS_TOKEN: import.meta.env.VITE_API_READ_ACCESS_TOKEN || '',
}

// 图片尺寸配置
export const IMAGE_SIZES = {
  poster: {
    small: 'w342',
    medium: 'w500',
    large: 'w780',
    original: 'original',
  },
  backdrop: {
    small: 'w780',
    medium: 'w1280',
    large: 'original',
  },
  profile: {
    small: 'w185',
    medium: 'w300',
    large: 'h632',
  },
}

// 电影类型
export const MOVIE_GENRES = {
  28: '动作',
  12: '冒险',
  16: '动画',
  35: '喜剧',
  80: '犯罪',
  99: '纪录片',
  18: '剧情',
  10751: '家庭',
  14: '奇幻',
  36: '历史',
  27: '恐怖',
  10402: '音乐',
  9648: '悬疑',
  10749: '爱情',
  878: '科幻',
  10770: '电视电影',
  53: '惊悚',
  10752: '战争',
  37: '西部',
}

// 请求超时时间 (移动端网络优化)
export const REQUEST_TIMEOUT = 20000

// 分页配置
export const PAGE_SIZE = 20