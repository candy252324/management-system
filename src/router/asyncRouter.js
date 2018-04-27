const _import = require('./_import_' + process.env.NODE_ENV)
import Layout from '@/views/layout/Layout'
export default[

  // 注意，只有当某个菜单不存在子菜单时，redirect属性值可以不为“noredirect”，
  // 否则，权限控制可能会出错,因为动态挂载路由时，使用了这个属性

  {
    path: '/setting',
    component: Layout,
    redirect: 'noredirect',
    name: 'setting',
    meta: {
      title: 'setting',
      icon: 'set',
      roleGrade:[0,1,2]
    },
    children: [
      // { path: 'organize', name: 'organize', component: _import('setting/Organize'), meta: { title: 'organize' }},
      // { path: 'area', name: 'area', component: _import('setting/Area'), meta: { title: 'area' }},
      // { path: 'duty', name: 'duty', component: _import('setting/Duty'), meta: { title: 'duty' }},
      { path: 'role', name: 'role', component: _import('setting/role/index'), meta: { title: 'role',roleGrade:[0,1] }},
      { path: 'user', name: 'user', component: _import('setting/user/index'), meta: { title: 'user',roleGrade:[0,1] }},
      // { path: 'menu', name: 'menu', component: _import('setting/menu/Menu'), meta: { title: '系统菜单' }},
    ]
  },
  //{ path: '*', redirect: '/404', hidden: true }  //404动态挂载
]
