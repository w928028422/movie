<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center">
      <div class="mb-8">
        <el-icon size="120" class="text-gray-300">
          <DocumentDelete />
        </el-icon>
      </div>
      <h1 class="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 class="text-2xl font-semibold text-gray-600 mb-4">页面未找到</h2>
      <p class="text-gray-500 mb-8 max-w-md mx-auto">
        抱歉，您访问的页面不存在。可能是链接错误或页面已被移除。
      </p>
      <div class="space-x-4">
        <el-button type="primary" size="large" @click="$router.push('/')">
          返回首页
        </el-button>
        <el-button size="large" @click="$router.go(-1)">
          返回上页
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { DocumentDelete } from '@element-plus/icons-vue'
</script>