
import Layout from "@/views/layout"

export default [
  {
    path:"",
    component:Layout,
    children:[
      {
        path:"role",
        name:"role",
        component:resolve => require(['@/views/role'], resolve),
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
        component:resolve => require(['@/views/user'], resolve),
      }
    ]
  },
]
