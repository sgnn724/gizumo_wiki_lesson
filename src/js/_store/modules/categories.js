import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoriesList: [],
    errorMessage: '',
    inputCategory: {
      name: '',
    },
    isLoading: false,
    doneMessage: '',
  },
  getters: {
    inputCategory: state => state.inputCategory,
  },
  mutations: {
    doneGetAllCategories(state, payload) {
      state.categoriesList = [...payload.categories].reverse();
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    updateValue(state, payload) {
      state.inputCategory.name = payload;
    },
    postCategories(state, payload) {
      state.categoriesList.unshift(payload);
    },
    toggleLoading(state) {
      state.isLoading = !state.isLoading;
    },
    displayDoneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    initPostCategory(state) {
      state.inputCategory = Object.assign({}, {
        name: '',
      });
    },
  },
  actions: {
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then((res) => {
        const payload = {
          categories: res.data.categories,
        };
        commit('doneGetAllCategories', payload);
      }).catch((err) => {
        commit('failRequest', { message: err.message });
      });
    },
    updateValue({ commit }, payload) {
      commit('updateValue', payload);
    },
    postCategories({ commit, rootGetters }) {
      return new Promise((resolve) => {
        commit('toggleLoading');
        const data = new URLSearchParams();
        data.append('name', rootGetters['categories/inputCategory'].name);
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          commit('displayDoneMessage', { message: 'カテゴリー新規作成しました' });
          resolve();
        }).catch((err) => {
          commit('failRequest', { message: err.message });
        }).finally(() => {
          commit('toggleLoading');
        });
      });
    },
    initPostCategory({ commit }) {
      commit('initPostCategory');
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
};
