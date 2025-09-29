<template>
  <div class="min-h-screen bg-slate-50">
    <div class="container-responsive py-8">
      <!-- 页面标题 -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-slate-800 mb-2">
          我的收藏
        </h1>
        <p class="text-slate-600">
          管理您收藏的电影和想看列表
        </p>
      </div>

      <!-- 标签页 -->
      <el-tabs v-model="activeTab" class="favorites-tabs">
        <!-- 收藏列表 -->
        <el-tab-pane label="收藏" name="favorites">
          <template #label>
            <span class="flex items-center">
              <el-icon class="mr-1"><StarFilled /></el-icon>
              收藏 ({{ userStore.favoritesCount }})
            </span>
          </template>

          <div class="mb-6 flex justify-between items-center">
            <p class="text-slate-600">
              共收藏了 {{ userStore.favoritesCount }} 部电影
            </p>
            <el-button
              v-if="userStore.favoritesCount > 0"
              type="danger"
              :icon="Delete"
              @click="handleClearFavorites"
            >
              清空收藏
            </el-button>
          </div>

          <!-- 收藏电影列表 -->
          <MovieGrid
            :movies="userStore.favorites"
            :empty-text="'还没有收藏的电影'"
            :empty-description="'去首页发现更多精彩电影吧'"
            @remove="handleRemoveFavorite"
          />
        </el-tab-pane>

        <!-- 想看列表 -->
        <el-tab-pane label="想看" name="watchlist">
          <template #label>
            <span class="flex items-center">
              <el-icon class="mr-1"><View /></el-icon>
              想看 ({{ userStore.watchListCount }})
            </span>
          </template>

          <div class="mb-6 flex justify-between items-center">
            <p class="text-slate-600">
              共有 {{ userStore.watchListCount }} 部想看的电影
            </p>
            <el-button
              v-if="userStore.watchListCount > 0"
              type="danger"
              :icon="Delete"
              @click="handleClearWatchList"
            >
              清空想看
            </el-button>
          </div>

          <!-- 想看电影列表 -->
          <MovieGrid
            :movies="userStore.watchList"
            :empty-text="'还没有想看的电影'"
            :empty-description="'去首页发现更多精彩电影吧'"
            @remove="handleRemoveFromWatchList"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Delete, StarFilled, View } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/modules/user'
import { ElMessage, ElMessageBox } from 'element-plus'
import MovieGrid from '@/components/movie/MovieGrid.vue'

const router = useRouter()
const userStore = useUserStore()
const activeTab = ref('favorites')

// 移除收藏
const handleRemoveFavorite = async (movie) => {
  try {
    await ElMessageBox.confirm(
      `确定要从收藏中移除《${movie.title}》吗？`,
      '确认移除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )

    userStore.removeFromFavorites(movie.id)
    ElMessage({
      message: '已从收藏中移除',
      type: 'success',
      duration: 2000
    })
  } catch {
    // 用户取消操作
  }
}

// 移除想看
const handleRemoveFromWatchList = async (movie) => {
  try {
    await ElMessageBox.confirm(
      `确定要从想看列表中移除《${movie.title}》吗？`,
      '确认移除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )

    userStore.removeFromWatchList(movie.id)
    ElMessage({
      message: '已从想看列表中移除',
      type: 'success',
      duration: 2000
    })
  } catch {
    // 用户取消操作
  }
}

// 清空收藏
const handleClearFavorites = async () => {
  try {
    await ElMessageBox.confirm(
      `确定要清空所有收藏吗？此操作不可恢复。`,
      '确认清空',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )

    userStore.favorites.splice(0)
    userStore.syncToStorage('favorites')
    ElMessage({
      message: '已清空所有收藏',
      type: 'success',
      duration: 2000
    })
  } catch {
    // 用户取消操作
  }
}

// 清空想看列表
const handleClearWatchList = async () => {
  try {
    await ElMessageBox.confirm(
      `确定要清空所有想看列表吗？此操作不可恢复。`,
      '确认清空',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )

    userStore.watchList.splice(0)
    userStore.syncToStorage('watchList')
    ElMessage({
      message: '已清空想看列表',
      type: 'success',
      duration: 2000
    })
  } catch {
    // 用户取消操作
  }
}
</script>

<style scoped>
.favorites-tabs :deep(.el-tabs__header) {
  margin-bottom: 24px;
}

.favorites-tabs :deep(.el-tabs__nav-wrap) {
  border-bottom: 2px solid #e5e7eb;
}

.favorites-tabs :deep(.el-tabs__item) {
  font-size: 16px;
  font-weight: 500;
  color: #64748b;
  padding: 0 24px;
}

.favorites-tabs :deep(.el-tabs__item.is-active) {
  color: #3b82f6;
}

.favorites-tabs :deep(.el-tabs__active-bar) {
  background-color: #3b82f6;
}
</style>