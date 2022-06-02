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
        @update-value="$emit('edit-title', $event)"
      />
    </div>
    <app-button
      class="category-management-post__submit"
      button-type="submit"
      round
      :disabled="disabled || !access.create"
      @click="$emit('handle-click')"
    >
      {{ buttonText }}
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
} from '@Components/atoms';

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
    disabled: {
      type: Boolean,
      default: false,
    },
    access: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    buttonText() {
      if (!this.access.create) return '更新権限がありません';
      return this.disabled ? '更新中...' : '更新';
    },
  },
});
</script>

<style lang="postcss" scoped>
.category-management-post {
  &__submit {
    margin-top: 16px;
  }
  &__notice {
    margin-top: 16px;
  }
}
</style>
