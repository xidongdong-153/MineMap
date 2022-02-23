import { ref } from 'vue'
let lastZoomPoint = ref(null)

// 处理point hover事件
const handleHoverOnMap = (map) => {
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

export {
  handleHoverOnMap,
  handleClickOnMap
}
