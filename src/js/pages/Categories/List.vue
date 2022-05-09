<template lang="html">
  <section class="categories">
    <app-category-post
      class="categoryPost"
      :access="access"
      :error-message="errorMessage"
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
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    fetchCategories() {
      this.$store.dispatch('categories/getAllCategories');
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
