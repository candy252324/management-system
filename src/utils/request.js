import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
// import $t from '@/utils/$t'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000, // request timeout
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
    if( url.indexOf("Login")===-1 && url.indexOf("Export")===-1){
      const res=response.data?JSON.parse(response.data):"";
      if(res.code===1){
        // Message.success($t("1"));
        Message.success("操作成功！");
      }else{
        // Message.error($t(res.code.toString()));
        Message.success("操作失败！");
      }
    }
    return response;
  },
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
