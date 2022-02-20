import layout from '@/layout'

export default {
  path: '/article',
  component: layout,
  redirect: '/article/weather-kp',
  name: 'article',
  meta: { title: '文章阅读', icon: 'icon-yuedu' },
  children: [
    {
      path: '/article/weather-kp',
      component: () =>
        import(
          /* webpackChunkName: "article-ranking" */ '@/views/article'
        ),
      meta: {
        title: '气象科普',
        icon: 'icon-qixiangziliao'
      }
    }
  ]
}
