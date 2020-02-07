<template>
  <div class="accordion__item">
    <div class="accordion__content">
      <p class="content">{{ order.firstName }} {{ order.lastName }}<br /></p>
      <p class="content">
        {{ order.email }}
      </p>
    </div>
    <SfButton
      class="sf-button--text accordion__edit"
      @click="$emit('click:edit', 0)"
      >Edit</SfButton
    >
  </div>
</template>
<script>
import {
  SfButton,
} from '@storefront-ui/vue'
export default {
  name: 'PersonalDetails',
  components: {
    SfButton,
  },
  props: {
    order: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';
</style>
