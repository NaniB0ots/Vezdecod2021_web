import Vue from 'vue'
import Vuex from 'vuex'

import grid from './modules/grids'
import createPersistedState from "vuex-persistedstate";


Vue.use(Vuex)

const gridsState = createPersistedState({
  paths: ['grid']
})

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    grid
  },
  plugins: [gridsState]
})
