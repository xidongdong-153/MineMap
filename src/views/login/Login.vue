<template>
  <div class="login-wrapper">
    <div class="login">
      <h2 class="login-title">登录</h2>
      <el-form ref="loginFormRef" :model="loginForm" label-width="120px">
        <el-form-item class="login-box" prop="username">
          <input
            class="login-input"
            type="text"
            required="123"
            v-model="loginForm.username"
          />
          <label class="login-label">用户名</label>
        </el-form-item>
        <el-form-item class="login-box" prop="password">
          <input
            class="login-input"
            type="password"
            required=""
            v-model="loginForm.password"
          />
          <label class="login-label">密码</label>
        </el-form-item>
        <el-form-item>
          <button class="login-submit" @click="handleLogin">
            <span class="login-animate"></span>
            <span class="login-animate"></span>
            <span class="login-animate"></span>
            <span class="login-animate"></span>
            登录
          </button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const loding = ref(false)

const loginFormRef = ref(null)

const loginForm = ref({
  username: 'youzege',
  password: '123456'
})

const router = useRouter()

const handleLogin = () => {
  if (loginForm.value.username !== '' && loginForm.value.password !== '') {
    loding.value = true
    console.log(loginForm.value)
    loding.value = false
    ElMessage({
      message: '登陆成功！',
      type: 'success'
    })
    setTimeout(() => {
      router.push('map')
    }, 700)
  }
}
</script>

<style lang="scss" scoped>
.login-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(#141e30, #243b55);
}
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  .login-title {
    margin: 0 0 30px;
    padding: 0;
    color: #fff;
    text-align: center;
    user-select: none;
  }
  .login-box {
    position: relative;
  }
  .login-input {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #fff;
    outline: none;
    background: transparent;
  }
  .login-label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    pointer-events: none;
    transition: 0.5s;
    user-select: none;
  }
  .login-input:focus ~ .login-label,
  .login-input:valid ~ .login-label {
    top: -25px;
    left: 0;
    color: #03e9f4;
    font-size: 12px;
  }
  .login-submit {
    position: relative;
    display: inline-block;
    padding: 10px 20px;
    width: 120px;
    height: 40px;
    color: #03e9f4;
    font-size: 16px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    transition: 0.5s;
    letter-spacing: 4px;
    user-select: none;
    border-radius: 5px;
    background: none;
    outline: none;
    border: none;
    cursor: pointer;

    .login-animate {
      position: absolute;
      display: block;
    }

    .login-animate:nth-child(1) {
      top: 0;
      left: -100%;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, transparent, #03e9f4);
      animation: span1 1s linear infinite;
    }

    @keyframes span1 {
      0% {
        left: -100%;
      }
      50%,
      100% {
        left: 100%;
      }
    }

    .login-animate:nth-child(2) {
      top: 100%;
      right: 0;
      width: 2px;
      height: 100%;
      background: linear-gradient(180deg, transparent, #03e9f4);
      animation: span2 1s linear infinite;
      animation-delay: 0.25s;
    }

    @keyframes span2 {
      0% {
        top: -100%;
      }
      50%,
      100% {
        top: 100%;
      }
    }

    .login-animate:nth-child(3) {
      bottom: 0;
      right: -100%;
      width: 100%;
      height: 2px;
      background: linear-gradient(270deg, transparent, #03e9f4);
      animation: span3 1s linear infinite;
      animation-delay: 0.5s;
    }

    @keyframes span3 {
      0% {
        right: -100%;
      }
      50%,
      100% {
        right: 100%;
      }
    }

    .login-animate:nth-child(4) {
      left: 0;
      bottom: -100%;
      width: 2px;
      height: 100%;
      background: linear-gradient(360deg, transparent, #03e9f4);
      animation: span4 1s linear infinite;
      animation-delay: 0.75s;
    }

    @keyframes span4 {
      0% {
        bottom: -100%;
      }
      50%,
      100% {
        bottom: 100%;
      }
    }
  }
  .login-submit:hover {
    background: #03e9f4;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
      0 0 100px #03e9f4;
  }
}
</style>
