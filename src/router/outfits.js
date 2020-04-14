
import Layout from '@/layout'

const outfitsRouter = {
  path: '/outfits',
  name: 'outfits',
  redirect: '/outfits/index',
  component: Layout,
  children: [{
    path: 'index',
    name: 'outfits',
    component: () => import('@/views/outfits'),
    meta: { title: '搭配管理', icon: 'tree' }
  }, {
    path: 'edit',
    component: () => import('@/views/outfits/edit'),
    hidden: true,
    meta: { title: '修改搭配' }
  },
  {
    path: 'add',
    component: () => import('@/views/outfits/add'),
    hidden: true,
    meta: { title: '添加搭配' }
  }
  ]
}

export default outfitsRouter

