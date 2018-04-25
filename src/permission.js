import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import { ID2NAME } from '@/utils/id2name'


NProgress.configure({ showSpinner: false })

const whiteList = [
  '/login',
  '/dashboard',
  '/authredirect'
]

router.beforeEach((to, from, next) => {
  NProgress.start()
  //console.log("每次路由变化都去获取Token:"+getToken(),",",from.path,"=>",to.path)
  if (getToken()) {
    if (to.path === '/login') {
      //console.log("%c存在token,但是目标页是登陆页，直接重定向到首页：","color:green;")
      next({ path: '/' })
      NProgress.done()
    } else {
      if (store.getters.roleGrade===undefined) {
        // console.log("%c存在token,但是不存在用户信息，去获取信息：","color:green;")
        store.dispatch('getUserInfo').then(()=>{
          store.dispatch('getPermission').then(()=>{
            router.addRoutes(store.getters.allowedRouter)
            next({ ...to, replace: true })
          })
          ID2NAME();
        }).catch((reason) => {
          // console.log("%c获取用户信息失败，清除token,回到登陆页：","color:green;")
          store.dispatch('FedLogOut').then(() => {
            Message.error('验证失效，请重新登陆')
            next('/login')
          })
        })
      }else {
        //console.log("%c存在token,且存在用户信息，直接去目标页面：","color:green;")
         next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // console.log("%c不存在token,但是在白名单，直接进入：","color:green;")
      if(!store.getters.allRouter.length){
        store.dispatch('getPermission').then(()=>{
          router.addRoutes(store.getters.allowedRouter)
        })
      }
      if(!Object.keys(store.getters.clientData.user).length){
        ID2NAME();
      }
      next()
    } else {
      //console.log("%c不存在token,重定向到登录页：","color:green;")
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
