import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoryList: [],
    category: {
      name: '',
    },
    loading: false,
    doneMessage: '',
    errorMessage: '',
  },
  getters: {
    category: state => state.category,
  },
  mutations: {
    initCategory(state) {
      state.category = Object.assign({}, {
        id: null,
        name: '',
      });
    },
    doneGetAllCategories(state, payload) {
      state.categoryList = [...payload.categories].reverse();
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    confirmDeleteCategory(state, { categoryId, categoryName }) {
      state.categoryId = categoryId;
      state.categoryName = categoryName;
    },
    displayDoneMessage(state, payload) {
      state.doneMessage = payload.message;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    updateValue(state, payload) {
      state.category.name = payload;
    },
  },
  actions: {
    initCategory({ commit }) {
      commit('initCategory');
    },
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
    postCategory({ commit, rootGetters }) {
      return new Promise((resolve) => {
        commit('toggleLoading');
        commit('clearMessage');
        const data = new URLSearchParams();
        data.append('name', rootGetters['categories/category'].name);
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          commit('toggleLoading');
          commit('displayDoneMessage', { message: 'カテゴリーを作成しました。' });
          resolve();
        }).catch((err) => {
          commit('toggleLoading');
          commit('failRequest', { message: err.message });
        });
      });
    },
    updateValue({ commit }, payload) {
      commit('updateValue', payload);
    },
    confirmDeleteCategory({ commit }, categoryId, categoryName) {
      commit('confirmDeleteCategory', {
        categoryId, categoryName,
      });
    },
  },
};
