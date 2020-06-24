//
// const categoriesRouter = [{
//     path: 'categories',
//     name: 'categories',
//     component: () => import('@/views/categories'),
//     meta: { title: '品类管理', icon: 'tree' }
//   }, {
//     path: 'categories/edit',
//     component: () => import('@/views/categories/edit'),
//     hidden: true,
//     meta: { title: '修改品类' }
//   },
//     {
//       path: 'categories/add',
//       component: () => import('@/views/categories/add'),
//       hidden: true,
//       meta: { title: '添加品类' }
//     }
//   ]
//
//
// export default categoriesRouter

import Layout from "@/layout"

const categoriesRouter = {
  path: "/categories",
  name: "categories",
  redirect: "/categories/index",
  component: Layout,
  children: [{
    path: "index",
    name: "categories",
    component: () => import("@/views/categories"),
    meta: { title: "商品分类管理", icon: "tree" }
  }, {
    path: "edit",
    component: () => import("@/views/categories/edit"),
    hidden: true,
    meta: { title: "修改商品分类" }
  },
  {
    path: "add",
    component: () => import("@/views/categories/add"),
    hidden: true,
    meta: { title: "添加商品分类" }
  }
  ]
}

export default categoriesRouter

