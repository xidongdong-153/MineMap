<template>
  <div v-if="false"></div>
</template>

<script setup>
  import { computed, inject, onMounted } from 'vue'
  import { XYZ } from 'ol/source'
	import { fromLonLat } from 'ol/proj'

  const props = defineProps({
    url: {
      type: String
    },
    attributions: {
      type: String
    },
    wrap: {
      type: Boolean,
      default: false
    }
  })

  const layer = inject('tileLayer')

  const source = computed(() => new XYZ(props))

  onMounted(() => {
    layer.setSource(source.value)
  })
</script>

<style lang='scss' scoped>
</style>
