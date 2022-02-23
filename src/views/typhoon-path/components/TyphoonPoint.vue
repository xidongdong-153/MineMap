<template>
  <div v-if="false"></div>
</template>

<script setup>
import { typhoonPathData } from '@/api/weather'
import { ref, inject } from 'vue'
import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import { drawPoint, drawLine, drawSolar, addSolarIcon } from './useDraw'
import { handleHoverOnMap, handleClickOnMap } from './useMouse'


const map = inject('map')

const getTyphoonData = async () => {
  const { data } = await typhoonPathData()
  return data
}
let lastShowSolar = ref(null)
let lastIcon = ref(null)

const drawTyphoonPathIntervals = async () => {
  const { points } = await getTyphoonData()

  const layer = new VectorLayer()
  const source = new VectorSource()

  layer.setSource(source)

  let index = 0

  const intervalPath = setInterval(() => {
    if (index == points.length) {
      clearInterval(intervalPath)
      return
    }
    const featurePoint = drawPoint(points, index)

    source.addFeature(featurePoint)
    if(index > 0) {
      const featureLine = drawLine(points, index)
      source.addFeature(featureLine)
    }

    // 按照特征点的风力让台风风圈单独显示
    if (points[index].radius7.length != 0 || points[index].radius7 != null) {
      let featureSolar = drawSolar(points[index])
      let currentSolar = lastShowSolar
      if (currentSolar != null) {
        source.removeFeature(lastShowSolar)
      }
      lastShowSolar = featureSolar
      source.addFeature(featureSolar)
    }

    if(index <= points.length - 1) {
      let currentIcon = addSolarIcon(points, index)
      let removeIcon = lastIcon
      if(removeIcon != null) {
        source.removeFeature(removeIcon)
      }
      lastIcon = currentIcon
      source.addFeature(currentIcon)
    }

    index++
  }, 50)
  map.addLayer(layer)
}
drawTyphoonPathIntervals()



handleHoverOnMap(map)
handleClickOnMap(map)

</script>

<style lang="scss" scoped></style>
