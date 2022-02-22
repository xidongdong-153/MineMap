<template>
  <div v-if="false"></div>
</template>

<script setup>
import { typhoonPathData } from '@/api/weather'
import { ref, inject, onActivated } from 'vue'
import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import Feature from 'ol/Feature'
import { Point } from 'ol/geom'
import { Fill, Circle, Style } from 'ol/style'
import { fromLonLat } from 'ol/proj'

const map = inject('map')

const typhoonData = ref({})

const getTyphoonData = async () => {
  const { data } = await typhoonPathData()
  return data
}

const drawTyphoonPathIntervals = async () => {
  const { points } = await getTyphoonData()

  const layer = new VectorLayer()
  const sourec = new VectorSource()
  layer.setSource(sourec)

  let index = 0

  const intervalPath = setInterval(() => {
    if (index == points.length) {
      clearInterval(intervalPath)
      return
    }
    const featurePoint = drawPoint(points, index)
    sourec.addFeature(featurePoint)
    index++
  }, 50)
  map.addLayer(layer)
}
drawTyphoonPathIntervals()

// 点绘制函数
const drawPoint = (points, index) => {
  const position = [points[index].lng, points[index].lat]
  // setSourec
  const featurePoint = new Feature({
    geometry: new Point(fromLonLat(position))
  })
  // setStyle
  featurePoint.setStyle(
    new Style({
      image: new Circle({
        fill: new Fill({
          color: 'red'
        }),
        radius: 4
      })
    })
  )
  featurePoint.set('typhoonPoint', true)
  return featurePoint
}
</script>

<style lang="scss" scoped></style>
