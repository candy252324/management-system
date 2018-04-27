import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import $t from '@/utils/$t'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 10000, // request timeout
})


service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['X-Token'] = getToken()
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    var method=response.config.method.toLowerCase();
    if(method!=="post") return response;

    var url=response.config.url;
    if( url.indexOf("login")===-1){
      let res=response.data;
      if(res.code===0){
        Message.success($t("0"));
        // ID2NAME();
      }else{
        if(res.code!=undefined){
          Message.error($t(res.code.toString()));
        }
      }
    }
    return response;
    },
  /**
  * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
  * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
  */
  error => {
    console.log(error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  })

export default service
