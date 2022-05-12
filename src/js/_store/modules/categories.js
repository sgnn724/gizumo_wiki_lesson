import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoriesList: [],
    errorMessage: '',
    inputCategory: {
      id: null,
      name: '',
    },
    disabled: false,
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
      state.disabled = !state.disabled;
    },
    displayDoneMessage(state, payload = { message: 'カテゴリー作成成功しました' }) {
      state.doneMessage = payload.message;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    initPostCategory(state) {
      state.inputCategory = Object.assign({}, {
        id: null,
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
      return new Promise((resolve, reject) => {
        commit('toggleLoading');
        commit('clearMessage');
        const data = new URLSearchParams();
        data.append('name', rootGetters['categories/inputCategory'].name);
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          commit('toggleLoading');
          commit('displayDoneMessage');
          resolve();
        }).catch((err) => {
          commit('toggleLoading');
          commit('failRequest', { message: err.message });
          reject();
        });
      });
    },
    initPostCategory({ commit }) {
      commit('initPostCategory');
    },
  },
};
