
import Layout from "@/views/layout"

export default [
  {
    path:"",
    component:Layout,
    children:[
      {
        path:"role",
        name:"role",
        component:resolve => require(['@/views/base/role'], resolve),
      }
    ]
  },
  {
    path:"",
    component:Layout,
    children:[
      {
        path:"user",
        name:"user",
        component:resolve => require(['@/views/base/user'], resolve),
      }
    ]
  },
]
