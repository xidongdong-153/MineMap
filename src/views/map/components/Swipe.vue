<template> </template>

<script setup>
import {} from 'vue'

const { imgTile, vecTile } = defineProps({
  imgTile: {
    type: Object
  },
  vecTile: {
    type: Object
  }
})

const swipe = document.getElementById('swipe')

console.log(imgTile)
</script>

<style lang="scss" scoped></style>
