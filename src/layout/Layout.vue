<template>
  <div class="app-wrapper">
    <navbar />
    <app-main />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import AppMain from './components/AppMain.vue'
import {} from 'vue'
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
