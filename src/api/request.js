import axios from 'axios'
import { TMDB_CONFIG, REQUEST_TIMEOUT } from '@/utils/constants'

// 创建axios实例
const request = axios.create({
  baseURL: TMDB_CONFIG.BASE_URL,
  timeout: REQUEST_TIMEOUT,
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 优先使用Access Token认证，否则使用API Key
    if (TMDB_CONFIG.ACCESS_TOKEN) {
      config.headers.Authorization = `Bearer ${TMDB_CONFIG.ACCESS_TOKEN}`
      config.params = {
        ...config.params,
        language: 'zh-CN', // 中文
      }
    } else {
      config.params = {
        ...config.params,
        api_key: TMDB_CONFIG.API_KEY,
        language: 'zh-CN', // 中文
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.error('API请求错误:', error)
    return Promise.reject(error)
  }
)

export default request