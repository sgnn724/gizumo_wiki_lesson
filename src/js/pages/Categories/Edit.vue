<template lang="html">
  <app-edit
    :error-message="errorMessage"
    :done-message="doneMessage"
    :category-id="categoryId"
    :category-title="categoryTitle"
    :access="access"
    :disabled="isLoading"
    @edit-title="editTitle($event)"
    @handle-click="handleClick"
  />
</template>
<script>
import { Edit } from '@Components/molecules';

export default {
  components: {
    appEdit: Edit,
  },
  computed: {
    isLoading() {
      return this.$store.state.categories.isLoading;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    categoryTitle() {
      const { name } = this.$store.state.categories.targetCategory;
      return name;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
  },
  created() {
    this.categoryId = this.$route.params.id;
    this.$store.dispatch('categories/getCategoryDetail', this.categoryId);
  },
  methods: {
    editTitle($event) {
      this.$store.dispatch('categories/editTitle', $event.target.value);
    },
    handleClick() {
      if (this.isLoading) return;
      this.$store.dispatch('categories/handleClick', this.categoryId);
    },
  },
};
</script>
