import request from './request'

// 获取热门电影
export const getPopularMovies = (page = 1) => {
  return request.get('/movie/popular', {
    params: { page }
  })
}

// 获取最新电影
export const getLatestMovies = (page = 1) => {
  return request.get('/movie/now_playing', {
    params: { page }
  })
}

// 获取即将上映电影
export const getUpcomingMovies = (page = 1) => {
  return request.get('/movie/upcoming', {
    params: { page }
  })
}

// 获取高评分电影
export const getTopRatedMovies = (page = 1) => {
  return request.get('/movie/top_rated', {
    params: { page }
  })
}

// 获取电影详情
export const getMovieDetail = (movieId) => {
  return request.get(`/movie/${movieId}`, {
    params: {
      append_to_response: 'credits,videos,images,similar'
    }
  })
}

// 搜索电影
export const searchMovies = (query, page = 1) => {
  return request.get('/search/movie', {
    params: { query, page }
  })
}

// 获取电影类型
export const getGenres = () => {
  return request.get('/genre/movie/list')
}

// 按类型获取电影
export const getMoviesByGenre = (genreId, page = 1) => {
  return request.get('/discover/movie', {
    params: { with_genres: genreId, page }
  })
}

// 发现电影（支持多种筛选条件）
export const discoverMovies = (params = {}) => {
  return request.get('/discover/movie', {
    params: {
      page: 1,
      ...params
    }
  })
}

// 获取电影图片
export const getMovieImages = (movieId) => {
  return request.get(`/movie/${movieId}/images`)
}

// 获取电影视频
export const getMovieVideos = (movieId) => {
  return request.get(`/movie/${movieId}/videos`)
}