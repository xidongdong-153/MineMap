<template>
  <div></div>
</template>

<script setup>
import { inject, onMounted } from 'vue'
import { OverviewMap, defaults as defaultControls } from 'ol/control'
import TileLayer from 'ol/layer/Tile'
import { XYZ } from 'ol/source'

const map = inject('map')

// 高德
const gdTile = new TileLayer({ name: '高德地图图层' })
const gdUrl =
  'https://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}'
const gdSource = new XYZ({ url: gdUrl })

gdTile.setSource(gdSource)

const overviewMapControl = new OverviewMap({
  layers: [gdTile],
  collapsed: false,
  tipLabel: '高德地图'
})
onMounted(() => {
  overviewMapControl.setMap(map)
})
</script>

<style lang="scss" scoped></style>
