<template lang="html">
  <div class="category">
    <app-category-post
      :disabled="loading"
      :category="category"
      :access="access"
      class="category-post"
      :done-message="doneMessage"
      :error-message="errorMessage"
      @handle-submit="handleSubmit"
      @update-value="updateValue($event)"
    />
    <app-category-list
      class="category-list"
      :delete-category-name="deleteCategoryName"
      :categories="categoryList"
      :access="access"
      @handle-click="handleClick"
      @open-modal="openModal"
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
      name: '',
    };
  },
  computed: {
    categoryList() {
      return this.$store.state.categories.categoryList;
    },
    loading() {
      return this.$store.state.categories.loading;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    category() {
      const { name } = this.$store.state.categories.category;
      return name;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    deleteCategoryName() {
      return this.$store.state.categories.deleteCategoryName;
    }
  },
  created() {
    this.getAllCategories();
  },
  methods: {
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('categories/postCategory').then(() => {
        this.$store.dispatch('categories/getAllCategories');
        this.$store.dispatch('categories/initCategory');
      });
    },
    openModal(categoryId, categoryName) {
      const targetCategory = { categoryId, categoryName }
      this.$store.dispatch('categories/confirmDeleteCategory', targetCategory);
      this.toggleModal();
    },
    getAllCategories() {
      this.$store.dispatch('categories/getAllCategories');
    },
    updateValue($event) {
      this.$store.dispatch('categories/updateValue', $event.target.value);
    },
    handleClick() {
      this.$store.dispatch('categories/deleteCategory').then(() => {
        this.$store.dispatch('categories/getAllCategories');
        this.toggleModal();
      });
    },
  },
}
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
