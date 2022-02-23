<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>实况台风信息</span>
      </div>
    </template>
    <el-descriptions :column="2" border>
      <el-descriptions-item
        label="名称"
        label-align="right"
        align="center"
        label-class-name="my-label"
        class-name="my-content"
        >{{ typhoonName }}</el-descriptions-item
      >
      <el-descriptions-item label="时间" label-align="right" align="center">
        <el-tag size="small">{{ typhoonData.time }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="强度" label-align="right" align="center">{{
        typhoonData.strong
      }}</el-descriptions-item>
      <el-descriptions-item label="气压" label-align="right" align="center"
        >{{ typhoonData.pressure }} 百帕</el-descriptions-item
      >
      <el-descriptions-item label="移速" label-align="right" align="center"
        >{{ typhoonData.speed }} 米/每秒</el-descriptions-item
      >

      <el-descriptions-item label="中心位置" label-align="right" align="center">
        东经: {{ typhoonData.lng }},北纬:
        {{ typhoonData.lat }}</el-descriptions-item
      >
    </el-descriptions>
  </el-card>
</template>

<script setup>
import { ref, watch } from '@vue/runtime-core'

const props = defineProps({
  typhoonData: {
    type: Object
  },
  typhoonName: {
    type: String
  }
})
</script>

<style lang="scss" scoped>
.box-card {
  width: 500px;
  position: absolute;
  z-index: 1000;
}
</style>
