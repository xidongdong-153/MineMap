<template>
  <div class="map-container">
    <ze-map>
      <ze-view :center="center" :zoom="12"></ze-view>

      <ze-tile-layer>
        <ze-source-WMTS
          :url="baseUrl"
          :attributions="attributions"
          :layer="baseLayer"
        ></ze-source-WMTS>
      </ze-tile-layer>
      <ze-tile-layer>
        <ze-source-WMTS
          :url="noteUrl"
          :attributions="attributions"
          :layer="noteLayer"
        ></ze-source-WMTS>
      </ze-tile-layer>
    </ze-map>
  </div>
</template>

<script setup>
import {} from 'vue'

const center = [113.27, 23.1]

// const baseUrl = 'http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=40e50cca6823476482e8721bb2eee900'
// const noteUrl = 'http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=40e50cca6823476482e8721bb2eee900'

const baseUrl =
  'http://t{0-7}.tianditu.gov.cn/vec_w/wmts?tk=40e50cca6823476482e8721bb2eee900'
const noteUrl =
  'http://t{0-7}.tianditu.gov.cn/cva_w/wmts?tk=40e50cca6823476482e8721bb2eee900'

const baseLayer = 'vec',
  noteLayer = 'cva'

const attributions = '天地图XYZ'
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
