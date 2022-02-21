<template>
  <div v-if="false"></div>
</template>

<script setup>
import { inject, computed, onMounted } from 'vue'
import WMTS from 'ol/source/WMTS'
import Projection from 'ol/proj/Projection'
import WMTSTileGrid from 'ol/tilegrid/WMTS'
import { get as getProjection } from 'ol/proj'
import { getTopLeft, getWidth } from 'ol/extent'

const props = defineProps({
  proj: {
    type: String,
    default: 'EPSG:3857'
  },
  url: {
    type: String
  },
  layer: {
    type: String
  },
  matrixSet: {
    type: String,
    default: 'w'
  },
  format: {
    type: String,
    default: 'tiles'
  },
  style: {
    type: String,
    default: 'default'
  },
  attributions: {
    type: String
  },
  wrapX: {
    type: Boolean
  }
})

const tileLayer = inject('tileLayer')

const extent = computed(() => getProjection(props.proj).getExtent())
const origin = computed(() => getTopLeft(extent.value))
const size = computed(() => getWidth(extent.value) / 256)

const getTileGrid = computed(() => {
  const resolutions = new Array(14)
  const matrixIds = new Array(14)

  for (let z = 0; z < 18; ++z) {
    resolutions[z] = size.value / Math.pow(2, z)
    matrixIds[z] = z
  }

  return new WMTSTileGrid({
    origin: origin.value,
    resolutions,
    matrixIds
  })
})

const source = computed(
  () =>
    new WMTS({
      ...props,
      tileGrid: getTileGrid.value
    })
)

onMounted(() => {
  tileLayer.setSource(source.value)
})
</script>

<style lang="scss" scoped></style>
