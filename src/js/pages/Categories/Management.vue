<template lang="html">
  <div class="categories">
    <app-category-post
      :category="category"
      :loading="loading"
      :access="access"
      :error-message="errorMessage"
      :done-message="doneMessage"
      border-gray
      class="categories-post"
      @clearMessage="clearMessage"
      @updateValue="updateValue"
      @handleSubmit="handleSubmit"
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
      name: '',
      theads: ['カテゴリー名'],
    };
  },
  computed: {
    categoriesList() {
      return this.$store.state.categories.categoryList;
    },
    category() {
      const { name } = this.$store.state.categories.targetCategory;
      return name;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    loading() {
      return this.$store.state.categories.loading;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    this.getAllCategories();
    this.$store.dispatch('categories/initPostCategory');
  },
  methods: {
    getAllCategories() {
      this.$store.dispatch('categories/getAllCategories');
    },
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    updateValue($event) {
      this.$store.dispatch('categories/updateValue', $event.target.value);
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('categories/postCategory').then(() => {
        this.$store.dispatch('categories/getAllCategories');
        this.$store.dispatch('categories/initPostCategory');
      });
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
