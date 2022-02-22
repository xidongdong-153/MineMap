import layout from '@/layout'

export default {
  path: '/weather',
  component: layout,
  redirect: '/weather',
  name: 'weather',
  meta: { title: '气象专题', icon: 'icon-tianqi' },
  children: [
    {
      path: '/weather/forecast',
      component: () =>
        import(
          /* webpackChunkName: "article-ranking" */ '@/views/weather'
        ),
      meta: {
        title: '天气预报',
        icon: 'icon-cloud_moon-01'
      }
    },
    {
      path: '/weather/typhoon-path',
      component: () =>
        import(
          /* webpackChunkName: "article-ranking" */ '@/views/typhoon-path'
        ),
      meta: {
        title: '台风路径',
        icon: 'icon-tianqiicon_taifeng'
      }
    }
  ]
}
