import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('mes-sidebarStatus')
    },
    language: Cookies.get('mes-language') || 'zhCN',
    themeColor:Cookies.get('mes-themeColor') || '#409eff',
    clientData:{
      user:{},   //用户
      role:{},    //角色
      machine:{},  //设备
      part:{},     //配件
      partType:{},   //配件型号
      maintainWay:{},  //保养方式
      fault:{},     //故障
    },
    intervalTime:3600*1000  // 数据刷新间隔时间
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('mes-sidebarStatus', 1)
      } else {
        Cookies.set('mes-sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('mes-language', language)
    },
    SET_THEME:(state,color)=>{
      state.themeColor = color;
      Cookies.set('mes-themeColor', color)
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
