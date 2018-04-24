import * as util from '@/utils'
import Vue from 'vue'
import baseRouter from '@/router/baseRouter';
import asyncRouter from '@/router/asyncRouter';
import store from '@/store'

function hasPermission(curGrade, route) {
  if (route.meta && route.meta.roleGrade) {
    var allowedRoleGrade=route.meta.roleGrade;   //[0,1]
    return allowedRoleGrade.some(()=>allowedRoleGrade.indexOf(curGrade)>-1)
  } else {
    return true
  }
}
function filterAsyncRouter(routes, grade) {
  const accessedRouters = routes.filter(route => {
    if (hasPermission(grade, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, grade)
      }
      return true
    }
    return false
  })
  return accessedRouters
}


export default{
  state: {
    allowedRouter:[],  //用于动态挂载
    allRouter:[],  //用于渲染sidebar
  },
  mutations: {
    SET_ROUTER:(state,allowedRouter)=>{
      state.allowedRouter=allowedRouter;   //权限路由
      state.allRouter=baseRouter.concat(allowedRouter);  //用于渲染侧边栏
    },
  },
  actions:{
    getPermission({commit,state}){
      return new Promise((resolve,reject)=>{
        //var _menus=util.deepClone(store.getters.menus)
        //var _resources=util.deepClone(store.getters.resources)
        //let hashMenus=getHashMenus(_menus);
        //let resources=getResources(_resources);
        //getCustomDirective(resources);
        //let allowedRouter=filterRouter(asyncRouter,hashMenus);

        setCustomDirective(store.getters.roleGrade)
        // let allowedRouter=asyncRouter
        let allowedRouter;
        if(store.getters.roleGrade===0){
          allowedRouter=asyncRouter
        }else if(store.getters.roleGrade){
          allowedRouter = filterAsyncRouter(asyncRouter, store.getters.roleGrade)
        } else{
          //访客登陆
          allowedRouter=[];
        }
        allowedRouter = allowedRouter.concat([{
          path: '*',
          redirect: '/404'
        }]);
        commit('SET_ROUTER', allowedRouter)
        resolve()
      })
    },
  },
}

function setCustomDirective(roleGrade){
  Vue.prototype.$_has = function(action) {
    if(roleGrade===0) return true;
    let permission = true;
    switch (action){
      case "add":
      case "del":
        permission=roleGrade===1?true:false;
        break;
      case "edit":
        permission=(roleGrade===1||roleGrade===2)?true:false;
        break;
      default:
        permission=false;
    }
    return permission;
  }
}











function getHashMenus(menus){
  let dealRoute=function(route) {
    var routeArr = route.split("/") //["","setting","account"]
    if (!routeArr[0]) {
      routeArr.splice(0, 1)
    }
    for (var i = 0; i < routeArr.length; i++) {
      if (i === 0) {
        routeArr[i] = "/" + routeArr[i]
      }else {
        routeArr[i] = routeArr[i - 1] + "/" + routeArr[i]
      }
      //console.log(routeArr[i])   //  "/setting"  "/setting/account"
      if(!hashMenus[routeArr[i]]){
        hashMenus[routeArr[i]]=true;
      }
    }
  }
  var hashMenus={};
  for (var i=0;i<menus.length;i++){
    var route=menus[i].route   //  "/setting/account"
    if(!route){continue;}
    dealRoute(route);
  }
  return hashMenus;
}
function getResources(resources) {
  let resourcePermission = {};
  if (Array.isArray(resources)) {
    resources.forEach(function(e, i) {
      let key = e.method.toLowerCase() + ',' + e.url;
      resourcePermission[key] = true;
    });
  }
  return resourcePermission;
}
function filterRouter(asyncRouter,hashMenus,base){
  const accessedRouters=asyncRouter.filter(route=>{
    let pathKey = (base ? base + '/' : '') + route.path;     //可能出现重复" /setting//setting/equip"
    pathKey=util.noRepeatArr(pathKey.split("/")).join("/")    //处理成" /setting/equip"
    if(hashMenus[pathKey]){
      if (Array.isArray(route.children) && route.redirect==="noredirect") {
        route.children = filterRouter(route.children,hashMenus, route.path);
      }
      return true;
    }
  })
  return accessedRouters
}
function getCustomDirective(resources){
  Vue.prototype.$_has = function(rArray) {
    let r = [];
    let permission = true;
    if (Array.isArray(rArray)) {
      rArray.forEach(function(e) {
        r = r.concat(e);
      });
    } else {
      r = r.concat(rArray.p);
    }
    r.forEach(function(p) {
      if (!resources[p]) {
        return permission = false;
      }
    });
    return permission;
  }
}


