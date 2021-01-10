import state  from './state.js'
import * as getters  from './getter.js';
import  mutations from './mutation';
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({

    getters,
    state,
    mutations,
   
  })
