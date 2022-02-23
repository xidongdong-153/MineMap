import Feature from 'ol/Feature'
import { LineString, Point, Polygon } from 'ol/geom'
import { fromLonLat } from 'ol/proj'
import { Circle, Fill, Icon, Style } from 'ol/style'

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

// 添加风圈图标
const addSolarIcon = (points, index) => {
  const position = [points[index].lng, points[index].lat]

  const feature = new Feature({
    geometry: new Point(fromLonLat(position))
  })

  feature.setStyle(
    new Style({
      image: new Icon({
        src: '/typhoon.png',
        scale: 0.5
      })
    })
  )
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

export {
  drawPoint,
  drawLine,
  drawSolar,
  addSolarIcon
}
