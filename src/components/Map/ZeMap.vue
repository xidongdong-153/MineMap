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
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  layers: {
    type: Object
  }
})

const mapRef = ref(null)

const layers = new TileLayer({
  source: new OSM()
})

const map = new Map({
  layers: [layers],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2
  })
})

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
