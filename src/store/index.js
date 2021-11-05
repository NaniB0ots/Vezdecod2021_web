import Vue from 'vue'
import Vuex from 'vuex'

import grids from './modules/grids'
import createPersistedState from "vuex-persistedstate";


Vue.use(Vuex)

const gridsState = createPersistedState({
  paths: ['grids']
})

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    grids
  },
  plugins: [gridsState]
})
