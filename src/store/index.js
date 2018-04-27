
import Vue from 'vue'
import Vuex from 'vuex'

import * as state from './state'
import * as actions from './actions'
import * as mutations from './mutations'
import getters from './getters'

import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import tagsView from './modules/tagsView'

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules:{
    app,
    user,
    permission,
    tagsView,
  }
})
