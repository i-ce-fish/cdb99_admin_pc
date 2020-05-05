
import Layout from '@/layout'

const goodsRouter = {
  path: '/goods',
  name: 'goods',
  redirect: '/goods/index',
  component: Layout,
  children: [{
    path: 'index',
    name: 'goods',
    component: () => import('@/views/goods'),
    meta: { title: '商品管理', icon: 'tree' }
  }, {
    path: 'edit',
    component: () => import('@/views/goods/edit'),
    hidden: true,
    meta: { title: '修改商品' }
  },
  {
    path: 'add',
    component: () => import('@/views/goods/add'),
    hidden: true,
    meta: { title: '添加商品' }
  }
  ]
}

export default goodsRouter

