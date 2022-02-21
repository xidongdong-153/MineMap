<template>
  <div>
    <slot></slot>
  </div>
</template>

<script setup>
  import { computed, inject, onMounted, provide } from 'vue';
  import TileLayer from 'ol/layer/Tile';

  const map = inject('map');

  const tileLayer = computed(() => new TileLayer())

  provide('tileLayer', tileLayer.value)

  onMounted(() => {
    map.addLayer(tileLayer.value)
  })

</script>

<style lang='scss' scoped>
</style>
