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
    }
  ]
}
