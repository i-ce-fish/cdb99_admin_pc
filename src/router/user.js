
import Layout from '@/layout'

const usersRouter = {
  path: '/users',
  name: 'users',
  redirect: '/users/index',
  component: Layout,
  children: [{
    path: 'index',
    name: 'users',
    component: () => import('@/views/users'),
    meta: { title: '用户管理', icon: 'tree' }
  }, {
    path: 'edit',
    component: () => import('@/views/users/edit'),
    hidden: true,
    meta: { title: '修改用户' }
  },
  {
    path: 'add',
    component: () => import('@/views/users/add'),
    hidden: true,
    meta: { title: '添加用户' }
  }
  ]
}

export default usersRouter

