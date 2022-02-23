<template>
  <div v-if="false"></div>
</template>

<script setup>
import { typhoonPathData } from '@/api/weather'
import { ref, inject, onActivated, onMounted } from 'vue'
import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import Feature from 'ol/Feature'
import { LineString, Point } from 'ol/geom'
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
    if(index > 0) {
      const featureLine = drawLine(points, index)
      sourec.addFeature(featureLine)
    }

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
          color: judgeColorByWindLevel(points[index].strong)
        }),
        radius: 4
      })
    })
  )
  featurePoint.set('typhoonPoint', true)
  return featurePoint
}

// 线绘制函数
const drawLine = (points, index) => {
  const position = [points[index].lng, points[index].lat]
  const nextPosition = [points[index - 1].lng, points[index - 1].lat]

  const featureLine = new Feature({
    geometry: new LineString([fromLonLat(position), fromLonLat(nextPosition)])
  })

  featureLine.set('typhoonLine', true)

  return featureLine
}

// 台风强度表
const judgeColorByWindLevel = (windlevel) => {
  const map = {
					热带风暴: 'red',
					热带低压: 'blue',
					强热带风暴: 'purple',
					台风: 'orange',
					强台风: 'yellow',
					超强台风: 'salmon'
				}
  return map[windlevel]
}

let lastZoomPoint = ref(null)

// 处理point hover事件
const handleHoverOnMap = () => {
  map.on('pointermove', e => {
    const pixel = e.pixel
    const feature = map.forEachFeatureAtPixel(pixel, feature => {
      return feature
    })

    if(feature && typeJudgeFeature(feature) === 'typhoonPoint') {
      map.getTargetElement().style.cursor = 'pointer'
      handleDeletePointZoom()

      feature.getStyle().getImage().setRadius(8)
      feature.changed()
      lastZoomPoint.value = feature
    }else {
      handleDeletePointZoom()
      map.getTargetElement().style.cursor = ''
    }
  })
}

// 清除上一个鼠标事件
const handleDeletePointZoom = () => {
  if (lastZoomPoint.value != null) {
    lastZoomPoint.value.getStyle().getImage().setRadius(4)
    lastZoomPoint.value.changed()
  }
}

// 判断feature类型
const typeJudgeFeature =(feature) => {
  if (feature.get('typhoonPoint')) {
    return 'typhoonPoint'
  } else if (feature.get('typhoonSolar')) {
    return 'typhoonSolar'
  } else {
    return 'isFeatureButDontNeedTodo'
  }
}

onMounted(() => {
  handleHoverOnMap()
})
</script>

<style lang="scss" scoped></style>
