<template lang="html">
  <div>
    <app-heading :level="1">カテゴリー管理</app-heading>
    <app-router-link
      underline
      small
      hover-opacity
      to="/categories"
    >
      カテゴリ一覧へ戻る
    </app-router-link>
    <div class="article-edit-form">
      <app-input
        :value="categoryTitle"
        @updateValue="$emit('edit-title', $event)"
      />
    </div>
    <app-button
      class="category-management-post__submit"
      button-type="submit"
      round
      @click="$emit('handle-click')"
    >
      更新
    </app-button>
    <div v-if="errorMessage" class="category-management-post__notice">
      <app-text bg-error>{{ errorMessage }}</app-text>
    </div>
    <div v-if="doneMessage" class="category-management-post__notice">
      <app-text bg-success>{{ doneMessage }}</app-text>
    </div>
  </div>
</template>

<script>
import {
  Heading, RouterLink, Input, Button, Text,
} from '../../atoms';

export default ({
  components: {
    appHeading: Heading,
    appRouterLink: RouterLink,
    appInput: Input,
    appButton: Button,
    appText: Text,
  },
  props: {
    categoryTitle: {
      type: String,
      default: '',
    },
    errorMessage: {
      type: String,
      default: '',
    },
    doneMessage: {
      type: String,
      default: '',
    },
  },
});
</script>

<style lang="postcss" scoped>
.category-management-post {
  &__submit {
    margin-top: 16px;
  }
}
</style>
