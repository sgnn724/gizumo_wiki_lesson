import axios from '@Helpers/axiosDefault';
// import Cookies from 'js-cookie';

export default {
  namespaced: true,
  state: {
    targetCategory: {
      id: null,
      name: '',
      article: {
        id: null,
        title: '',
        content: '',
      },
      user: {
        account_name: '',
        created_at: '',
        email: '',
        full_name: '',
        id: '',
        password_reset_flg: null,
        role: '',
        updated_at: '',
      },
    },
    categoryList: [],
    loading: false,
    doneMessage: '',
    errorMessage: '',
  },
  getters: {
    transformedCategories(state) {
      return state.categoryList.map(category => ({
        id: category.id,
        name: category.name,
      }));
    },
    targetCategory: state => state.targetCategory,
  },
  mutations: {
    initPostCategory(state) {
      state.targetCategory = Object.assign({}, {
        id: null,
        name: '',
        article: {
          id: null,
          title: '',
          content: '',
        },
        user: {
          account_name: '',
          created_at: '',
          email: '',
          full_name: '',
          id: '',
          password_reset_flg: null,
          role: '',
          updated_at: '',
        },
      });
    },
    doneGetAllCategories(state, { categories }) {
      state.categoryList = [...categories].reverse();
    },
    updateValue(state, payload) {
      state.targetCategory = Object.assign({}, { ...state.targetCategory }, {
        name: payload.name,
      });
    },
    displayDoneMessage(state, message = '成功しました') {
      state.doneMessage = message;
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
  },
  actions: {
    initPostCategory({ commit }) {
      commit('initPostCategory');
    },
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then((res) => {
        commit('doneGetAllCategories', { categories: res.data.categories });
      }).catch((err) => {
        commit('failRequest', { message: err.message });
      });
    },
    updateValue({ commit }, name) {
      commit({
        type: 'updateValue',
        name,
      });
    },
    postCategory({ commit, rootGetters }) {
      return new Promise((resolve) => {
        commit('clearMessage');
        commit('toggleLoading');
        const data = new URLSearchParams();
        data.append('name', rootGetters['categories/targetCategory'].name);
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          commit('toggleLoading');
          commit('displayDoneMessage', 'カテゴリーを作成しました');
          resolve();
        }).catch((err) => {
          commit('toggleLoading');
          commit('failRequest', { message: err.message });
        });
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
};
