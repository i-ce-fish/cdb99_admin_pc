import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

/* Layout */
import Layout from "@/layout"
import productsRouter from "./modules/products"
import categoriesRouter from "./modules/categories"
import activitiesRouter from "./modules/activities"
import ordersRouter from "./modules/orders"
import usersRouter from "./modules/user"
import customersRouter from "./modules/customer"
import wearsRouter from "./modules/wears"
import outfitsRouter from "./modules/outfits"
import articlesRouter from "./modules/articles"
import catalogsRouter from "./modules/catalogs"
import goodsRouter from "./modules/goods"
// import inventoriesRouter from '@/router/inventories'
// import productsRouter from '@/router/products'
// import sales_ordersRouter from '@/router/sales_orders'
// import colorsRouter from '@/router/pcolors'
// import sizesRouter from '@/router/psizes'
// import fabricsRouter from '@/router/pfabrics'
// import brandsRouter from '@/router/brands'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/test",
    component: () => import("@/views/test/index"),
    hidden: true
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [{
      path: "dashboard",
      name: "Dashboard",
      component: () => import("@/views/dashboard/index"),
      meta: { title: "首页", icon: "dashboard" }
    }]
  },
  // catalogsRouter,
  // productsRouter,
  categoriesRouter,
  activitiesRouter,
  ordersRouter,
  usersRouter,
  customersRouter,
  wearsRouter,
  outfitsRouter,
  articlesRouter,
  catalogsRouter,
  goodsRouter,
  // inventoriesRouter,
  // sales_ordersRouter,
  // {
  //   path: '/infoManagement',
  //   component: Layout,
  //   redirect: '/infoManagement/products',
  //   meta: { title: '信息管理', icon: 'tab' },
  //   children: [
  //     ...productsRouter,
  //     ...brandsRouter,
  //     ...catalogsRouter,
  //     ...colorsRouter,
  //     ...sizesRouter,
  //     ...fabricsRouter
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true }
]

const createRouter = () => new Router({
  // 无#号
  // mode: 'history', // require service support
  // default mode : hash  有#号
  // mode: 'hash', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
