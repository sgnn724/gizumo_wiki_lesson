import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { isUseLocalStorage } from '@Helpers/webStorage';
import {
  auth, categories, articles, users,
} from './modules';

const commonStoreOptions = {
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    auth,
    categories,
    articles,
    users,
  },
};
const localStorageOption = {
  plugins: [createPersistedState({
    key: 'gizumo_wiki_category',
    paths: [
      'categories.categoriesList',
      'categories.updateCategoryId',
      'categories.updateCategoryName',
    ],
    storage: window.localStorage,
  })],
};

const storeOptions = isUseLocalStorage ? {
  ...commonStoreOptions,
  ...localStorageOption,
} : {
  ...commonStoreOptions,
};

Vue.use(Vuex);
export default new Vuex.Store(storeOptions);
