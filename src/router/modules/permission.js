import Layout from '@/layout'
export default {
  path: '/permission',
  component: Layout,
  meta: {
    id: 'permissions' //用来和后端权限做约定
  },
  children: [
    {
      path: '',
      component: () => import('@/views/permission'),
      name: 'permissions',
      meta: { title: '权限管理', icon: 'lock' }
    }
  ]
}
