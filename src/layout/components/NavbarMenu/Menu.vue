<template>
  <el-menu
    :default-active="activeMenu"
    class="el-menu-demo"
    mode="horizontal"
    router
  >
    <sub-menu v-for="item in routes" :key="item.path" :route="item" />
  </el-menu>
</template>

<script setup>
import { ref, computed } from 'vue'
import { UserFilled } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { filterRoutes, generateMenus } from '@/utils/route'
import SubMenu from './SubMenu.vue'

const router = useRouter()
const routes = computed(() => {
  const fRoutes = filterRoutes(router.getRoutes())
  return generateMenus(fRoutes)
})

// 默认激活项
const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})
</script>

<style lang="scss" scoped>
.icon {
  font-size: 16px;
}
</style>
