<template>
  <div class="point-detail">
    <h5>台风点信息</h5>
    <div class="point-descriptions">
      <div class="typhoon-name typhoon">
        <span class="lable">名称</span> {{ typhoonName }}
      </div>
      <div class="typhoon-time typhoon">
        <span class="lable">时间</span> {{ typhoonData.time }}
      </div>
      <div class="typhoon-strong typhoon">
        <span class="lable">强度</span> {{ typhoonData.strong }}
      </div>
      <div class="typhoon-pressure typhoon">
        <span class="lable">气压</span>
        {{ typhoonData.pressure }} 百帕
      </div>
      <div class="typhoon-speed typhoon">
        <span class="lable">速度</span> {{ typhoonData.speed }} 米/每秒
      </div>
      <div class="typhoon-position typhoon">
        <span class="lable">位置</span> 东经 {{ typhoonData.lng }}, 北纬
        {{ typhoonData.lat }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  typhoonData: {
    type: Object
  },
  typhoonName: {
    type: String
  }
})
</script>

<style lang="scss" scoped>
.point-detail {
  box-sizing: border-box;
  position: absolute;
  padding: 10px;
  width: 16vw;
  min-width: 220px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.6);
  color: rgb(255, 255, 255);
  z-index: 1000;
  h5 {
    margin-bottom: 2px;
    text-align: center;
    font-size: 16px;
  }
  .point-descriptions {
    padding: 5px;

    .typhoon {
      padding-bottom: 5px;
      font-size: 14px;
      border-bottom: 1px solid #fff;
    }
    .lable {
      display: inline-block;
      font-size: 16px;
      padding-right: 4px;
      animation: font-animate 2s linear infinite;
    }
  }
}
@keyframes font-animate {
  0% {
    color: #fff;
  }
  25% {
    color: #95f2f7;
  }
  50% {
    color: #03e9f4;
  }
  75% {
    color: #95f2f7;
  }
  100% {
    color: #fff;
  }
}
</style>
