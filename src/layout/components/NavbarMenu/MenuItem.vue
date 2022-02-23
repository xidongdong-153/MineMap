<template>
  <svg class="icon icon-right" aria-hidden="true">
    <use :xlink:href="'#' + icon"></use>
  </svg>
  <span>{{ title }}</span>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.icon-right {
  padding-right: 5px;
}
</style>
