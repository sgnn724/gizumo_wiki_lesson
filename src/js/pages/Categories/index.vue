<template lang="html">
  <div class="category-wrapper">
    <app-category-post
      class="category-wrapper__post"
      :access="access"
    />
    <app-category-list
      class="category-wrapper__list"
      :theads="theads"
      :access="access"
      :categories="categoriesList"
    />
  </div>
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
      theads: ['カテゴリー名', '', '', ''],
    };
  },
  computed: {
    categoriesList() {
      return this.$store.state.categories.categoryList;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
};

</script>
<style lang="postcss" scoped>
  .category-wrapper{
    display: flex;
    &__post {
      width: 30%;
      padding-right: 10px;
    }
    &__list {
      width: 70%;
      padding-left: 10px;
      border-left: 2px solid var(--separatorColor);
    }
  }
</style>
