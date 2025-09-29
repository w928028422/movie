import axios from 'axios'
import { TMDB_CONFIG, REQUEST_TIMEOUT } from '@/utils/constants'

// 创建axios实例
const request = axios.create({
  baseURL: TMDB_CONFIG.BASE_URL,
  timeout: REQUEST_TIMEOUT,
})

// 重试函数
const retryRequest = async (config, retryCount = 3) => {
  for (let i = 0; i < retryCount; i++) {
    try {
      const response = await axios(config)
      return response
    } catch (error) {
      if (i === retryCount - 1) {
        throw error
      }
      // 等待时间递增: 1s, 2s, 3s
      await new Promise(resolve => setTimeout(resolve, (i + 1) * 1000))
    }
  }
}

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
  async (error) => {
    // 网络超时或连接错误时自动重试
    if (error.code === 'ECONNABORTED' || error.code === 'NETWORK_ERROR' ||
        (error.response && error.response.status >= 500)) {
      try {
        console.log('网络请求失败，正在重试...', error.config.url)
        const response = await retryRequest(error.config)
        return response.data
      } catch (retryError) {
        console.error('重试失败:', retryError)
        return Promise.reject(retryError)
      }
    }

    console.error('API请求错误:', error)
    return Promise.reject(error)
  }
)

export default request