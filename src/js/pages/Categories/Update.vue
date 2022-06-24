<template>
  <app-category-update
    :update-category-name="updateCategoryName"
    :error-message="errorMessage"
    :done-message="doneMessage"
    :disabled="disabled"
    :access="access"
    @updateValue="updateValue"
    @handleSubmit="updateCategory"
    @clearMessage="clearMessage"
  />
</template>

<script>
import { CategoryUpdate } from '@Components/molecules';

export default {
  components: {
    appCategoryUpdate: CategoryUpdate,
  },
  computed: {
    updateCategoryName() {
      return this.$store.state.categories.updateCategoryName;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    disabled() {
      return this.$store.state.categories.loading;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    const { id } = this.$route.params;
    const category = this.$store.state.categories.categoriesList
      .find(observer => observer.id === +id);

    this.$store.dispatch('categories/setCategoryDetail', category);
  },
  methods: {
    updateValue($event) {
      this.$store.dispatch('categories/editedCategoryName', $event.target.value);
    },
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    updateCategory() {
      if (this.loading) return;
      this.$store.dispatch('categories/updateCategory');
    },
  },
};
</script>
