<template>
  <el-dropdown>
    <el-button color="#626aef" :icon="Briefcase" plain> 工具箱 </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>测量距离</el-dropdown-item>
        <el-dropdown-item>清除测量</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import {} from 'vue'
import { Briefcase } from '@element-plus/icons-vue'
</script>

<style lang="scss" scoped></style>