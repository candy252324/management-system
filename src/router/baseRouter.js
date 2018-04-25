const _import = require('./_import_' + process.env.NODE_ENV)

import Layout from '@/views/layout/Layout'
export default [
  {
    path: '/login',
    name: 'login',
    component: (resolve) => require(['../views/login/login.vue'], resolve)
  },
  {
    path: '/401',
    name: '无权访问',
    component: (resolve) => require(['../views/errorPage/401.vue'], resolve)
  },
  {
    path: '/404',
    name: '找不到页面',
    component: (resolve) => require(['../views/errorPage/404.vue'], resolve)
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'home', noCache: true }    //noCache: true,不缓存
    }]
  },
];


