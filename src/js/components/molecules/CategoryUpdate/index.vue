<template lang="html">
  <div>
    <app-heading :level="1">カテゴリー管理</app-heading>
    <app-router-link
      class="category-management-update__link"
      theme-color
      underline
      hover-opacity
      to="/categories"
    >
      カテゴリー一覧へ戻る
    </app-router-link>
    <app-input
      v-validate="'required'"
      class="category-management-update__input"
      name="category"
      type="text"
      placeholder="編集するカテゴリー名を入力してください"
      data-vv-as="カテゴリー名"
      :error-message="errors.collect('category')"
      :value="updateCategoryName"
      @updateValue="$emit('updateValue', $event)"
    />
    <app-button
      class="category-management-update__submit"
      button-type="submit"
      round
      :disabled="disabled || !access.edit"
      @click="handleSubmit"
    >
      {{ buttonText }}
    </app-button>

    <div v-if="errorMessage" class="category-management-update__notice">
      <app-text bg-error>{{ errorMessage }}</app-text>
    </div>

    <div v-if="doneMessage" class="category-management-update__notice">
      <app-text bg-success>{{ doneMessage }}</app-text>
    </div>
  </div>
</template>

<script>
import {
  Heading, RouterLink, Input, Button, Text,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appRouterLink: RouterLink,
    appInput: Input,
    appButton: Button,
    appText: Text,
  },
  props: {
    updateCategoryName: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: '',
    },
    doneMessage: {
      type: String,
      default: '',
    },
    access: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    buttonText() {
      if (!this.access.edit) return '変更権限がありません';
      return this.disabled ? '更新中...' : '更新';
    },
  },
  methods: {
    handleSubmit() {
      if (!this.access.edit) return;
      this.$emit('clearMessage');
      this.$validator.validate().then((valid) => {
        if (valid) this.$emit('handleSubmit');
      });
    },
  },
};
</script>

<style lang="postcss" scoped>
.category-management-update {
  &__link,
  &__input,
  &__submit,
  &__notice {
    margin-top: 16px;
  }
}
</style>
