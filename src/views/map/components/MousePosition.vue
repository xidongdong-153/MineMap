<template>
  <div class="mouse-position">
    <div>
      <span>经纬度</span>
      <span class="position" ref="mousePosition"></span>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue'
import { MousePosition, ScaleLine } from 'ol/control'
import { createStringXY } from 'ol/coordinate'

const map = inject('map')
const mousePosition = ref(null)
const scale = ref(null)

// 实例化鼠标控件

onMounted(() => {
  const mousePositionControl = new MousePosition({
    coordinateFormat: new createStringXY(4),
    projection: 'EPSG:4326',
    className: 'custom-mouse-position',
    target: mousePosition.value
  })

  mousePositionControl.setMap(map)
})
</script>

<style lang="scss" scoped>
.mouse-position {
  position: absolute;
  padding: 0 5px;
  left: 5px;
  bottom: 5px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 3px;
  z-index: 2001;
  animation: font-animate 2s linear infinite;
  .position {
    display: inline-block;
  }
}
@keyframes font-animate {
  0% {
    color: #fff;
  }
  25% {
    color: #95f2f7;
  }
  50% {
    color: #03e9f4;
  }
  75% {
    color: #95f2f7;
  }
  100% {
    color: #fff;
  }
}
.custom-mouse-position {
  color: #fff;
}
</style>
