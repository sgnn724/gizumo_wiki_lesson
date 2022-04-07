<template lang="html">
  <div class="categories">
    <app-category-post
      :access="access"
      border-gray
      class="categories-post"
    />
    <app-category-list
      :theads="theads"
      :categories="categoriesList"
      :access="access"
      border-gray
      class="categories-list"
    />
  </div>
</template>

<script>
import { CategoryList, CategoryPost } from '@Components/molecules';
import Mixins from '@Helpers/mixins';

export default {
  components: {
    appCategoryList: CategoryList,
    appCategoryPost: CategoryPost,
  },
  mixins: [Mixins],
  data() {
    return {
      theads: ['カテゴリー名'],
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
    this.getAllCategories();
  },
  methods: {
    getAllCategories() {
      this.$store.dispatch('categories/getAllCategories');
    },
  },
};
</script>
<style lang="postcss" scoped>
.categories {
  display: flex;
  &-post {
    width: 35%;
    padding-right: 20px;
    border-right: 1px solid lightgray;
  }
  &-list {
    width: 65%;
    margin-left: 20px;
  }
}
</style>
