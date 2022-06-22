<template lang="html">
  <div class="category__inner">
    <div class="category__post">
      <app-category-post
        :category="category"
        :error-message="errorMessage"
        :done-message="doneMessage"
        :disabled="disabled"
        :access="access"
        @updateValue="updateValue"
        @clearMessage="clearMessage"
        @handleSubmit="handleSubmit"
      />
    </div>
    <div class="vertical-line" />
    <div class="category__list">
      <app-category-list
        :theads="theads"
        :categories="categories"
        :delete-category-name="deleteCategoryName"
        :access="access"
        @handleClick="deleteCategory"
        @openModal="openModal"
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
      category: '',
      theads: ['カテゴリー名'],
    };
  },
  computed: {
    categories() {
      return this.$store.state.categories.categoriesList;
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
    deleteCategoryId() {
      return this.$store.state.categories.deleteCategoryId;
    },
    deleteCategoryName() {
      return this.$store.state.categories.deleteCategoryName;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategoriesByDesc');
  },
  methods: {
    updateValue($event) {
      this.category = $event.target.value;
    },
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    handleSubmit() {
      // cannot push button when be loading
      if (this.disabled) {
        return;
      }

      this.$store.dispatch('categories/postCategory', this.category)
        .then(() => {
          this.$store.dispatch('categories/getAllCategoriesByDesc');
          this.category = '';
        });
    },
    toggleModal() {
      this.$root.$emit('toggleModal');
    },
    openModal(categoryId, categoryName) {
      this.clearMessage();
      this.toggleModal();
      this.$store.dispatch('categories/confirmDeleteCategory', {
        categoryId,
        categoryName,
      });
    },
    deleteCategory() {
      this.$store.dispatch('categories/deleteCategory', this.deleteCategoryId)
        .then(() => {
          this.$store.dispatch('categories/getAllCategoriesByDesc');
        });
      this.toggleModal();
    },
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
