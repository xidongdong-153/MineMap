import { fromLonLat } from 'ol/proj'
import { ref } from 'vue'
import { setTyphoonDataOverlay } from './useDraw'


let lastZoomPoint = ref(null)


// 处理point hover事件
const handleHoverOnMap = (map, typhoonInfo, typhoonData) => {

  const overlay = setTyphoonDataOverlay(map, typhoonInfo)
  map.on('pointermove', e => {
    const pixel = e.pixel
    const feature = map.forEachFeatureAtPixel(pixel, feature => {
      return feature
    })

    if(feature && typeJudgeFeature(feature) === 'typhoonPoint') {
      typhoonData.value = feature.get('points')

      handleDeletePointZoom()
      map.getTargetElement().style.cursor = 'pointer'

      setOverlayPosition(typhoonData.value, overlay)

      feature.getStyle().getImage().setRadius(8)
      feature.changed()
      lastZoomPoint.value = feature
    }else {
      handleDeletePointZoom()
      map.getTargetElement().style.cursor = ''
      typhoonData.value = {}
      removeOverlay(overlay)
    }
  })
}

// 设置弹窗叠加层位置
const setOverlayPosition = ( points, overlay) => {

  const position = fromLonLat([points.lng, points.lat]);
  overlay.setPosition(position)
}

const removeOverlay = (overlay) => {
  overlay.setPosition(undefined)
}

const handleClickOnMap = (map) => {
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
    lastZoomPoint.value.getStyle().getImage().setRadius(5)
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

export {
  handleHoverOnMap,
  handleClickOnMap,
}
