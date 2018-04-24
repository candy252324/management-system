import { getToken, setToken, removeToken } from '@/utils/auth'
import { login,getUserInfo,logout } from '@/api/login'
import {changePsw,submitForm} from '@/api/user'

export default{
  state: {
    token:getToken(),
    roleGrade:undefined,  //角色等级 0 admin 1高级 2中级 3低级
    userInfo:{},
    defaultAvatar:"data:image/png;base64,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",
    avatar:"",
    userName:"",
    menus:[],         //未经处理的用户可用菜单
    resources:[],     //未经处理的用户资源权限
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
      setToken(token);
    },
    SET_ROLEGRADE: (state, grade) => {
      state.roleGrade = grade;
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo;
    },
  },
  actions:{
    Login({ commit }, userInfo) {
      return new Promise((resolve,reject)=>{
        login(userInfo).then(res=>{
          var d=JSON.parse(res.data)
          if(d.code===1){
            const token=d.token;
            commit('SET_TOKEN', token);
            resolve();
          }else{
            reject({code:d.code});
          }
        }).catch(err=>{
          reject(err);
        })
      })
    },
    getUserInfo({commit,state}){
      return new Promise((resolve,reject)=>{
        getUserInfo({token:getToken()}).then(res=>{
          const userInfo=JSON.parse(res.data);
          commit('SET_USERINFO', JSON.parse(userInfo.Info));
          commit('SET_ROLEGRADE', userInfo.RoleGrade);
          resolve();
        }).catch(err=>{
          reject(err)
        })
      })
    },
    // 安全登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout({token:state.token}).then(() => {
          commit('SET_TOKEN', '')
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
    ChangePsw({commit},payload){
      return new Promise((resolve,reject) => {
        changePsw(payload).then(res=>{
          var d=JSON.parse(res.data)
          if(d.code===1){
            resolve()
          }else{
            reject({code:d.code})
          }
        }).catch(err=>{
          reject(err)
        })
      })
    },
    ChangeInfo({commit},payload){
      return new Promise((resolve,reject) => {
        submitForm(payload).then(res=>{
          var d=JSON.parse(res.data)
          if(d.code===1){
            resolve()
          }else{
            reject(d.code+":"+d.message)
          }
        }).catch(err=>{
          reject(err)
        })
      })
    },
  },
}

