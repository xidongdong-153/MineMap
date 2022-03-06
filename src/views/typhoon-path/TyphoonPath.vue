<template>
  <ze-map>
    <!-- view视图 -->
    <ze-view
      :center="center"
      :zoom="2"
      :extent="extents"
      :showFullExtent="true"
    ></ze-view>
    <!-- 瓦片地图 -->
    <ze-tile-layer>
      <ze-source-WMTS
        :url="baseUrl"
        :attributions="attributions"
        :layer="baseLayer"
      />
    </ze-tile-layer>
    <ze-tile-layer>
      <ze-source-WMTS
        :url="noteUrl"
        :attributions="attributions"
        :layer="noteLayer"
      />
    </ze-tile-layer>
    <!-- 台风路径 -->
    <typhoon-point />
  </ze-map>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TyphoonPoint from './components/TyphoonPoint.vue'
import { fromLonLat } from 'ol/proj'

const center = [124.27, 31.1]

const baseUrl =
    'http://t{0-7}.tianditu.gov.cn/vec_w/wmts?tk=40e50cca6823476482e8721bb2eee900',
  noteUrl =
    'http://t{0-7}.tianditu.gov.cn/cva_w/wmts?tk=40e50cca6823476482e8721bb2eee900'

const baseLayer = 'vec',
  noteLayer = 'cva'

const attributions = '加载WMTS天地图'

const extents = [
  ...fromLonLat([84.224, 18.001]),
  ...fromLonLat([164.447, 41.241])
]
</script>

<style lang="scss" scoped></style>
