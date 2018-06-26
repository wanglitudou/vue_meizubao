import Vue from 'vue'
import Vuex from 'vuex'

import home from './modules/home'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    home

  }
})

if (module.hot) {
  // 使 modules 成为可热重载模块
  module.hot.accept([
    './modules/home'
  ], () => {
    store.hotUpdate({
      modules: {
        home: require('./modules/home').home.default
      }
    })
  })
}

export default store
