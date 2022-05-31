import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    targetCategory: {
      id: null,
      name: '',
    },
    categoriesList: [],
    errorMessage: '',
    inputCategory: {
      name: '',
    },
    isLoading: false,
    doneMessage: '',
    deleteCategoryId: null,
    categoryName: '',
  },
  getters: {
    inputCategory: state => state.inputCategory,
    deleteCategoryId: state => state.deleteCategoryId,
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
    displayDoneMessage(state, { message }) {
      state.doneMessage = message;
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
    confirmDeleteCategory(state, { categoryId }) {
      state.deleteCategoryId = categoryId;
    },
    updateCategoryName(state, payload) {
      state.categoryName = payload;
    },
    doneDeleteCategory(state) {
      state.deleteCategoryId = null;
    },
    editTitle(state, payload) {
      state.targetCategory = Object.assign({}, { ...state.targetCategory }, {
        name: payload.name,
      });
    },
    doneGetCategory(state, payload) {
      state.targetCategory = Object.assign({}, state.targetCategory, payload.category);
    },
    updateArticle(state, { category }) {
      state.targetCategory = Object.assign({}, state.targetArticle, { ...category });
    },
  },
  actions: {
    getCategoryDetail({ commit, rootGetters }, categoryId) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${categoryId}`,
      }).then((res) => {
        const payload = {
          category: {
            id: res.data.category.id,
            name: res.data.category.name,
          },
        };
        commit('doneGetCategory', payload);
      }).catch((err) => {
        commit('failRequest', { message: err.message });
      });
    },
    editTitle({ commit }, name) {
      commit({
        type: 'editTitle',
        name,
      });
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
    confirmDeleteCategory({ commit }, categoryId) {
      commit('confirmDeleteCategory', { categoryId });
    },
    updateCategoryName({ commit }, payload) {
      commit('updateCategoryName', payload);
    },
    deleteCategory({ commit, state, rootGetters }) {
      return new Promise((resolve) => {
        commit('clearMessage');
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${state.deleteCategoryId}`,
        }).then(() => {
          commit('doneDeleteCategory');
          commit('displayDoneMessage', { message: 'ドキュメントを削除しました' });
          resolve();
        }).catch((err) => {
          commit('failRequest', { message: err.message });
        });
      });
    },
    handleClick({ commit, state, rootGetters }, categoryId) {
      commit('clearMessage');
      const data = new URLSearchParams();
      data.append('name', state.targetCategory.name);
      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/category/${categoryId}`,
        data,
      }).then(() => {
        const payload = {
          category: {
            name: state.targetCategory.name,
          },
        };
        commit('updateArticle', payload);
        commit('displayDoneMessage', { message: 'カテゴリーを更新しました' });
      }).catch((err) => {
        commit('failRequest', { message: err.message });
      });
    },
  },
};
