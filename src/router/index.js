import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout'
import Weather from './modules/Weather'
import Article from './modules/Article'
import UserManage from './modules/UserManage'

const privateRoutes = [
  Weather,
  Article,
  UserManage
]

const publicRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/map',
    children: [
      {
        name: 'map',
        path:'/map',
        component: () => import('@/views/map'),
        meta: {
          title: '地图可视化',
          icon: 'icon-a-diqiuxingqiu'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...publicRoutes, ...privateRoutes]
})

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  next()
})

export default router
