import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    language: Cookies.get('language') || 'zhCN',
    themeColor:Cookies.get('themeColor') || '#409eff',
    clientData:{
      user:{},   //用户
      role:{},    //角色
      machine:{},  //设备
      part:{},     //配件
      partType:{},   //配件型号
      maintainWay:{},  //保养方式
      fault:{},     //故障
    },
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    },
    SET_THEME:(state,color)=>{
      state.themeColor = color;
      Cookies.set('themeColor', color)
    },
    ID2NAME:(state,d)=>{
      state.clientData = d;
    },
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
    setTheme({ commit }, color) {
      commit('SET_THEME', color)
    },
    id2name({ commit }, data) {
      commit('ID2NAME', data)
    },
  }
}


export default app
