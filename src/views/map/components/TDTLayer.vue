<template>
  <input type="range" id="swipe" class="rangeMain" />
</template>

<script setup>
import TileLayer from 'ol/layer/Tile'
import { XYZ } from 'ol/source'
import { inject, onMounted } from 'vue'

const map = inject('map')
const vecTile = new TileLayer()
const imgTile = new TileLayer()
const noteTile = new TileLayer()

const vecUrl =
  'http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=40e50cca6823476482e8721bb2eee900'
const imgUrl =
  'http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=40e50cca6823476482e8721bb2eee900'
const noteUrl =
  'http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=40e50cca6823476482e8721bb2eee900'

const attributions = '天地图XYZ!'

const vecSource = new XYZ({ url: vecUrl, attributions })
const imgSource = new XYZ({ url: imgUrl })
const noteSource = new XYZ({ url: noteUrl })

noteTile.setSource(noteSource)
vecTile.setSource(vecSource)
imgTile.setSource(imgSource)

map.addLayer(imgTile)
map.addLayer(vecTile)
map.addLayer(noteTile)

const useSwipe = () => {
  const swipe = document.getElementById('swipe')
  vecTile.on('prerender', function (event) {
    const ctx = event.context

    const width = ctx.canvas.width * (swipe.value / 100)

    ctx.save()
    ctx.beginPath()
    ctx.rect(width, 0, ctx.canvas.width - width, ctx.canvas.height)
    ctx.clip()
  })
  vecTile.on('postrender', function (event) {
    // 在地图渲染之后触发
    const ctx = event.context
    ctx.restore() // 恢复canvas设置
  })

  swipe.addEventListener(
    'input',
    function () {
      map.render()
    },
    false
  )
  swipe.addEventListener(
    'change',
    function () {
      map.render()
    },
    false
  )
}

onMounted(() => {
  useSwipe()
})
</script>

<style lang="scss" scoped>
.rangeMain {
  position: absolute;
  bottom: 60%;
  z-index: 888;
  width: 100%;
  height: 0px; /*横条的高度*/
}
</style>
