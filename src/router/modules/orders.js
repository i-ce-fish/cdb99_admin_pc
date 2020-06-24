import Layout from "@/layout"

const ordersRouter = {
  path: "/orders",
  name: "orders",
  redirect: "/orders/index",
  component: Layout,
  children: [{
    path: "index",
    name: "orders",
    component: () => import("@/views/orders"),
    meta: { title: "订单管理", icon: "tree" }
  }, {
    path: "edit",
    component: () => import("@/views/orders/edit"),
    hidden: true,
    meta: { title: "修改订单" }
  },
  {
    path: "add",
    component: () => import("@/views/orders/add"),
    hidden: true,
    meta: { title: "添加订单" }
  },
  {
    path: "detail",
    component: () => import("@/views/orders/detail"),
    hidden: true,
    meta: { title: "订单详情" }
  }
  ]
}

export default ordersRouter

