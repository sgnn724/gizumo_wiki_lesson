<template lang="html">
  <form @submit.prevent="updateCategory">
    <app-heading :level="1">カテゴリー管理</app-heading>
    <app-router-link
      underline
      large
      hover-opacity
      :to="`/categories`"
      class="category-detail__link"
    >
      カテゴリー一覧へ戻る
    </app-router-link>
    <app-input
      v-validate="'required'"
      name="name"
      type="text"
      placeholder="カテゴリー名"
      data-vv-as="カテゴリー名"
      :error-messages="errors.collect('name')"
      :value="category.name"
      @updateValue="updateValue"
    />
    <app-button
      class="category-detail__submit"
      button-type="submit"
      round
      :disabled="disabled || !access.edit"
    >
      {{ buttonText }}
    </app-button>

    <div v-if="errorMessage" class="category-detail__notice">
      <app-text bg-error>{{ errorMessage }}</app-text>
    </div>

    <div v-if="doneMessage" class="category-detail__notice">
      <app-text bg-success>{{ doneMessage }}</app-text>
    </div>
  </form>
</template>
<script>
import {
  Heading, Input, Button, Text, RouterLink,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appInput: Input,
    appButton: Button,
    appText: Text,
    appRouterLink: RouterLink,
  },
  props: {
    category: {
      type: Object,
      default: () => ({}),
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
      if (!this.access.edit) return '変更権限がありません';
      return this.disabled ? '更新中...' : '更新';
    },
  },
  methods: {
    updateCategory() {
      if (!this.access.edit) return;
      this.$emit('clearMessage');
      this.$validator.validate().then((valid) => {
        if (valid) this.$emit('handleSubmit');
      });
    },
    updateValue($event) {
      this.$emit('updateValue', $event.target);
    },
  },
};
</script>
<style lang="postcss" scoped>
.category-detail {
  &__input {
    margin-top: 16px;
  }
  &__submit {
    margin-top: 16px;
  }
  &__notice {
    margin-top: 16px;
  }
  &__link {
    padding: 0;
    margin: 15px 0;
  }
}
</style>
