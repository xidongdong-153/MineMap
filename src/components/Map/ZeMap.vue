<template>
  <div :ref="(el) => (mapRef = el)" class="map">
    <slot></slot>
  </div>
</template>

<script setup>
import Map from 'ol/Map'
import OSM from 'ol/source/OSM'
import TileLayer from 'ol/layer/Tile'
import View from 'ol/View'
import { ref, onMounted, onUnmounted, provide } from 'vue'


const mapRef = ref(null)

const map = new Map({})

provide('map', map)

onMounted(() => {
  map.setTarget(mapRef.value)
})

</script>

<style lang="scss" scoped>
.map {
  width: 100%;
  height: 100%;
}
</style>
