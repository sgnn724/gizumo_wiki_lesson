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
    openModal(articleId) {
      this.$store.dispatch('articles/confirmDeleteArticle', articleId);
      this.toggleModal();
    },
    handleClick() {
      this.$store.dispatch('articles/deleteArticle');
      this.toggleModal();
      if (this.$route.query.category) {
        const { category } = this.$route.query;
        this.title = category;
        this.$store.dispatch('articles/filteredArticles', category)
          .then(() => {
            if (this.$store.state.articles.articleList.length === 0) {
              this.$router.push({ path: '/notfound' });
            }
          }).catch(() => {
            // console.log(err);
          });
      } else {
        this.$store.dispatch('articles/getAllArticles');
      }
    },
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
