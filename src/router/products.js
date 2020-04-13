
import Layout from '@/layout'

const productsRouter = {
  path: '/products',
  name: 'products',
  redirect: '/products/index',
  component: Layout,
  children: [{
    path: 'index',
    name: 'products',
    component: () => import('@/views/products'),
    meta: { title: '商品', icon: 'tree' }
  }, {
    path: 'edit',
    component: () => import('@/views/products/edit'),
    hidden: true,
    meta: { title: '修改商品' }
  },
  {
    path: 'add',
    component: () => import('@/views/products/add'),
    hidden: true,
    meta: { title: '添加商品' }
  }
  ]
}

export default productsRouter

