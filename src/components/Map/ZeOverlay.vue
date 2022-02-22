<template>
  <div  ref="htmlContent">
    <slot :position="position">

    </slot>
  </div>
</template>

<script setup>
  import { ref, computed, inject, onMounted, provide } from 'vue';
  import Overlay from 'ol/Overlay'
  import { fromLonLat } from 'ol/proj';

  const props = defineProps({
    position: {
      type: Array
    }
  })

  const useProps = () => {
    let result = JSON.parse(JSON.stringify(props))

    result.position = fromLonLat(result.position)

    return result
  }

  const htmlContent = ref(null)

  const map = inject('map')

  const overlay = computed(() => new Overlay(useProps()))

  onMounted(() => {
    map.addOverlay(overlay.value)
    overlay.value.setElement(htmlContent.value)
  })

  provide('overlay', overlay.value)
</script>

<style lang='scss' scoped>
</style>
