
import Layout from "@/layout"

const articlesRouter = {
  path: "/articles",
  name: "articles",
  redirect: "/articles/index",
  component: Layout,
  children: [{
    path: "index",
    name: "articles",
    component: () => import("@/views/articles"),
    meta: { title: "图文管理", icon: "tree" }
  }, {
    path: "edit",
    component: () => import("@/views/articles/edit"),
    hidden: true,
    meta: { title: "修改图文" }
  },
  {
    path: "add",
    component: () => import("@/views/articles/add"),
    hidden: true,
    meta: { title: "添加图文" }
  }
  ]
}

export default articlesRouter

