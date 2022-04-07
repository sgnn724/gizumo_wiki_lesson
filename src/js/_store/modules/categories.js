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
    doneGetAllCategories(state, { categories }) {
      state.categoryList = [...categories].reverse();
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
  },
  actions: {
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
  },
};
