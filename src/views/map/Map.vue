<template>
  <div class="map-container">
    <ze-map>
      <div class="slot"></div>
    </ze-map>
  </div>
</template>

<script setup>
import {} from 'vue'
import { ZeMap } from '@/components/Map'
</script>

<style lang="scss" scoped>
.map-container {
  position: relative;
  width: 100%;
  height: 100%;
  .slot {
    position: absolute;
    z-index: 1;
  }
}
</style>
