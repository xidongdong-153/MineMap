<template>
  <div class="app-main">
    <router-view></router-view>
  </div>
</template>

<script setup>
import {} from 'vue'
</script>

<style lang="scss" scoped>
.app-main {
  position: relative;
  padding: 0 10px 0 10px;
  height: calc(100% - 64px);
}
</style>
