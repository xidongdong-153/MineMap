<template>
  <div class="map-container">
    <ze-map>
      <ze-view></ze-view>

      <ze-tile-layer>
        <ze-source-OSM></ze-source-OSM>
      </ze-tile-layer>
    </ze-map>
  </div>
</template>

<script setup>
import { } from 'vue';
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
