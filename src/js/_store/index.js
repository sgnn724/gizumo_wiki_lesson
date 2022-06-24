import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import {
  auth, categories, articles, users,
} from './modules';

Vue.use(Vuex);
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    auth,
    categories,
    articles,
    users,
  },
  plugins: [createPersistedState({
    key: 'categories',
    paths: [
      'categories',
    ],
    storage: window.sessionStorage,
  })],
});
