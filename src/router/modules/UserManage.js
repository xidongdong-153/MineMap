import layout from '@/layout'

export default {
  path: '/user-manage',
  component: layout,
  redirect: '/user-manage/sys-detail',
  name: 'user-manage',
  meta: { title: '后台管理', icon: 'icon-chuangti' },
  children: [
    {
      path: '/user-manage/sys-detail',
      component: () =>
        import(
          /* webpackChunkName: "user-manage-ranking" */ '@/views/user'
        ),
      meta: {
        title: '系统详情',
        icon: 'icon-a-dengtishi'
      }
    }
  ]
}
