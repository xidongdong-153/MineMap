<template>
  <div class="map-container">
    <ze-map>
      <ze-view
        :center="center"
        :zoom="10"
        :minZoom="6"
        :maxZoom="18"
        :extent="extents"
        :showFullExtent="true"
      ></ze-view>
      <!-- 地图卷帘 -->
      <TDTLayer />
      <!-- 工具箱 -->
      <tool-box
        class="tool-box"
        @handleShowPopup="getIsPopup"
        @handleHidePopup="hidePopup"
      ></tool-box>
      <!-- 鼠标坐标弹窗 -->
      <ze-overlay :position="[0, 0]" v-if="isPopup">
        <ze-popup> </ze-popup>
      </ze-overlay>
      <!-- 图层选择 -->
      <LayerControl class="layer-control" />
      <!-- 鼠标坐标&比例尺 -->
      <MousePosition />
      <!-- 鹰眼地图 -->
      <OverViewMap />
    </ze-map>
  </div>
</template>

<script setup>
import { fromLonLat } from 'ol/proj'
import { ref } from 'vue'
import TDTLayer from './components/TDTLayer.vue'
import ToolBox from './components/ToolBox.vue'
import LayerControl from './components/LayerControl.vue'
import MousePosition from './components/MousePosition.vue'
import OverViewMap from './components/OverViewMap.vue'

const center = [113.312, 23.134]

const extents = [
  ...fromLonLat([111.224, 23.001]),
  ...fromLonLat([115.447, 23.241])
]

// const baseUrl = 'http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=40e50cca6823476482e8721bb2eee900'
// const noteUrl = 'http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=40e50cca6823476482e8721bb2eee900'

const isPopup = ref(false)

const getIsPopup = (val) => {
  isPopup.value = val
}
const hidePopup = (val) => {
  isPopup.value = val
}
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
  .overlay-content {
    width: 200px;
    height: 50px;
    background: #efefef;
    box-shadow: 0 5px 10px rgb(2 2 2 / 20%);
    padding: 10px 20px;
    font-size: 16px;
  }
  .tool-box {
    position: absolute;
    top: 8px;
    right: 15px;
    z-index: 10;
  }
  .layer-control {
    position: absolute;
    top: 8px;
    right: 120px;
    z-index: 10;
  }
}
</style>
