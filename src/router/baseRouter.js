
import Layout from "@/views/layout"

export default [
  {
    path:"",
    component:Layout,
    children:[
      {
        path:"dashboard",
        name:"dashboard",
        component:resolve => require(['@/views/dashboard'], resolve),
      }
    ]
  },
  {
    path:"/login",
    name:"login",
    component:resolve => require(['@/views/login'], resolve),
  }
]
