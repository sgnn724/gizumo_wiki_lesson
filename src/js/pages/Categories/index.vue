<template lang="html">
  <div class="category__inner">
    <div class="category__post">
      <app-category-post
        :access="access"
      />
    </div>
    <div class="vertical-line" />
    <div class="category__list">
      <app-category-list
        :theads="theads"
        :categories="categories"
        :access="access"
      />
    </div>
  </div>
</template>

<script>
import { CategoryPost, CategoryList } from '@Components/molecules';

export default {
  components: {
    appCategoryPost: CategoryPost,
    appCategoryList: CategoryList,
  },
  data() {
    return {
      theads: ['カテゴリー名'],
    };
  },
  computed: {
    categories() {
      console.log(this.$store.state.categories.categoriesList);
      return this.$store.state.categories.categoriesList;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategoriesByDesc');
  },
};
</script>

<style lang="postcss" scoped>
.category {
  &__inner {
    display: flex;
  }

  &__post {
    width: 30%;
  }

  &__list {
    width: 70%;
  }
}

.vertical-line {
  margin: 0 2rem;
  width: 2px;
  background-color: var(--separatorColor);
}
</style>
