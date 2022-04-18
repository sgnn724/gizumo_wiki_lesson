<template lang="html">
  <app-category-detail
    :category="category"
    :error-message="errorMessage"
    :done-message="doneMessage"
    :loading="loading"
    :access="access"
    @clearMessage="clearMessage"
    @updateValue="updateValue"
    @handleSubmit="handleSubmit"
  />
</template>

<script>
import { CategoryDetail } from '@Components/molecules';

export default {
  components: {
    appCategoryDetail: CategoryDetail,
  },
  computed: {
    category() {
      return this.$store.state.categories.targetCategory;
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
    const { id } = this.$route.params;
    this.$store.dispatch('categories/getCategoryDetail', { id });
    this.$store.dispatch('categories/clearMessage');
  },
  destroyed() {
    this.$store.dispatch('categories/clearMessage');
  },
  methods: {
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    updateValue(target) {
      if (!this.loading) this.$store.dispatch('categories/updateValue', target.value);
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('categories/updateCategory', {
        id: this.category.id,
        name: this.category.name,
      });
    },
  },
};
</script>
