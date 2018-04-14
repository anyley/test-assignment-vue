import Vue from 'vue'
import Vuex from 'vuex'

import comments from './comments'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    comments
  }
})
