import Cookies from 'js-cookie'
import asycnRouter from "@/router/asyncRouter"

const app={
  state:{
    sidebarStatus:!+Cookies.get('sidebarStatus'),  //true 展开，false收起
  },
  mutations:{
    TOGGLE_SIDEBAR: state => {
      if (state.sidebarStatus) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebarStatus = !state.sidebarStatus
    },
  },
  actions:{
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
  }
}
export default app
