import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import 'ol/ol.css';
import '@/styles/index.scss'
import '@/styles/fonts/iconfont.js'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(store).use(router).mount('#app')
