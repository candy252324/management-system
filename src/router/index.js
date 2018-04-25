import Vue from 'vue';
import Router from 'vue-router';
import baseRouter from './baseRouter'
Vue.use(Router);
let router = new Router({
  // mode:"history",
  routes: baseRouter
});

// router.beforeEach((to, from, next) => {
//   let routeName = to.meta.name || to.name;
//   window.document.title = (routeName ? routeName + ' - ' : '') + 'Vue-Access-Control';
//   next();
// });

export default router;
