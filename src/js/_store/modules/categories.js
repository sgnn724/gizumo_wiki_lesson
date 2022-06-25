import axios from '@Helpers/axiosDefault';

const getDefaultState = () => ({
  categoriesList: [],
  loading: false,
  errorMessage: '',
  doneMessage: '',
  deleteCategoryId: null,
  deleteCategoryName: '',
  updateCategoryId: null,
  updateCategoryName: '',
});

export default {
  namespaced: true,
  state: getDefaultState(),
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
    doneUpdateCategory(state) {
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
    resetCategories(state) {
      Object.assign(state, getDefaultState());
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

    // Update
    setCategoryDetail({ commit }, category) {
      commit('setCategoryDetail', category);
    },
    getCategoryDetail({ commit, rootGetters }, categoryId) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${categoryId}`,
      }).then(({ data }) => {
        commit('setCategoryDetail', data.category);
      }).catch((err) => {
        commit('failFetchCategory', { message: err.message });
      });
    },
    editedCategoryName({ commit }, categoryName) {
      commit('editedCategoryName', categoryName);
    },
    updateCategory({
      dispatch, commit, rootGetters, state,
    }) {
      commit('toggleLoading');

      const data = new URLSearchParams(`id=${state.updateCategoryId}`);
      data.append('name', state.updateCategoryName);

      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/category/${state.updateCategoryId}`,
        data,
      }).then(() => {
        commit('doneUpdateCategory');
        commit('toggleLoading');
        dispatch('getAllCategoriesByDesc');
      }).catch((err) => {
        commit('toggleLoading');
        commit('failRequest', { message: err.message });
      });
    },

    clearMessage({ commit }) {
      commit('clearMessage');
    },
    resetCategories({ commit }) {
      commit('resetCategories');
    },
  },
};
