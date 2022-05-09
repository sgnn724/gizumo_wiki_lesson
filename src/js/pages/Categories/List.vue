<template lang="html">
  <section class="categories">
    <app-category-post
      class="categoryPost"
      :access="access"
    />
    <div class="line" />
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
  margin-right: 1rem;
}

.line {
  margin: 0 1rem;
  width: 1px;
  background-color: #C0C0C0;
}

.categoryList {
  width: 62.5%;
  margin-left: 1rem;
}
</style>
