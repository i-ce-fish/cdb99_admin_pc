
import Layout from "@/layout"

const activitiesRouter = {
  path: "/activities",
  name: "activities",
  redirect: "/activities/index",
  component: Layout,
  children: [{
    path: "index",
    name: "activities",
    component: () => import("@/views/activities"),
    meta: { title: "优惠活动管理", icon: "tree" }
  }, {
    path: "edit",
    component: () => import("@/views/activities/edit"),
    hidden: true,
    meta: { title: "修改优惠活动" }
  },
  {
    path: "add",
    component: () => import("@/views/activities/add"),
    hidden: true,
    meta: { title: "添加优惠活动" }
  }
  ]
}

export default activitiesRouter
