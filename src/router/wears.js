
import Layout from '@/layout'

const wearsRouter = {
  path: '/wears',
  name: 'wears',
  redirect: '/wears/index',
  component: Layout,
  children: [{
    path: 'index',
    name: 'wears',
    component: () => import('@/views/wears'),
    meta: { title: '穿法管理', icon: 'tree' }
  }, {
    path: 'edit',
    component: () => import('@/views/wears/edit'),
    hidden: true,
    meta: { title: '修改穿法' }
  },
  {
    path: 'add',
    component: () => import('@/views/wears/add'),
    hidden: true,
    meta: { title: '添加穿法' }
  }
  ]
}

export default wearsRouter

