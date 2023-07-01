import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
      user:null,
      loadingStatus:false
    },
    mutations: {
      SET_USER(state, user) {
        state.user = user
      },
      SET_LOADING_STATUS(state,flag){
        state.loadingStatus = flag
      }
    }
})
