<template>
   <el-card>
     <h4>当前坐标</h4>
    <div class="item">{{ coordinate }}</div>
  </el-card>
</template>

<script setup>
  import { ref, inject } from 'vue';
  import { toLonLat } from 'ol/proj';

  const overlay = inject('overlay')

  const map = inject('map')

  const coordinate = ref('')

  map.on('singleclick', function (evt) {
    const position = evt.coordinate
    overlay.setPosition(position);
    coordinate.value = `lon: ${toLonLat(position)[0].toFixed(3)} --- lat ${toLonLat(position)[1].toFixed(3)}`
  })

</script>

<style lang='scss' scoped>
.item {
  padding-top: 10px;
}
</style>
