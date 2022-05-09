<template lang="html">
  <div class="category">
    <app-category-post
      :category="category"
      :access="access"
      class="category-post"
      @handleSubmit="handleSubmit"
    />
    <app-category-list
      class="category-list"
      :theads="theads"
      :categories="categoryList"
      :access="access"
      @openModal="openModal"
    />
  </div>
</template>

<script>
import { CategoryPost, CategoryList } from '@Components/molecules';

import Mixins from '@Helpers/mixins';

export default {
  components: {
    appCategoryList: CategoryList,
    appCategoryPost: CategoryPost,
  },
  mixins: [Mixins],
  beforeRouteUpdate(to, from, next) {
    this.getAllCategories();
    next();
  },
  data() {
    return {
      theads: ['カテゴリー一覧'],
    };
  },
  computed: {
    categoryList() {
      return this.$store.state.categories.categoryList;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    category() {
      const { category } = this.$store.state.categories.targetCategory;
      return category;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
  methods: {
    handleSubmit() {
      this.$store.dispatch('categories/addCategory');
    },
    openModal(categoryId, categoryName) {
      this.$store.dispatch('categories/confirmDeleteCategory', categoryId, categoryName);
      this.toggleModal();
    },
  },
};
</script>
<style lang="postcss" scoped>
.category {
  display: flex;
  &-post {
    width: 35%;
    padding-right: 20px;
    border-right: 1px solid;
  }
  &-list {
    width: 65%;
    padding-left: 20px;
  }
}
</style>