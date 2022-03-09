<template>
  <el-dropdown trigger="click">
    <el-button color="#626aef" :icon="Briefcase" plain> 工具箱 </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="handleShowPopup"
          >点击地图查看坐标</el-dropdown-item
        >
        <el-dropdown-item @click="handleHidePopup"
          >取消查看坐标</el-dropdown-item
        >
        <el-dropdown-item @click="handleMeasureLine">测量距离</el-dropdown-item>
        <el-dropdown-item @click="stopMeasure">清除测量</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { inject, onMounted } from 'vue'
import { Briefcase } from '@element-plus/icons-vue'
import { ZoomSlider } from 'ol/control'

import Draw from 'ol/interaction/Draw'
import { Vector as VectorLayer } from 'ol/layer'
import { unByKey } from 'ol/Observable'
import Overlay from 'ol/Overlay'
import { Vector as VectorSource } from 'ol/source'
import { getLength } from 'ol/sphere'
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style'
import { ref } from 'vue'

const map = inject('map')
let drawDoms = ref([])

// 缩放滑块
const zoomslider = new ZoomSlider()
map.addControl(zoomslider)

const handleMeasureLine = () => {
  // 测量数据源
  const source = new VectorSource()
  // 线要素样式
  const vectorLayer = new VectorLayer({
    source: source,
    style: new Style({
      fill: new Fill({
        color: 'rgba(255, 255, 255, 0.2)'
      }),
      stroke: new Stroke({
        color: '#ffcc33',
        width: 2
      }),
      image: new CircleStyle({
        radius: 7,
        fill: new Fill({
          color: '#ffcc33'
        })
      })
    })
  })

  // 要素
  let feature
  let draw
  let listener
  // 叠加层 提示
  let helpTooltipElement
  let helpTooltip
  let measureTooltipElement
  let measureTooltip

  /**
   * 帮助提示
   * @param map实例
   */
  const createHelpTooltip = () => {
    if (helpTooltipElement) {
      helpTooltipElement.parentNode.removeChild(helpTooltipElement)
    }
    helpTooltipElement = document.createElement('div')
    helpTooltipElement.className = 'ol-tooltip hidden'
    helpTooltip = new Overlay({
      element: helpTooltipElement,
      offset: [15, 0],
      positioning: 'center-left'
    })
    map.addOverlay(helpTooltip)
  }

  /**
   * 测量提示信息
   * @param map实例
   */
  const createMeasureTooltip = () => {
    if (measureTooltipElement) {
      measureTooltipElement.parentNode.removeChild(measureTooltipElement)
    }
    measureTooltipElement = document.createElement('div')
    measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure'
    measureTooltip = new Overlay({
      element: measureTooltipElement,
      offset: [0, -15],
      positioning: 'bottom-center',
      stopEvent: false,
      insertFirst: false
    })
    drawDoms.value.push(measureTooltipElement)
    map.addOverlay(measureTooltip)
  }

  let pointermoveListener = map.on('pointermove', function (ev) {
    let helpMsg = '点击地图作为目标点'
    if (feature) {
      helpMsg = '双击地图作为结束点'
    }
    helpTooltipElement.innerHTML = helpMsg
    helpTooltip.setPosition(ev.coordinate)
    helpTooltipElement.classList.remove('hidden')
  })

  draw = new Draw({
    source: source,
    type: 'LineString',
    style: new Style({
      fill: new Fill({
        color: 'rgba(255, 255, 255, 0.2)'
      }),
      stroke: new Stroke({
        color: 'rgba(0, 0, 0, 0.5)',
        lineDash: [10, 10],
        width: 2
      }),
      image: new CircleStyle({
        radius: 5,
        stroke: new Stroke({
          color: 'rgba(0, 0, 0, 0.7)'
        }),
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        })
      })
    })
  })
  //

  draw.on('drawstart', function (evt) {
    feature = evt.feature

    let tooltipCoord = evt.coordinate

    listener = feature.getGeometry().on('change', function (evt) {
      const geom = evt.target
      let output = formatLength(geom)
      tooltipCoord = geom.getLastCoordinate()
      measureTooltipElement.innerHTML = output
      measureTooltip.setPosition(tooltipCoord)
    })
  })

  map.getViewport().addEventListener('mouseout', function () {
    helpTooltipElement.classList.add('hidden')
  })

  draw.on('drawend', function () {
    measureTooltipElement.className = 'ol-tooltip ol-tooltip-static'
    measureTooltip.setOffset([0, -7])

    feature = null

    measureTooltipElement = null
    createMeasureTooltip(map)
    map.removeInteraction(draw)
    unByKey(listener)
    unByKey(pointermoveListener)
  })

  map.addInteraction(draw)

  // 格式化单位
  const formatLength = function (line) {
    const length = getLength(line)
    let output
    if (length > 100) {
      output = Math.round((length / 1000) * 100) / 100 + ' ' + '公里'
    } else {
      output = Math.round(length * 100) / 100 + ' ' + '米'
    }
    return output
  }

  createHelpTooltip()
  createMeasureTooltip()
  drawLayers.push(vectorLayer)
  map.addLayer(vectorLayer)
}

// 测量线图层组
const drawLayers = []

// 清除测量
const stopMeasure = () => {
  let layers = drawLayers
  for (let i = 0; i < layers.length; i++) {
    map.removeLayer(layers[i])
  }
  for (let i = 0; i < drawDoms.value.length; i++) {
    drawDoms.value[i].parentNode.removeChild(drawDoms.value[i])
    console.log(drawDoms.value)
  }
  drawDoms.value = []
}

// 查看当前坐标
const isPopup = ref(false)

const emits = defineEmits(['handleShowPopup', 'handleHidePopup'])

const handleShowPopup = () => {
  emits('handleShowPopup', (isPopup.value = true))
}

const handleHidePopup = () => {
  emits('handleShowPopup', (isPopup.value = false))
}
</script>

<style lang="scss" scoped></style>
