<template lang="html">
  <section class="categories">
    <app-category-post
      class="categoryPost"
      :access="access"
      :error-message="errorMessage"
      :category="inputCategory"
      :disabled="isLoading"
      :done-message="doneMessage"
      @clear-message="clearMessage"
      @update-value="updateValue($event)"
      @handle-submit="handleSubmit"
    />
    <app-category-list
      class="categoryList"
      :categories="category"
      :access="access"
      :theads="theads"
    />
  </section>
</template>

<script>
import { CategoryList, CategoryPost } from '@Components/molecules';

export default {
  components: {
    appCategoryList: CategoryList,
    appCategoryPost: CategoryPost,
  },
  data() {
    return {
      theads: ['カテゴリー名'],
      name: '',
    };
  },
  computed: {
    category() {
      return this.$store.state.categories.categoriesList;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    inputCategory() {
      const { name } = this.$store.state.categories.inputCategory;
      return name;
    },
    isLoading() {
      return this.$store.state.categories.isLoading;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    fetchCategories() {
      this.$store.dispatch('categories/getAllCategories');
    },
    updateValue($event) {
      this.$store.dispatch('categories/updateValue', $event.target.value);
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('categories/postCategories').then(() => {
        this.$store.dispatch('categories/initPostCategory');
        this.$store.dispatch('categories/getAllCategories');
      });
    },
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
  },
};
</script>

<style lang="postcss" scoped>
.categories {
  display: flex;
}

.categoryPost {
  width: 37.5%;
  margin-right: 2rem;
}

.categoryList {
  border-left: 1px solid #C0C0C0;
  width: 62.5%;
  padding-left: 2rem;
}
</style>
