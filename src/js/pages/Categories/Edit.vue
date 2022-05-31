<template lang="html">
  <app-edit
    :error-message="errorMessage"
    :done-message="doneMessage"
    :category-id="categoryId"
    :category-title="categoryTitle"
    @edit-title="editTitle($event)"
    @handleClick="handleClick"
   />
</template>
<script>
import { Edit } from '@Components/molecules';

export default {
  data() {
    return {
      name: '',
    };
  },
  components: {
    appEdit: Edit,
  },
  created() {
    this.$store.dispatch('categories/getCategoryDetail', this.categoryId);
  },
  computed: {
    categoryTitle() {
      const { name } = this.$store.state.categories.targetCategory;
      return name;
    },
    categoryId() {
      const { id } = this.$route.params;
      return id;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
  },
  methods: {
    editTitle($event) {
      this.$store.dispatch('categories/editTitle', $event.target.value);
    },
    handleClick() {
      this.$store.dispatch('categories/handleClick', this.categoryId);
      console.log(22222);
    },
  },
};
</script>
<style lang="">
</style>
