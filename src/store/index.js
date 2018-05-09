/**
 * Created by yubh on 2018/3/7.
 */
import Vue from 'vue';
import Vuex from 'vuex';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import state from './state';
import modules from '../modules_conf/modules_conf';


Vue.use(Vuex);// 应用 Vuex
const debug = process.env.NODE_ENV !== 'production';
const store =  new Vuex.Store({
  strict: debug,
  state,
  mutations,
  getters,
  actions,
  modules,
});


store.registerModule('element', { // 名字自己定义
  state: {
    isLoading: false
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    }
  }
})
export default store
