import Layout from "@/layout"

const catalogsRouter = {
  path: "/catalogs",
  name: "catalogs",
  redirect: "/catalogs/index",
  component: Layout,
  children: [{
    path: "index",
    name: "catalogs",
    component: () => import("@/views/catalogs"),
    meta: { title: "图文目录管理", icon: "tree" }
  }, {
    path: "edit",
    component: () => import("@/views/catalogs/edit"),
    hidden: true,
    meta: { title: "修改图文目录" }
  },
  {
    path: "add",
    component: () => import("@/views/catalogs/add"),
    hidden: true,
    meta: { title: "添加图文目录" }
  }
  ]
}

export default catalogsRouter

