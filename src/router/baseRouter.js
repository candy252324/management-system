
import Layout from "@/views/layout"

export default [
  {
    path:"",
    name:"layout",
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
    name:"layout",
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
