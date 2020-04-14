
import Layout from '@/layout'

const customersRouter = {
  path: '/customers',
  name: 'customers',
  redirect: '/customers/index',
  component: Layout,
  children: [{
    path: 'index',
    name: 'customers',
    component: () => import('@/views/customers'),
    meta: { title: '顾客管理', icon: 'tree' }
  }, {
    path: 'edit',
    component: () => import('@/views/customers/edit'),
    hidden: true,
    meta: { title: '修改顾客' }
  },
  {
    path: 'add',
    component: () => import('@/views/customers/add'),
    hidden: true,
    meta: { title: '添加顾客' }
  }
  ]
}

export default customersRouter

