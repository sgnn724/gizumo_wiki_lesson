import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoriesList: [],
    loading: false,
    errorMessage: '',
    doneMessage: '',
    deleteCategoryId: null,
    deleteCategoryName: '',
    updateCategoryId: null,
    updateCategoryName: '',
  },
  mutations: {

    // Create
    donePostCategory(state) {
      state.doneMessage = 'カテゴリーの追加が完了しました。';
    },

    // Read
    doneGetAllCategories(state, payload) {
      state.categoriesList = payload;
    },

    // Delete
    confirmDeleteCategory(state, { id, name }) {
      state.deleteCategoryId = id;
      state.deleteCategoryName = name;
    },
    doneDeleteCategory(state) {
      state.deleteCategoryId = null;
      state.deleteCategoryName = '';
      state.doneMessage = 'カテゴリーの削除が完了しました。';
    },

    // Update
    setCategoryDetail(state, { id, name }) {
      state.updateCategoryId = id;
      state.updateCategoryName = name;
    },
    editedCategoryName(state, payload) {
      state.updateCategoryName = payload;
    },
    doneUpdateCategory(state, payload) {
      state.updateCategoryName = payload;
      state.doneMessage = 'カテゴリーの更新が完了しました。';
    },

    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    clearMessage(state) {
      state.errorMessage = '';
      state.doneMessage = '';
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
  },
  actions: {

    // Create
    postCategory({ commit, rootGetters }, category) {
      commit('toggleLoading');

      return new Promise((resolve) => {
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data: new URLSearchParams(`name=${category}`),
        }).then(() => {
          commit('toggleLoading');
          commit('donePostCategory');
          resolve();
        }).catch((err) => {
          commit('failRequest', { message: err.message });
          commit('toggleLoading');
        });
      });
    },

    // Read
    getAllCategoriesByDesc({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(({ data }) => {
        const reverseCategories = data.categories.reverse();
        commit('doneGetAllCategories', reverseCategories);
      }).catch((err) => {
        commit('failRequest', { message: err.message });
      });
    },

    // Delete
    confirmDeleteCategory({ commit }, { categoryId: id, categoryName: name }) {
      commit('confirmDeleteCategory', { id, name });
    },
    deleteCategory({ commit, rootGetters }, categoryId) {
      return new Promise((resolve) => {
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${categoryId}`,
        }).then(() => {
          commit('doneDeleteCategory');
          resolve();
        }).catch((err) => {
          commit('failRequest', { message: err.message });
        });
      });
    },

    setCategoryDetail({ commit }, category) {
      commit('setCategoryDetail', category);
    },
    editedCategoryName({ commit }, categoryName) {
      commit('editedCategoryName', categoryName);
    },
    updateCategory({ commit, rootGetters, state }) {
      commit('toggleLoading');

      const data = new URLSearchParams(`id=${state.updateCategoryId}`);
      data.append('name', state.updateCategoryName);

      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/category/${state.updateCategoryId}`,
        data,
      }).then((res) => {
        commit('doneUpdateCategory', res.data.category.name);
        commit('toggleLoading');
      }).catch((err) => {
        commit('toggleLoading');
        commit('failRequest', { message: err.message });
      });
    },

    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
};
