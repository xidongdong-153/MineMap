<template>
  <div class="ze-header">
    <div class="header-bar">
      <div class="header-left">
        <a class="left-logo">
          <img class="logo-img" src="@/assets/weather.png" alt="" />
          <span class="logo-title">可视化GIS平台</span>
        </a>
      </div>
      <div class="header-center">
        <Menu class="menu-container" />
      </div>
      <div class="header-right">
        <div class="icon-right">
          <el-link
            href="https://github.com/Youzege/MineMap"
            target="_blank"
            :underline="false"
          >
            <svg class="icon icon-github" aria-hidden="true">
              <use xlink:href="#icon-github"></use>
            </svg>
          </el-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {} from 'vue'
import { UserFilled } from '@element-plus/icons-vue'
import Menu from './NavbarMenu'
import { useRouter } from 'vue-router'
</script>

<style lang="scss" scoped>
.ze-header {
  position: relative;
  width: 100%;
  height: 64px;
  .header-bar {
    position: fixed;
    top: 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    width: 100%;
    height: 64px;
    z-index: 1002;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
    background-color: #f8f8f8;
    .header-left {
      width: 20vw;
      height: 100%;
      .left-logo {
        .logo-img {
          margin-top: calc(64px - 56px);
          width: 45px;
          height: 45px;
        }
        .logo-title {
          position: absolute;
          padding-left: 8px;
          line-height: 64px;
          font-size: 28px;
          font-weight: 600;
        }
      }
    }
    .header-center {
      width: 50vw;
      height: 64px;
    }
    .header-right {
      display: flex;
      justify-content: end;
      width: 20vw;
      .icon-github {
        font-size: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>
