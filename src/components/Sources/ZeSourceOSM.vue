<template>
  <div v-if="false"></div>
</template>

<script setup>
  import { computed, inject, onMounted} from 'vue'
  import OSM from 'ol/source/OSM';

  const layer = inject('tileLayer');

  let source = computed(() => new OSM())

  console.log(layer);

  onMounted(() => {
    layer.setSource(source.value)
  })
</script>

<style lang='scss' scoped>
</style>
