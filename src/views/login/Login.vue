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
            autocomplete
          />
          <label class="login-label">密码</label>
        </el-form-item>
        <el-form-item>
          <button class="login-submit" @click.prevent="handleLogin">
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
import { login } from '@/api/app.js'
import { useStore } from 'vuex'

const loding = ref(false)

const loginFormRef = ref(null)

const loginForm = ref({
  username: 'youzege',
  password: '123456'
})

const router = useRouter()
const store = useStore()

const handleLogin = () => {
  const { username, password } = loginForm.value
  if (username !== '' && password !== '') {
    login({ username, password })
      .then((data) => {
        if (data) {
          store.commit('user/setToken', data.token)
          ElMessage({
            message: '登陆成功！',
            type: 'success',
            center: true,
            grouping: true,
            duration: 2000
          })
          setTimeout(() => {
            router.push('/map')
          }, 500)
          return
        } else {
          ElMessage({
            message: '用户名或账号错误~',
            type: 'error',
            center: true,
            grouping: true,
            duration: 2000
          })
        }
      })
      .catch((err) => {
        reject(err)
      })
  } else {
    ElMessage({
      message: '好像没有输入账号或者密码喔~',
      type: 'warning',
      center: true,
      grouping: true,
      duration: 2000
    })
  }
}
</script>

<style lang="scss" scoped>
.login-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    hsl(219, 44%, 16%),
    hsl(219, 41%, 13%),
    hsl(212, 40%, 24%),
    hsl(210, 32%, 29%)
  );
  // background: linear-gradient(
  //   135deg,
  //   hsl(170deg, 80%, 70%),
  //   hsl(190deg, 80%, 70%),
  //   hsl(250deg, 80%, 70%),
  //   hsl(320deg, 80%, 70%)
  // );
  animation: wrapper 10s linear infinite;
  background-size: 200% 200%;
  @keyframes wrapper {
    0%,
    100% {
      background-position: 0% 0%;
    }
    30%,
    80% {
      background-position: 50% 50%;
    }
    50% {
      background-position: 100% 100%;
    }
  }
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
    height: 40px;
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
    animation: login 2s linear infinite;
    @keyframes login {
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
    // box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
    //   0 0 100px #03e9f4;
    animation: submitHover 3s linear infinite;
    @keyframes submitHover {
      0% {
        box-shadow: 0 0 2px #5ef1fc, 0 0 17px #5ef1fc, 0 0 35px #5ef1fc,
          0 0 80px #5ef1fc;
      }
      25% {
        box-shadow: 0 0 4px #4eebf7, 0 0 22px #4eebf7, 0 0 42px #4eebf7,
          0 0 90px #4eebf7;
      }
      50% {
        box-shadow: 0 0 6px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
          0 0 100px #03e9f4;
      }
      75% {
        box-shadow: 0 0 4px #4eebf7, 0 0 22px #4eebf7, 0 0 42px #4eebf7,
          0 0 90px #4eebf7;
      }
      100% {
        box-shadow: 0 0 2px #5ef1fc, 0 0 17px #5ef1fc, 0 0 35px #5ef1fc,
          0 0 80px #5ef1fc;
      }
    }
  }
}
</style>
