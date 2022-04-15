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
    deleteCategoryId: null,
    deleteCategoryName: '',
  },
  getters: {
    transformedCategories(state) {
      return state.categoryList.map(category => ({
        id: category.id,
        name: category.name,
      }));
    },
    targetCategory: state => state.targetCategory,
    deleteCategoryId: state => state.deleteCategoryId,
    deleteCategoryName: state => state.deleteCategoryName,
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
    doneGetCategory(state, payload) {
      state.targetCategory = Object.assign({}, state.targetCategory, payload.category);
    },
    updateValue(state, payload) {
      state.targetCategory = Object.assign({}, { ...state.targetCategory }, {
        name: payload.name,
      });
    },
    updateCategory(state, { category }) {
      state.targetCategory = Object.assign({}, state.targetCategory, { ...category });
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
    confirmDeleteCategory(state, { categoryId, categoryName }) {
      state.deleteCategoryId = categoryId;
      state.deleteCategoryName = categoryName;
    },
    doneDeleteCategory(state) {
      state.deleteCategoryId = null;
      state.deleteCategoryName = '';
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
    getCategoryDetail({ commit, rootGetters }, { id }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${id}`,
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
    updateValue({ commit }, name) {
      commit({
        type: 'updateValue',
        name,
      });
    },
    updateCategory({ commit, rootGetters, state }) {
      commit('toggleLoading');
      const data = new URLSearchParams();
      data.append('name', state.targetCategory.name);
      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/category/${state.targetCategory.id}`,
        data,
      }).then((res) => {
        const payload = {
          category: {
            id: res.data.category.id,
            name: res.data.category.name,
          },
        };
        commit('updateCategory', payload);
        commit('displayDoneMessage', 'カテゴリーを更新しました');
        commit('toggleLoading');
      }).catch((err) => {
        commit('failRequest', { message: err.message });
        commit('toggleLoading');
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
    confirmDeleteCategory({ commit }, deleteTargetCategory) {
      commit('confirmDeleteCategory', deleteTargetCategory);
    },
    deleteCategory({ commit, rootGetters, state }) {
      return new Promise((resolve) => {
        commit('clearMessage');
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${state.deleteCategoryId}`,
        }).then(() => {
          commit('doneDeleteCategory');
          commit('displayDoneMessage', 'カテゴリーを削除しました');
          resolve();
        }).catch((err) => {
          commit('failRequest', { message: err.message });
        });
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
};
