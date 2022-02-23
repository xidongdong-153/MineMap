<template>
  <div v-if="false"></div>
</template>

<script setup>
import { typhoonPathData } from '@/api/weather'
import { ref, inject, onActivated, onMounted } from 'vue'
import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import Feature from 'ol/Feature'
import { LineString, Point, Polygon } from 'ol/geom'
import { Fill, Circle, Style } from 'ol/style'
import { fromLonLat } from 'ol/proj'

const map = inject('map')

const typhoonData = ref({})

const getTyphoonData = async () => {
  const { data } = await typhoonPathData()
  return data
}
let lastShowSolar = ref(null)
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

    index++
  }, 50)
  map.addLayer(layer)
}
drawTyphoonPathIntervals()

// 点绘制函数
const drawPoint = (points, index) => {
  const position = [points[index].lng, points[index].lat]
  // setsource
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

// 风圈绘制函数
const drawSolar = (points) => {
  let radiusArr = points.radius7.split('|').map((item) => {
    return parseFloat(item)
  })
  // 定义中心点、多边形半径
  let Configs = {
    CIRCLE_CENTER_X: parseFloat(points.lng),
    CIRCLE_CENTER_Y: parseFloat(points.lat),
    CIRCLE_R: {
      SE: radiusArr[0] / 100,
      NE: radiusArr[1] / 100,
      NW: radiusArr[2] / 100,
      SW: radiusArr[3] / 100
    }
  }
  let positions = []
  let _interval = 6
  for (let i = 0; i < 360 / _interval; i++) {
    let _r = 0
    let _ang = i * _interval
    if (_ang > 0 && _ang <= 90) {
      _r = Configs.CIRCLE_R.NE
    } else if (_ang > 90 && _ang <= 180) {
      _r = Configs.CIRCLE_R.NW
    } else if (_ang > 180 && _ang <= 270) {
      _r = Configs.CIRCLE_R.SW
    } else {
      _r = Configs.CIRCLE_R.SE
    }

    let x = Configs.CIRCLE_CENTER_X + _r * Math.cos((_ang * 3.14) / 180)
    let y = Configs.CIRCLE_CENTER_Y + _r * Math.sin((_ang * 3.14) / 180)
    positions.push(fromLonLat([x, y]))
  }
  let feature = new Feature({
    geometry: new Polygon([positions])
  })
  feature.set('typhoonSolar', true)
  return feature
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

const handleClickOnMap = () => {
  map.on('click', e => {
    const pixel = e.pixel
    const feature = map.forEachFeatureAtPixel(pixel, feature => {
      return feature
    })

    if(feature) {
      if(feature.get('typhoonPoint')) {
        console.log('you click tyhoonPoint!');
      }
    }else {
        console.log('no click feature');
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
  handleClickOnMap()
})
</script>

<style lang="scss" scoped></style>
