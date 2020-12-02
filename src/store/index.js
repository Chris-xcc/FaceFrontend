import Vue from 'vue'
import Vuex from 'vuex'

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";


Vue.use(Vuex)

const state = {
  token: window.sessionStorage.getItem('token') ? window.sessionStorage.getItem('token') : '', //初始化token

  id: window.sessionStorage.getItem('id') ? window.sessionStorage.getItem('id') : '',
  username: window.sessionStorage.getItem('username') ? window.sessionStorage.getItem('username') : '',
  sex: window.sessionStorage.getItem('sex') ? window.sessionStorage.getItem('sex') : '',
  number: window.sessionStorage.getItem('number') ? window.sessionStorage.getItem('number') : '',
  face: window.sessionStorage.getItem('face') ? window.sessionStorage.getItem('face') : '',
  is_superuser: window.sessionStorage.getItem('is_superuser') ? window.sessionStorage.getItem('is_superuser') : '',

  signId: window.sessionStorage.getItem('signId') ? window.sessionStorage.getItem('signId') : '',


}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {}
})
export default store;
