<template>
  <div v-if="false"></div>
</template>

<script setup>
  import { inject, onMounted } from 'vue';
  import View from 'ol/View'
  import { fromLonLat } from 'ol/proj';

  const props = defineProps({
        center: {
            type: Array,
            default: () => [0, 0],
        },
        constrainRotation: {
            type: Boolean,
            default: true
        },
        enableRotation: {
            type: Boolean,
            default: true
        },
        extent: {
            type: Array,
        },
        constrainOnlyCenter: {
            type: Boolean,
            default: false
        },
        smoothExtentConstraint: {
            type: Boolean,
            default: true
        },
        maxResolution: {
            type: Number,
        },
        minResolution: {
            type: Number,
        },
        maxZoom: {
            type: Number,
            default: 28
        },
        minZoom: {
            type: Number,
            default: 0
        },
        multiWorld: {
            type: Boolean,
            default: false
        },
        constrainResolution: {
            type: Boolean,
            default: false
        },
        smoothResolutionConstraint: {
            type: Boolean,
            default: true
        },
        showFullExtent: {
            type: Boolean,
            default: false
        },
        projection: {
            type: [String,Object],
            default: 'EPSG:3857'
        },
        resolution: {
            type: Number,
        },
        resolutions: {
            type: Array,

        },
        rotation: {
            type: Number,

        },
        zoom: {
            type: Number,
            default: 0
        },
        zoomFactor: {
            type: Number,
            default: 2
        },
        padding: {
            type: Array,
            default: () => [0, 0, 0, 0],
        },
  })

  const map = inject('map')

  const useProps = () => {
    let result = JSON.parse(JSON.stringify(props))

    result.center = fromLonLat(result.center)

    return result
  }
  const view = new View(useProps())

  onMounted(() => {
    map.setView(view)
  })
</script>

<style lang='scss' scoped>
</style>
